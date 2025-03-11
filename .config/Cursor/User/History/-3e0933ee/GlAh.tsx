import { GenericPostResponse } from "@/models/archive-models";
import { removeLocalStorageValues } from "@/services/local-storage.service";
import { getAllLocalStorageValues } from "@/utils/get-all-local-storage";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { ask } from "@tauri-apps/plugin-dialog";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormRegister,
  UseFormWatch
} from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";

interface Context {
  steps: string[];
  currentStep: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerArray: (name: string, array: Record<string, any>[]) => void;
  submitHandler: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: UseFormWatch<any>;
  submitForm: () => Promise<GenericPostResponse>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
}

export const MultiStepFormContext = createContext<Context | undefined>(
  undefined
);

export const MultiStepFormContextProvider = ({
  children,
  steps
}: {
  children: React.ReactNode;
  steps: string[];
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const window = getCurrentWindow();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [arrays, setArrays] = useState<Record<string, any>>({});

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({ defaultValues: getAllLocalStorageValues("repein_") });

  useEffect(() => {
    let unlisten: (() => void) | undefined;

    const setupListener = async () => {
      unlisten = await window.onCloseRequested(async (event) => {
        event.preventDefault();

        const answer = await ask(
          "Esta apunto de cerrar el formulario. Quiere guardar la informacion para continuar mas tarde?",
          {
            title: "Advertencia",
            kind: "warning"
          }
        );

        if (answer) {
          return window.destroy();
        }

        removeLocalStorageValues("repein_");

        window.destroy();
      });
    };

    setupListener();

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("form_editing")) {
      toast.success("Informacion cargada correctamente", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
      });
    }
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registerArray = (name: string, array: Record<string, any>[]) =>
    setArrays({ ...arrays, [name]: array });

  const currentStep = useMemo(
    () => steps.findIndex((step) => location.pathname.includes(step)),
    [location, steps]
  );

  const submitForm = async () => {
    try {
    const res = await invoke<GenericPostResponse>("save_repein", {
      repein: getAllLocalStorageValues("repein_")
    });

    if (res.success) {
      // Descomentar en produccion
      // removeLocalStorageValues("repein_");
    }

    return res;
  }

  catch (e) {
    return e
  }
  };

  const submitHandler = handleSubmit((data) => {
    const allFields = { ...data, ...arrays };

    const fields = Object.keys(allFields);

    fields.forEach((field) => {
      localStorage.setItem(`repein_${field}`, allFields[field]);
    });

    navigate({
      to: `/analysis/management/repein-personal/${steps[currentStep + 1]}`,
      viewTransition: true,
      resetScroll: true
    });
  });

  const context: Context = {
    steps,
    currentStep,
    submitForm,
    register,
    registerArray,
    control,
    submitHandler,
    errors,
    watch,
    setValue
  };

  return (
    <MultiStepFormContext.Provider value={context}>
      {children}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </MultiStepFormContext.Provider>
  );
};

export const useMultiStepForm = () => {
  const context = useContext(MultiStepFormContext);

  if (!context) {
    throw new Error(
      "useMultiStepForm must be used within a MultiStepFormContextProvider"
    );
  }

  return context;
};

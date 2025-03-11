import { LoaderIcon } from "@/assets/icons/loader";
import { GenericPostResponse } from "@/models/archive-models";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useMultiStepForm } from "../-context/multi-step-form-context";
import { CheckmarkIcon } from "@/assets/icons/checkmark";
import { CloseCircleIcon } from "@/assets/icons/close-circle";
import { getCurrentWindow } from "@tauri-apps/api/window";
import Button from "@/components/buttons/button";

export const Route = createFileRoute(
  "/_app/analysis/_layout/management/repein-personal/submit/"
)({
  component: RouteComponent,
});

export const INPUT_FIELD_LENGTH_VALIDATION = {
  validate: (value: string) => {
    if (value.length > 7) {
      return "Este campo no puede exceder 7 caracteres";
    }
    return true;
  }
};

function RouteComponent() {
  const [res, setRes] = useState<GenericPostResponse | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const { submitForm } = useMultiStepForm();

  const handleSubmit = useCallback(async () => {
    try {
      const res = await submitForm();
      setRes(res);
      
      // Extract detailed error message if available
      if (res?.success === false && res.message) {
        const errorMsg = res.message;
        if (errorMsg.includes("character varying")) {
          const match = errorMsg.match(/character varying\((\d+)\)/);
          const fieldMatch = errorMsg.match(/column "([^"]+)"/);
          
          if (match && fieldMatch) {
            const maxLength = match[1];
            const fieldName = fieldMatch[1];
            setErrorDetails(`El campo "${fieldName}" excede el límite de ${maxLength} caracteres.`);
          } else {
            setErrorDetails(errorMsg);
          }
        } else {
          setErrorDetails(errorMsg);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setRes({ success: false, message: String(error) });
      setErrorDetails(String(error));
    }
  }, [submitForm]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  const status = res?.success === null ? null : Boolean(res?.success);

  switch (status) {
    case true:
      return <Success />;
    case false:
      return (
        <div className="flex flex-col gap-2">
          <Error message={errorDetails || undefined} />
          <span className="text-neutral-500">(debug) {JSON.stringify(res)}</span>
          <Button onClick={() => handleSubmit()}>
            Reintentar
          </Button>
        </div>
      );
    default:
      return <Loading />;
  }
}

function Loading() {
  return (
    <main className="text-center grid place-items-center">
      <LoaderIcon className="text-primary size-28 mb-4" />
      <h1 className="text-3xl font-bold mb-2">
        Gracias por completar el formulario
      </h1>
      <span className="text-neutral-500">
        Estamos trabajando en guardar toda la informacion
      </span>
    </main>
  );
}

function Success() {
  const window = getCurrentWindow();

  return (
    <main className="text-center grid place-items-center">
      <CheckmarkIcon className="h-28 text-green-500 antialased mb-4" />
      <h1 className="text-3xl font-bold mb-2">
        La informacion ha sido guardada correctamente
      </h1>
      <span className="text-neutral-500">Puede cerrar esta ventana</span>

      <Button
        onClick={async () => await window.close()}
        className="mt-4 bg-primary"
      >
        Terminar
      </Button>
    </main>
  );
}

function Error({ message }: { message?: string }) {
  return (
    <main className="text-center grid place-items-center">
      <CloseCircleIcon className="text-red-500 h-28 antialased mb-4" />
      <h1 className="text-3xl font-bold mb-2">
        Hubo un error guardando la información
      </h1>
      <span className="text-neutral-500">
        {message || "Lo sentimos mucho, intente de nuevo más tarde"}
      </span>
    </main>
  );
}

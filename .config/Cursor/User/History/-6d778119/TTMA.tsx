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

function RouteComponent() {
  const [res, setRes] = useState<GenericPostResponse | null>(null);

  const { submitForm } = useMultiStepForm();

  const handleSubmit = useCallback(async () => {
    const res = await submitForm();

    setRes(res);
  }, [submitForm]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  const status = res?.success === null ? null : Boolean(res?.success);

  switch (status) {
    case true:
      return <Success />;
    case false:
      return <div className="flex flex-col gap-2"><Error />
      <span className="text-neutral-500">(debug) {JSON.stringify(res)}</span>
      <Button onClick={() => handleSubmit()}>
        Reintentar
      </Button>
      </div>;
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

function Error() {
  return (
    <main className="text-center grid place-items-center">
      <CloseCircleIcon className="text-red-500 h-28 antialased mb-4" />
      <h1 className="text-3xl font-bold mb-2">
        Hubo un error guardando la informacion
      </h1>
      <span className="text-neutral-500">
        Lo sentimos mucho, intente de nuevo mas tarde
      </span>
    </main>
  );
}

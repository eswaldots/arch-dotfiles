import { createFileRoute } from "@tanstack/react-router";
import Button from "@/components/buttons/button";
import { useState } from "react";
import useBounding, { getBounding } from "../-context/use-bounding";
import Alert from "@/components/alert";

export const Route = createFileRoute(
  "/_app/analysis/_layout/management/bounding/bounding/"
)({
  component: RouteComponent
});

function RouteComponent() {
  const [isVerified, setIsVerified] = useState(false);

  const navigate = Route.useNavigate();

  const member = useBounding((state) => state.member);
  const band = useBounding((state) => state.band);

  return (
    <div className="flex flex-col gap-2 px-8 py-1">
      <h1 className="text-2xl font-semibold">Verificación</h1>

      <div className="flex flex-col gap-2 mt-4">
<section className="flex flex-col gap-12">
  <div className="flex gap-12 items-start">
    <span className="font-bold text-lg">
     Miembro 
    </span>
    <div className="flex flex-col gap-1 pt-1 rounded-md w-full">
      <div className="flex items-center gap-2">
        <span className="font-semibold">CI:</span>
        <span className="text-neutral-500">{member?.repein_ci || "No disponible"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">Nombre completo:</span>
        <span className="text-neutral-500">{member?.repein_name} {member?.repein_surnames}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">Alias:</span>
        <span className="text-neutral-500">{member?.repein_nicknames ? `"${member.repein_nicknames}"` : "No registrado"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">Edad:</span>
        <span className="text-neutral-500">{member?.repein_age && member.repein_age > 1 ? `${member.repein_age} años` : "No registrada"}</span>
      </div>
    </div>
  </div>

  <div className="flex gap-16 items-start">
    <span className="font-bold text-lg">
     Banda 
    </span>
    <div className="flex flex-col gap-1 rounded-md pt-1 w-full">
      <div className="flex items-center gap-2">
        <span className="font-semibold">Nombre:</span>
        <span className="text-neutral-500">{band?.Nombre || "No disponible"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">Miembros:</span>
        <span className="text-neutral-500">{band?.Miembros || "No disponible"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">Tipo:</span>
        <span className="text-neutral-500">{band?.band_type || "No especificado"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">Zona de operación:</span>
        <span className="text-neutral-500">{band?.band_zone || "No especificada"}</span>
      </div>
    </div>
  </div>
</section>
      </div>
      
      <hr className="border-neutral-700 my-4" />

      <Alert severity="warning" label="Paso final">
        <p>
          Este es el paso final del proceso. Por favor, revise cuidadosamente todos los datos 
          ingresados antes de finalizar. Una vez confirmados, los cambios serán aplicados y 
          podrían requerir la clave especial del supervisor para ser modificados.
        </p>
      </Alert>

      <div className="flex items-center mt-4">
        <input
          id="verification-checkbox"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          checked={isVerified}
          onChange={(e) => setIsVerified(e.target.checked)}
        />

        <label htmlFor="verification-checkbox" className="ml-2 block text-sm text-gray-900">
          He verificado todos los datos y confirmo que son correctos
        </label>
      </div>
      
      <div className="flex justify-end">
        <Button 
          disabled={!isVerified}
          className="absolute bottom-6 right-8"
          onClick={() => {
            navigate({
              to: "/analysis/management/bounding/submit",
              viewTransition: true,
              resetScroll: true,
            })
          }}
        >
         Guardar y continuar 
        </Button>
      </div>
    </div>
  );
}

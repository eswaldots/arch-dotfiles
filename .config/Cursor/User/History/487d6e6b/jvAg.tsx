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
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl font-semibold">Verificación</h1>

      <div className="flex flex-col gap-2 mt-2">
<section className="flex gap-2 items-start">
  <span className="font-bold">
   Miembro 
  </span>
            <div className="flex flex-col gap-1 p-3 rounded-md border border-neutral-800 w-full">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-300">CI:</span>
                <span className="font-bold">{member?.repein_ci || "No disponible"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-300">Nombre completo:</span>
                <span className="font-medium">{member?.repein_name} {member?.repein_surnames}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-300">Alias:</span>
                <span>{member?.repein_nicknames ? `"${member.repein_nicknames}"` : "No registrado"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-300">Edad:</span>
                <span>{member?.repein_age && member.repein_age > 1 ? `${member.repein_age} años` : "No registrada"}</span>
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

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
  const boundingBand = useBounding((state) => state.boundingBand)
  const boundingMember = useBounding((state) => state.boundingMember)

  return (
    <div className="flex flex-col gap-2 px-8 py-1">
      <h1 className="text-2xl font-semibold">Verificación</h1>

      <div className="flex flex-col gap-2 mt-4">
<section className="flex flex-col gap-12">
  <div className="flex gap-12 items-start">
    <span className="font-bold text-lg w-40">
     Miembro 
    </span>
    <div className="flex flex-col gap-1 pt-1 rounded-md w-full">
      <div className="flex items-center gap-2">
        <span className="font-semibold w-32">CI:</span>
        <span className="text-neutral-500">{member?.repein_ci || "No disponible"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold w-32">Nombre completo:</span>
        <span className="text-neutral-500">{member?.repein_name} {member?.repein_surnames}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold w-32">Apodo:</span>
        <span className="text-neutral-500">{member?.repein_nicknames ? `"${member.repein_nicknames}"` : "No registrado"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold w-32">Edad:</span>
        <span className="text-neutral-500">{member?.repein_age && member.repein_age > 1 ? `${member.repein_age} años` : "No registrada"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold w-32">Nivel de peligrosidad:</span>
        <span className="text-neutral-500">{band?.NivelPeligrosidad || "No especificado"}</span>
      </div>
    </div>
  </div>

  <div className="flex gap-12 items-start">
    <span className="font-bold text-lg w-40">
     Banda 
    </span>
    <div className="flex flex-col gap-1 rounded-md pt-1 w-full">
      <div className="flex items-center gap-2">
        <span className="font-semibold w-32">Nombre:</span>
        <span className="text-neutral-500">{band?.Nombre || "No disponible"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold w-32">Miembros:</span>
        <span className="text-neutral-500">{band?.Miembros || "No disponible"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold w-32">Lider:</span>
        <span className="text-neutral-500">{band?.Lider || "No especificado"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold w-32">Zona de operación:</span>
        <span className="text-neutral-500">{band?.ZonaOP || "No especificada"}</span>
      </div>
    </div>
  </div>
  
  <div className="flex gap-12 items-start">
    <span className="font-bold text-lg w-40">
      Expediente de Banda
    </span>
    <div className="flex flex-col gap-2 pt-1 rounded-md w-full">
      {boundingBand?.length > 0 ? (
        boundingBand.map((bounding, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex flex-col w-32">
              <span className="font-semibold">{bounding.bounding_type === "record" ? "Expediente" : "Oficio"}</span>
            </div>
            <div className="flex flex-col w-32">
              <span className="font-semibold">N° {bounding.document_id}</span>
            </div>
            <div className="flex flex-col w-40">
              <span className="font-semibold whitespace-nowrap">
                el {bounding.date ? new Date(bounding.date).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }).replace(/\//g, '-') : ''}
              </span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="font-semibold truncate">Por {bounding.reason}</span>
            </div>
          </div>
        ))
      ) : (
        <span className="text-neutral-500">No hay expedientes registrados</span>
      )}
    </div>
  </div>

  <div className="flex gap-12 items-start">
    <span className="font-bold text-lg w-40">
      Expediente de Individuo
    </span>
    <div className="flex flex-col gap-2 pt-1 rounded-md w-full">
      {boundingMember?.length > 0 ? (
        boundingMember.map((member, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex flex-col w-32">
              <span className="font-semibold">{member.record_type === "expediente" ? "Expediente" : "Oficio"}</span>
            </div>
            <div className="flex flex-col w-32">
              <span className="font-semibold">N° {member.record_document}</span>
            </div>
            <div className="flex flex-col w-40">
              <span className="font-semibold whitespace-nowrap">
                el {member.record_date ? new Date(member.record_date).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }).replace(/\//g, '-') : ''}
              </span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="font-semibold truncate">por {member.record_name}</span>
            </div>
          </div>
        ))
      ) : (
        <span className="text-neutral-500">No hay expedientes registrados</span>
      )}
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

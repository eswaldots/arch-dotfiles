import { CheckmarkIcon } from "@/assets/icons/checkmark";
import { DangerTriangleIcon } from "@/assets/icons/danger-triangle";
import { XMarkIcon } from "@/assets/icons/x-mark";
import { ReactNode, useMemo } from "react";

interface AlertProps {
  severity: "success" | "error" | "warning" | "info";
  children: ReactNode;
}

export default function Alert(props: AlertProps) {
  const textColor = useMemo(() => {
    if (props.severity === "success") {
      return "text-green-900";
    }
    if (props.severity === "warning") {
      return "text-yellow-900";
    }
    if (props.severity === "error") {
      return "text-red-900";
    }
  }, [props.severity]);

  const backgroundColor = useMemo(() => {
    if (props.severity === "success") {
      return "bg-green-100";
    }
    if (props.severity === "warning") {
      return "bg-yellow-100";
    }
    if (props.severity === "error") {
      return "bg-red-100";
    }
  }, [props.severity]);

  return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <DangerTriangleIcon className="text-yellow-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Paso final</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Este es el paso final del proceso. Por favor, revise cuidadosamente todos los datos 
                ingresados antes de finalizar. Una vez confirmados, los cambios serán aplicados y 
                podrían requerir la clave especial del supervisor para ser modificados.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}

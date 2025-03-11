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
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
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

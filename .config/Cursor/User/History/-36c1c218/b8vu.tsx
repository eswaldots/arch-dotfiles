import { DangerTriangleIcon } from "@/assets/icons/danger-triangle";
import { cn } from "@/utils/cn";
import { ReactNode } from "react";
import { useAlert } from "./use-alert";

export interface AlertProps {
  severity: "success" | "error" | "warning" | "info";
  label?: string;
  children: ReactNode;
}

export default function Alert(props: AlertProps) {

  const { foregroundColor, backgroundColor, textColor } = useAlert(props.severity);

  return (
      <div className={cn("border-l-4 p-4 rounded-md shadow-sm", foregroundColor, backgroundColor, textColor)}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <DangerTriangleIcon className="text-yellow-500 size-5" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              {props.label}
            </h3>
            <div className="mt-1 text-sm text-yellow-700">
              {props.children}
            </div>
          </div>
        </div>
      </div>
  );
}

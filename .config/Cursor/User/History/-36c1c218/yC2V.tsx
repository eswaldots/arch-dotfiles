import { CheckmarkIcon } from "@/assets/icons/checkmark";
import { DangerTriangleIcon } from "@/assets/icons/danger-triangle";
import { XMarkIcon } from "@/assets/icons/x-mark";
import { cn } from "@/utils/cn";
import { ReactNode, useMemo } from "react";

interface AlertProps {
  severity: "success" | "error" | "warning" | "info";
  label?: string;
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
    if (props.severity === "info") {
      return "text-blue-900";
    }
    if (props.severity === "error") {
      return "text-red-900";
    }
  }, [props.severity]);

  const foregroundColor = useMemo(() => {
    if (props.severity === "success") {
      return "text-green-900";
    }
    if (props.severity === "warning") {
      return "border-yellow-400";
    }
    if (props.severity === "error") {
      return "border-red-400";
    }
    if (props.severity === "info") {
      return "border-blue-900";
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
      <div className={cn("border-l-4 p-4 rounded-md shadow-sm", foregroundColor, backgroundColor, textColor)}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <DangerTriangleIcon className="text-yellow-500 size-5" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              {props.label}
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              {props.children}
            </div>
          </div>
        </div>
      </div>
  );
}

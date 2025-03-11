import { useMemo } from "react";
import { AlertProps } from ".";

export const useAlert = (severity: AlertProps["severity"]) => {

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
  return { alert, setAlert };
};


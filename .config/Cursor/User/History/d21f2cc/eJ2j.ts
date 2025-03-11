import { useMemo } from "react";
import { AlertProps } from ".";

export const useAlert = (severity: AlertProps["severity"]) => {

  const textColor = useMemo(() => {
    if (severity === "success") {
      return "text-green-900";
    }
    if (severity === "warning") {
      return "text-yellow-900";
    }
    if (severity === "error") {
      return "text-red-900";
    }
    if (severity === "info") {
      return "text-blue-900";
    }
  }, [severity]);

  const foregroundColor = useMemo(() => {
    if (severity === "success") {
      return "text-green-900";
    }
    if (severity === "warning") {
      return "border-yellow-400";
    }
    if (severity === "error") {
      return "border-red-400";
    }
    if (severity === "info") {
      return "border-blue-400";
    }
  }, [severity]);

  const backgroundColor = useMemo(() => {
    if (severity === "success") {
      return "bg-green-100";
    }
    if (severity === "warning") {
      return "bg-yellow-100";
    }
    if (severity === "error") {
      return "bg-red-100";
    }
  }, [severity]);

  return { textColor, foregroundColor, backgroundColor };
};


import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  form?: string;
  type?: "button" | "submit";
  onClick?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-primary hover:opacity-80 disabled:hover:bg-primary",
        "grid place-content-center disabled:opacity-60 px-10 py-5 rounded-md h-4 shadow-md transition text-neutral-950",
        props.className,
      )}
    >
      {props.children}
    </button>
  );
}

import { cn } from "@/utils/cn";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value?: string;
  className?: string;
  name?: string;
  type?: string;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  errors?: FieldErrors;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function Input(props: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-normal text-neutral-500">
        {props.label}
      </label>
      <input
        style={{
          border: "1px solid",
          borderColor:
            props.register?.name && props.errors?.[props?.register?.name]
              ? "#FF0000"
              : "var(--neutral-800)"
        }}
        className={
          cn(props.className,
          "text-normal disabled:hover:bg-neutral-900 font-normal h-8 w-full hover:bg-neutral-700 transition-colors shadow-sm focus:hover:bg-neutral-900 rounded-md bg-neutral-900 outline-none px-4 py-[18px] "
        )}
        {...props.register}
        {...props}
        required={props.required}
      />
      {props.register?.name && props.errors?.[props?.register?.name] && (
        <span className="text-red-500 text-xs">
          {props.errors?.[props?.register?.name]?.message?.toString()}
        </span>
      )}
    </div>
  );
}

import { cn } from "@/utils/cn";
import { InputHTMLAttributes } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name?: string;
  required?: boolean;
  className?: string;
  register?: UseFormRegisterReturn;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: FieldErrors<any>
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DatePicker(props: DatePickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-normal text-neutral-500">
        {props.label}
      </label>
      <input
        style={{
          border: "1px solid",
          borderColor:
            props.register?.name &&
              props.errors?.[props?.register?.name] ?
              "#FF0000" : "transparent",
          backgroundColor:
            props.register?.name &&
            props.errors?.[props?.register?.name] &&
            "#fee2e2"
        }}
        className={
          cn(
            "hover:bg-neutral-700 transition-colors shadow-sm focus:hover:bg-neutral-900",
            "h-8 font-normal placeholder:text-neutral-500 rounded-md bg-neutral-900 outline-none px-4 py-[18px]", 
            "w-48",
          props.className
        )
        }
        {...props.register}
        required={props.required}
        type="date"
        {...props}
      />
      {props.register?.name && props.errors?.[props?.register?.name] && (
        <span className="text-red-500 text-xs">
          {props.errors?.[props?.register?.name]?.message?.toString()}
        </span>
      )}
    </div>
  );
}

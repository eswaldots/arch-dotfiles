import { ChevronDownIcon } from "@/assets/icons/chevron-down";
import { SelectProvider, useSelect } from "./select-context";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useEffect, useRef } from "react";
import { Control, Controller, FieldErrors, RegisterOptions } from "react-hook-form";

interface PropsSelect {
  value?: string;
  required?: boolean;
  name: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
  label: string;
  // eslint-disable-next-line
  control: Control<any>;
  errors?: FieldErrors;
  // eslint-disable-next-line
  rules?: Omit<RegisterOptions<any, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined;
}

function Select(props: PropsSelect) {
  return <Controller
    name={props.name}
    rules={props.rules}
    control={props.control}
    render={({ field: { onChange, value: defaultValue } }) => {
      // eslint-disable-next-line
      const { value, isOpen, setIsOpen, setDefaultValue } = useSelect();

      // eslint-disable-next-line
      useEffect(() => {
        if (value?.value !== "placeholder") onChange(value?.value)
      }, [value, onChange])

      // eslint-disable-next-line
      useEffect(() => {
        if (defaultValue) setDefaultValue(defaultValue)

        // eslint-disable-next-line
      }, [])

      // eslint-disable-next-line
      const ref = useRef<HTMLDivElement>(null);

      // eslint-disable-next-line
      useOutsideClick(ref, () => setIsOpen(false));

      return (
        <div ref={ref} className="relative flex flex-col gap-2">

          <label className="text-sm font-normal text-neutral-500">
            {props.label}
          </label>

          <section className="relative w-full inline-block">
            <div
              onClick={() => setIsOpen(!isOpen)}
              style={{
                border: "1px solid",
                borderColor:
                  props.name &&
                    props.errors?.[props?.name] ?
                    "#FF0000" : "var(--neutral-800)",
                backgroundColor:
                  props.name &&
                  props.errors?.[props?.name] &&
                  "#fee2e2"
              }}
              className={
                "text-normal flex items-center disabled:hover:bg-neutral-900 font-normal h-8 w-full hover:bg-neutral-700 transition-colors shadow-sm focus:hover:bg-neutral-900 rounded-md bg-neutral-900 outline-none px-4 py-[18px] "
              }
            >
              <select
                name={props.name}
                defaultValue={"placeholder"}
                required={props.required}
                className={
                  "bg-transparent appearance-none"
                }
              >
                {value?.children ?? (
                  <option
                    className="opacity-60 bg-transparent"
                    value={"placeholder"}
                  >
                    Seleccione
                  </option>
                )}
              </select>
              <ChevronDownIcon className="text-neutral-500 opacity-60 absolute right-3 size-5" />
            </div>
            {props.name && props.errors?.[props?.name] && (
              <span className="text-red-500 text-xs">
                {props.errors?.[props?.name]?.message?.toString()}
              </span>
            )}
            <article style={{ opacity: isOpen ? 1 : 0, display: isOpen ? 'block' : 'none' }} className="animate-openSelect transition-all absolute bg-neutral-800 z-50 w-full mt-2 flex flex-col px-4 py-2 rounded-md shadow-sm  motion-duration-75 motion-ease-in motion-preset-fade-lg ">
              {props.children}
            </article>
          </section >
        </div >
      );
    }}
  />
}

// Esto se hace para poder tener acceso al useSelect en el componente de arriba

export default function Component(props: PropsSelect) {
  return (
    <SelectProvider>
      <Select {...props} />
    </SelectProvider>
  );
}

import { ChevronDownIcon } from "@/assets/icons/chevron-down";
import { SelectProvider, useSelect } from "./select-context";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useEffect, useRef, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  RegisterOptions
} from "react-hook-form";
import ColorSelectItem from "./select-item";

interface PropsSelect {
  value?: string;
  name: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
  label: string;
  // eslint-disable-next-line
  control: Control<any>;
  errors?: FieldErrors;

  rules?:
    | Omit<
        RegisterOptions<any, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
}

type Position = "top" | "bottom";

function Component(props: PropsSelect) {
  return (
    <Controller
      name={props.name}
      rules={props.rules}
      control={props.control}
      render={({ field: { onChange, value: defaultValue } }) => {
        // eslint-disable-next-line
        const { value, isOpen, setIsOpen } = useSelect();
        // eslint-disable-next-line
        const [ci, setCI] = useState<string>(defaultValue === "undefined" ? "" : defaultValue?.slice(1) ?? "");

        // eslint-disable-next-line
        const [position, setPosition] = useState<Position>("bottom");

        // eslint-disable-next-line
        useEffect(() => {
          if (value?.value !== "placeholder")
            onChange(String(value?.value + ci));
        }, [value, onChange, ci]);

        // eslint-disable-next-line
        useEffect(() => {
          if (defaultValue !== undefined) {
            onChange(defaultValue);
          }
        }, []);

        // eslint-disable-next-line
        const selectRef = useRef<HTMLDivElement>(null);
        // eslint-disable-next-line
        const menuRef = useRef<HTMLDivElement>(null);

        // eslint-disable-next-line
        useOutsideClick(selectRef, () => setIsOpen(false));

        // eslint-disable-next-line
        useEffect(() => {
          const updatePosition = () => {
            if (selectRef.current && menuRef.current) {
              const selectRect = selectRef.current.getBoundingClientRect();
              const menuHeight = menuRef.current.offsetHeight;
              const viewportHeight = window.innerHeight;

              const spaceBelow = viewportHeight - selectRect.bottom;
              const spaceAbove = selectRect.top;

              if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
                setPosition("top");
              } else {
                setPosition("bottom");
              }
            }
          };

          updatePosition();
          window.addEventListener("resize", updatePosition);
          return () => window.removeEventListener("resize", updatePosition);
        }, [isOpen]);

        return (
          <div ref={selectRef} className="flex flex-col gap-2">
            <label className="text-sm font-normal text-neutral-500">
              {props.label}
            </label>

            <section className="relative inline-block w-full gap-3">
              <div className="flex w-full items-center gap-3">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  style={{
                    border: "1px solid",
                    borderColor:
                      props.name && props.errors?.[props?.name]
                        ? "#FF0000"
                        : "var(--neutral-800)"
                  }}
                  className={
                    "text-normal flex items-center disabled:hover:bg-neutral-900 font-normal h-8 w-20 hover:bg-neutral-700 transition-colors shadow-sm focus:hover:bg-neutral-900 rounded-md bg-neutral-900 outline-none px-4 py-[18px] " +
                    props.className
                  }
                >
                  <select
                    name={props.name}
                    defaultValue={"placeholder"}
                    className="bg-transparent appearance-none"
                  >
                    {defaultValue ? (
                      <option
                        className="opacity-60 capitalize bg-transparent"
                        value={defaultValue[0] === "u" ? "-" : defaultValue[0]}
                      >
                        {defaultValue[0] === "u" ? "-" : defaultValue[0]}
                      </option>
                    ) : (
                      <option className="opacity-60 bg-transparent" value={"-"}>
                        -
                      </option>
                    )}
                  </select>
                  <ChevronDownIcon className="text-neutral-500 opacity-60 size-5 ml-auto" />
                </div>
                <input
                  onChange={(e) => {
                    setCI(e.target.value);
                  }}
                  value={ci}
                  defaultValue={defaultValue}
                  type="text"
                  style={{
                    border: "1px solid",
                    borderColor:
                      props.name && props.errors?.[props?.name]
                        ? "#FF0000"
                        : "var(--neutral-800)"
                  }}
                  className={
                    "text-normal disabled:hover:bg-neutral-900 font-normal h-8 w-full hover:bg-neutral-700 transition-colors shadow-sm focus:hover:bg-neutral-900 rounded-md bg-neutral-900 outline-none px-4 py-[18px] "
                  }
                />
              </div>
              <article
                ref={menuRef}
                style={{
                  opacity: isOpen ? 1 : 0,
                  display: isOpen ? "block" : "none"
                }}
                className={
                  "transition-all motion-preset-fade-sm motion-scale-in-90 motion-ease motion-duration-75 absolute bg-neutral-800 z-50 w-20 flex flex-col px-2 py-1 rounded-md shadow-sm " +
                  (position === "bottom" ? "mt-2 top-full" : "bottom-full mb-2")
                }
              >
                <ColorSelectItem value="V">V</ColorSelectItem>
                <ColorSelectItem value="E">E</ColorSelectItem>
                <ColorSelectItem value="J">J</ColorSelectItem>
                <ColorSelectItem value="P">P</ColorSelectItem>
                <ColorSelectItem value="G">G</ColorSelectItem>
              </article>
            </section>
            {props.name && props.errors?.[props.name] && (
              <span className="text-red-500 text-xs">
                {props.errors?.[props?.name]?.message?.toString()}
              </span>
            )}
          </div>
        );
      }}
    />
  );
}

// Esto se hace para poder tener acceso al useSelect en el componente de arriba

export default function CISelect(props: PropsSelect) {
  return (
    <SelectProvider>
      <Component {...props} />
    </SelectProvider>
  );
}

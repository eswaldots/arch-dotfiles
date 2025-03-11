import { CameraIcon } from "@/assets/icons/camera";
import usePhotoPicker from "./use-photo-picker";
import {
  Control,
  Controller,
  FieldErrors,
  RegisterOptions
} from "react-hook-form";
import { LoaderIcon } from "@/assets/icons/loader";

interface PhotoPickerProps {
  value?: string;
  name: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: FieldErrors<any>;

  rules?:
    | Omit<
        RegisterOptions<any, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  disabled?: boolean;
}

export default function PhotoPicker(props: PhotoPickerProps) {
  const { image, searchImage, convertLocalSrc, setError, error } = usePhotoPicker();

  return (
    <Controller
      name={props.name}
      rules={props.rules}
      control={props.control}
      disabled={props.disabled}
      render={({ field: { onChange, value } }) => {
        return (
          <>
            <article
              {...props}
              style={{
                border: "1px solid",
                borderColor:
                  props.name && props.errors?.[props?.name]
                    ? "#FF0000"
                    : "var(--neutral-800)"
              }}
              className="relative grid bg-neutral-800 place-content-center h-48 rounded-md transition-colors w-full"
            >
              <input type="hidden" value={value} name={props.name} />
              <picture
                className="absolute inset-0 w-full h-full"
                style={{
                  cursor: value && "pointer"
                }}
                onClick={async () =>
                  value &&
                  (await searchImage().then((image) => onChange(image)))
                }
              >
                {value && error ? (
                  <img
                    onError={() => {
                      setError(() => true)
                    }}
                    loading="eager"
                    decoding="sync"
                    className="rounded-md size-full object-contain"
                    src={image || convertLocalSrc(value)}
                  />
                )
                 : (
                  <picture className="size-full text-primary grid place-content-center">
                  <LoaderIcon className="size-24" />
                  </picture>
                )}
              </picture>
              <button
                type="button"
                onClick={async () =>
                  await searchImage().then((image) => onChange(image))
                }
                style={{
                  display: value ? "none" : "grid",
                  opacity: props.disabled ? "0.6" : "1",
                  pointerEvents: props.disabled ? "none" : "auto"
                }}
                className={
                  "z-30 place-content-center hover:scale-105 transition rounded-full bg-primary hover:opacity-80 size-12"
                }
              >
                <CameraIcon className="text-neutral-900 text-2xl" />
              </button>
            </article>
            {props.name && props.errors?.[props?.name] && (
              <span className="text-red-500 text-xs">
                {props.errors?.[props?.name]?.message?.toString()}
              </span>
            )}
          </>
        );
      }}
    ></Controller>
  );
}

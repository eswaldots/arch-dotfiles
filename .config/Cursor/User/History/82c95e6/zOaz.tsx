import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import DatePicker from "../datepicker";
import Input from "../input";
import { useEffect, useState } from "react";
import { getAge } from "@/utils/get-age";
import { useDebouncedCallback } from "@/hooks/use-debounce";

interface AgeInputProps {
  label: string;
  value?: string;
  onChangeAge?: (age: string) => void;
  className?: string;
  name?: string;
  nameAge?: string;
  labelAge?: string;
  register_age?: UseFormRegisterReturn;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: FieldErrors<any>;
  disabled?: boolean;
  required?: boolean;
  type?: "age" | "expiration";
  defaultValueAge?: string
}

export default function AgeInput(props: AgeInputProps) {
  const [age, setAge] = useState(0);

  const handleChange = useDebouncedCallback((dateString: string) => {
    const parsedDate = new Date(dateString);

    const years =
      props?.type !== "expiration"
        ? getAge(parsedDate)
        : -1 * getAge(parsedDate);

    setAge(years);
  }, 100);

  useEffect(() => {
    if (props.onChangeAge) props.onChangeAge(age.toString());
  }, [age]);

  return (
    <div className="flex flex-col gap-2">
      <section className="flex gap-3 items-center justify-between">
        <div className="w-96">
          <DatePicker
            register={props.register}
            errors={props?.errors}
            onChange={(e) => handleChange(e.target.value)}
            name={props.name}
            label={props.label}
          />
        </div>
        <Input
        defaultValue={props.defaultValueAge}
          register={props.register_age}
          value={age.toString()}
          errors={props?.errors}
          name={props.nameAge}
          label={props.labelAge || "Edad"}
        />
      </section>
    </div>
  );
}

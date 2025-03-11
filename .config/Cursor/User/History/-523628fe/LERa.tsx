import Button from "@/components/buttons/button";
import Input from "@/components/inputs/input";
import { useModal } from "@/components/modal/modal-context";
import { FieldValues, useForm } from "react-hook-form";
import { useRecords } from "../-context/records-context";
import Select from "@/components/select";
import SelectItem from "@/components/select/select-item";
import { INPUT_STRING_ERROR_MESSAGE } from "../../-constants";

export default function RecordForm() {
  const { addRecord } = useRecords();

  const { setOpen } = useModal();

  const id = Math.random().toString(36).slice(2);

  const handleSubmitForm = (e: FieldValues) => {
    addRecord({
      id,
      record_name: e.record_name,
      record_type: e.record_type as "admonition" | "course"
    });

    return setOpen(false);
  };

  const { register, formState: { errors }, handleSubmit, control } = useForm();

  return (
    <form
      id="nested-form"
      onSubmit={handleSubmit(handleSubmitForm)}
      className="bg-neutral-950 shadow-md pb-24 p-8 flex flex-col gap-5"
    >
      <h1 className="text-xl font-bold">Delito</h1>
      <section className="flex flex-col gap-5 justify-between w-full">
        <Input register={register("record_name", { required: INPUT_STRING_ERROR_MESSAGE })} name={"record_name"} label="Nombre del delito" errors={errors} />

        <Select errors={errors} rules={{ required: INPUT_STRING_ERROR_MESSAGE }} control={control} name="record_type" label="Tipo">
          <SelectItem value="admonition">Delito menor</SelectItem>
          <SelectItem value="course">Delito mayor</SelectItem>
        </Select>
      </section>

      <Button type="submit" form="nested-form" className="font-bold absolute bottom-8 right-8 bg-primary hover:opacity-80">
        Agregar
      </Button>
    </form>
  );
}

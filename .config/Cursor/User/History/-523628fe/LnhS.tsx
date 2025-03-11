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
      delito: e.delito,
      tipo: e.tipo as "menor" | "mayor",
      duracion: e.duracion,
      fecha_inicio: e.fecha_inicio,
      fecha_fin: e.fecha_fin
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
      <h1 className="text-xl font-bold">Historial delictivo</h1>
      <section className="flex flex-col gap-5 justify-between w-full">
        <Input
          register={register("delito", { required: INPUT_STRING_ERROR_MESSAGE })}
          name="delito"
          label="Delito cometido"
          errors={errors}
        />

        <Select
          errors={errors}
          rules={{ required: INPUT_STRING_ERROR_MESSAGE }}
          control={control}
          name="tipo"
          label="Tipo de delito"
        >
          <SelectItem value="menor">Delito menor</SelectItem>
          <SelectItem value="mayor">Delito mayor</SelectItem>
        </Select>

        <Input
          type="number"
          register={register("duracion", {
            required: "Duración requerida",
            min: { value: 1, message: "Mínimo 1 mes" }
          })}
          name="duracion"
          label="Duración de condena (meses)"
          errors={errors}
        />

        <Input
          type="date"
          register={register("fecha_inicio", { required: "Fecha requerida" })}
          name="fecha_inicio"
          label="Fecha de inicio de condena"
          errors={errors}
        />

        <Input
          type="date"
          register={register("fecha_fin", { required: "Fecha requerida" })}
          name="fecha_fin"
          label="Fecha de fin de condena"
          errors={errors}
        />
      </section>

      <Button
        type="submit"
        form="nested-form"
        className="font-bold absolute bottom-8 right-8 bg-primary hover:opacity-80"
      >
        Registrar historial
      </Button>
    </form>
  );
}

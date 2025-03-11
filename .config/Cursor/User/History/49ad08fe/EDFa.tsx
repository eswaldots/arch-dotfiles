import Button from "@/components/buttons/button";
import Input from "@/components/inputs/input";
import { useModal } from "@/components/modal/modal-context";
import { FieldValues, useForm } from "react-hook-form";
import { useRecords, Record} from "../-context/records-context";
import Select from "@/components/select";
import SelectItem from "@/components/select/select-item";
import { INPUT_STRING_ERROR_MESSAGE } from "../../-constants";
import PhotoPicker from "@/components/inputs/photo-picker";

export default function BoundingMemberForm() {
  const { addRecord } = useRecords();

  const { setOpen } = useModal();

  const id = Math.random().toString(36).slice(2);

  const handleSubmitForm = (e: Record) => {

    addRecord({
      ...e,
      id
    });

    return setOpen(false);
  };

  const { register, formState: { errors }, handleSubmit, control } = useForm();

  // TODO: Array tables are not working for personal and repein at the same time

  return (
    <form
      id="nested-form"
      onSubmit={handleSubmit(handleSubmitForm)}
      className="bg-neutral-950 shadow-md pb-24 p-8 flex flex-col gap-5 w-[548px] overflow-y-auto max-h-[90vh]"
    >
      <h1 className="text-xl font-bold">Delito</h1>
      <section className="flex flex-col gap-5 justify-between w-full">
        <Input register={register("record_name", { required: INPUT_STRING_ERROR_MESSAGE })} name={"record_name"} label="Descripcion Delito" errors={errors} />

        <Select errors={errors} rules={{ required: INPUT_STRING_ERROR_MESSAGE }} control={control} name="record_type" label="Tipo">
          <SelectItem value="expediente">Expediente</SelectItem>
          <SelectItem value="oficio">Oficio</SelectItem>
        </Select>

        <Select errors={errors} rules={{ required: INPUT_STRING_ERROR_MESSAGE }} control={control} name="record_organism" label="Organismo">
          <SelectItem value="org1">CPNB</SelectItem>
          <SelectItem value="org2">CICPC</SelectItem>
        </Select>

        <Select errors={errors} rules={{ required: INPUT_STRING_ERROR_MESSAGE }} control={control} name="record_dependency" label="Dependencia">
          <SelectItem value="tribunal">Tribunal</SelectItem>
          <SelectItem value="juzgado">Juzgado</SelectItem>
          <SelectItem value="delegacion">Delegación</SelectItem>
          <SelectItem value="subdelegacion">Sub Delegación</SelectItem>
        </Select>

        <Select errors={errors} rules={{ required: INPUT_STRING_ERROR_MESSAGE }} control={control} name="record_state" label="Estado">
          <SelectItem value="estado1">Miranda</SelectItem>
          <SelectItem value="estado2">Carabobo</SelectItem>
        </Select>

        <Input register={register("record_document", { required: INPUT_STRING_ERROR_MESSAGE })} name={"record_document"} label="N° Documento" errors={errors} />

        <Input register={register("record_date", { required: INPUT_STRING_ERROR_MESSAGE })} name={"record_date"} type="date" label="Fecha" errors={errors} />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Imagenes</label>
          <PhotoPicker name="record_images" control={control} rules={{ required: INPUT_STRING_ERROR_MESSAGE }} errors={errors} />
</div>
      </section>

      <Button type="submit" form="nested-form" className="font-bold absolute bottom-8 right-8 bg-primary hover:opacity-80">
        Agregar
      </Button>
    </form>
  );
}

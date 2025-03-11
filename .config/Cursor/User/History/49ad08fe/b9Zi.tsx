import Button from "@/components/buttons/button";
import Input from "@/components/inputs/input";
import { useModal } from "@/components/modal/modal-context";
import { useForm } from "react-hook-form";
import { Record } from "@/models/personal-models";
import Select from "@/components/select";
import SelectItem from "@/components/select/select-item";
import PhotoPicker from "@/components/inputs/photo-picker";
import useBounding from "../-context/use-bounding";
import { INPUT_STRING_ERROR_MESSAGE } from "@/constants/validations";
import { Records } from "@/models/analysis-model";

export default function BoundingMemberForm() {
const setBoundingMember = useBounding((state) => state.setBoundingMember) 

  const { setOpen } = useModal();

  const id = Math.random().toString(36).slice(2);

  const handleSubmitForm = (e: Records) => {

    setBoundingMember({
      id,
      record_date: e.record_date,
      record_document: e.record_document,
      record_name: e.record_name,
      record_organism: e.record_organism,
      record_dependency: e.record_dependency,
      record_state: e.record_state,
      record_type: e.record_type,
      record_images: e.record_images ?? "ex",
      record_role: e.record_role ?? undefined,
      record_siipol: e.record_siipol ?? undefined,
      record_interpol: e.record_interpol ?? undefined,
    });

    return setOpen(false);
  };

  const { register, formState: { errors }, handleSubmit, control } = useForm<Record>();

  // TODO: Array tables are not working for personal and repein at the same time

  return (
    <form
      id="nested-form"
      onSubmit={handleSubmit(handleSubmitForm)}
      className="bg-neutral-950 shadow-md pb-24 p-8 flex flex-col gap-5 w-[700px] overflow-y-auto max-h-[100vh]"
    >
      <h1 className="text-2xl font-bold">Agregar Documento a Persona</h1>
      <section className="flex flex-col gap-5 justify-between w-full">
        {/* Primera fila */}
        <div className="grid grid-cols-3 gap-4">
          <Select errors={errors} rules={{ required: INPUT_STRING_ERROR_MESSAGE }} control={control} name="record_type" label="Tipo">
            <SelectItem value="expediente">Expediente</SelectItem>
            <SelectItem value="oficio">Oficio</SelectItem>
          </Select>

          <Input register={register("record_document", { required: INPUT_STRING_ERROR_MESSAGE })} name={"record_document"} label="N° Documento" errors={errors} />

          <Input register={register("record_date", { required: INPUT_STRING_ERROR_MESSAGE })} name={"record_date"} type="date" label="Fecha" errors={errors} />
        </div>

        {/* Segunda fila */}
        <div className="grid grid-cols-3 gap-4">
          <Select errors={errors} rules={{ required: INPUT_STRING_ERROR_MESSAGE }} control={control} name="record_organism" label="Organismo">
            <SelectItem value="1">CPNB</SelectItem>
            <SelectItem value="2">CICPC</SelectItem>
          </Select>

          <Select errors={errors} rules={{ required: INPUT_STRING_ERROR_MESSAGE }} control={control} name="record_dependency" label="Dependencia">
            <SelectItem value="tribunal">Tribunal</SelectItem>
            <SelectItem value="juzgado">Juzgado</SelectItem>
            <SelectItem value="delegacion">Delegación</SelectItem>
            <SelectItem value="subdelegacion">Sub Delegación</SelectItem>
          </Select>

          <Select errors={errors} rules={{ required: INPUT_STRING_ERROR_MESSAGE }} control={control} name="record_state" label="Estado">
            <SelectItem value="Miranda">Miranda</SelectItem>
            <SelectItem value="Carabobo">Carabobo</SelectItem>
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Select errors={errors} rules={{ required: INPUT_STRING_ERROR_MESSAGE }} control={control} name="record_role" label="Rol">
            <SelectItem value="1">CPNB</SelectItem>
            <SelectItem value="2">CICPC</SelectItem>
          </Select>

          <Select errors={errors} rules={{ required: INPUT_STRING_ERROR_MESSAGE }} control={control} name="record_siipol" label="SIIPOL">
            <SelectItem value="tribunal">Tribunal</SelectItem>
            <SelectItem value="juzgado">Juzgado</SelectItem>
            <SelectItem value="delegacion">Delegación</SelectItem>
            <SelectItem value="subdelegacion">Sub Delegación</SelectItem>
          </Select>

          <Select errors={errors} rules={{ required: INPUT_STRING_ERROR_MESSAGE }} control={control} name="record_interpol" label="Interpol">
            <SelectItem value="1">SI</SelectItem>
            <SelectItem value="0">NO</SelectItem>
          </Select>
        </div>

        <Input register={register("record_name", { required: INPUT_STRING_ERROR_MESSAGE })} name={"record_name"} label="Descripcion Delito" errors={errors} />

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

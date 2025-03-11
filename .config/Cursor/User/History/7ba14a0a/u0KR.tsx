import SelectItem from "@/components/select/select-item";
import Select from "@/components/select";
import { useForm } from "react-hook-form";
import { STATUS_OPTIONS } from "../../-constants";
import DatePicker from "@/components/inputs/datepicker";
import Input from "@/components/inputs/input";
import Textarea from "@/components/inputs/textarea";
import Button from "@/components/buttons/button";
import { StatusModel } from "../-models/status-model";
import { INPUT_DATE_ERROR_MESSAGE, INPUT_SELECT_ERROR_MESSAGE, INPUT_STRING_ERROR_MESSAGE } from "@/constants/validations";

export default function StatusForm() {
    const { control, register } = useForm<StatusModel>();

    return (
        <form className="bg-neutral-950 p-8 w-[480px] pb-24">
            <section className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold mb-4">Actualizacion de estado</h1>
            <div className="grid grid-cols-2 gap-4">
            <Select name="status" rules={{ required: INPUT_SELECT_ERROR_MESSAGE }} label="Estado actual" control={control}>
                {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </Select>

            <DatePicker name="date" register={register("date", { required: INPUT_DATE_ERROR_MESSAGE })} label="Fecha de actualizacion" />
</div>
            <div className="grid grid-cols-2 gap-4">
                <Input name="verifier_phone" register={register("verifier_phone", { required: INPUT_STRING_ERROR_MESSAGE })} label="N° de verificador" />
<Input name="verifier_name" register={register("verifier_name", { required: INPUT_STRING_ERROR_MESSAGE })} label="Nombre del verificador" />
</div>

<Textarea label="Observaciones" />

<Button className="absolute bottom-8 right-8">Guardar</Button>
</section>
        </form>

    )
}
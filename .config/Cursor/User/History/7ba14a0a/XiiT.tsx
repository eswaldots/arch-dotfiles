import SelectItem from "@/components/select/select-item";
import Select from "@/components/select";
import { useForm } from "react-hook-form";
import { STATUS_OPTIONS } from "../../-constants";
import DatePicker from "@/components/inputs/datepicker";
import Input from "@/components/inputs/input";
import Textarea from "@/components/inputs/textarea";
import Button from "@/components/buttons/button";

export default function StatusForm() {
    const { control } = useForm();

    return (
        <article className="bg-neutral-950 p-8 w-[480px] pb-24">
            <section className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold mb-4">Actualizacion de estado</h1>
            <div className="grid grid-cols-2 gap-4">
            <Select name="status" label="Estado actual" control={control}>
                {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </Select>

            <DatePicker name="date" label="Fecha de actualizacion" />
</div>
            <div className="grid grid-cols-2 gap-4">
                <Input name="verifier_phone" label="N° de verificador" />
<Input label="Nombre del verificador" />

</div>

<Textarea label="Observaciones" />

<Button className="absolute bottom-8 right-8">Guardar</Button>
</section>
        </article>

    )
}
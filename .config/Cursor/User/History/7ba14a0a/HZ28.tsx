import SelectItem from "@/components/select/select-item";
import Select from "@/components/select";
import { useForm } from "react-hook-form";
import { STATUS_OPTIONS } from "../../-constants";

export default function StatusForm() {
    const { control } = useForm();

    return (
        <article className="bg-neutral-950 p-8">
            <h1 className="text-2xl font-semibold mb-4">Actualizacion de estado</h1>
            <Select name="status" label="Estado actual" control={control}>
                {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </Select>
        </article>
    )
}
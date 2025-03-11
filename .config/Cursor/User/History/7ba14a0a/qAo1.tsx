import SelectItem from "@/components/select/select-item";
import { STATUS_OPTIONS } from "../-constants";
import Select from "@/components/select";

export default function StatusForm() {
    return (
        <article className="bg-neutral-950 p-8">
            <h1 className="text-2xl font-semibold">Estado de la vinculacion</h1>
            <Select name="status" label="" control={control}>
                {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </Select>
        </article>
    )
}
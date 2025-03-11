import SelectItem from "@/components/select/select-item";
import { STATUS_OPTIONS } from "../-constants";
import Select from "@/components/select";

export default function StatusForm() {
    return (
        <article className="bg-neutral-950 p-8">
            <h1 className="text-2xl font-semibold">Estado de la vinculacion</h1>
            <Select>
                <SelectItem>
                    {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </SelectItem>
            </Select>
        </article>
    )
}
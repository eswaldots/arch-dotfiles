import Select from "@/components/select";
import { STATUS_OPTIONS } from "../-constants";

export default function StatusForm() {
    return (
        <article className="bg-neutral-950 p-8">
            <h1 className="text-2xl font-semibold">Estado de la vinculacion</h1>
            <Select></Select>
        </article>
    )
}
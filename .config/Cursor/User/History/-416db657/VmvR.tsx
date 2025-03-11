import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import Input from "@/components/inputs/input";
import { useForm } from "react-hook-form";
import SelectItem from "@/components/select/select-item";
import Select from "@/components/select";
import Button from "@/components/buttons/button";
import DatePicker from "@/components/inputs/datepicker";
import SearchInput from "@/components/inputs/search-input";

export const Route = createFileRoute(
  "/_app/analysis/_layout/management/update/"
)({
  component: RouteComponent
});

function RouteComponent() {
  const { control } = useForm();
  return (
    <main className="py-3 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Actualizacion de Estado</h1>
      <section className="flex gap-4 mb-6 items-center">
        <SearchInput label="Buscar por Numero de Vinculacion" />
      </section>
      <section className="flex flex-col gap-4">
        <h1>banda</h1>
        <h1>persona</h1>

        <Select control={control} name="type" label="Estatus">
          <SelectItem value="aprobado">Aprobado</SelectItem>

          <SelectItem value="negado">Negado</SelectItem>

          <SelectItem value="visto">Visto</SelectItem>

          <SelectItem value="diferido">Diferido</SelectItem>

          <SelectItem value="otro">Otro</SelectItem>
        </Select>

        <Button>Aceptar</Button>
      </section>
    </main>
  );
}

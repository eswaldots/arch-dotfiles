import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import Input from "@/components/inputs/input";
import { useForm } from "react-hook-form";
import SelectItem from "@/components/select/select-item";
import Select from "@/components/select";
import Button from "@/components/buttons/button";
import DatePicker from "@/components/inputs/datepicker";
import SearchInput from "@/components/inputs/search-input";
import ItemsTable from "../bounding/-components/items-table";
import ItemTable from "../bounding/-components/item-table";

export const Route = createFileRoute(
  "/_app/analysis/_layout/management/update/"
)({
  component: RouteComponent
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const bands = Route.useLoaderData().data;

  return (
    <section className="text-left w-screen px-8 flex flex-col gap-4">
      <h1 className="text-2xl text-left font-semibold">Seleccionar banda</h1>

      <div className="w-full">
        <SearchInput label="Buscar banda" />
      </div>

      <ItemsTable>
        {bands?.map((band: any, index: number) => (
          <ItemTable
            key={band.id}
            isFirst={index === 0}
            isLast={index === bands.length - 1}
          >
            <div className="flex flex-col">
              <span className="font-semibold">{band.Nombre}</span>
              <span className="text-sm text-neutral-500">
              {band.Lider > 1 ? "Lider" : "Lider"} {band.Lider} • {band.Miembros} {band.Miembros > 1 ? "Miembros" : "integrante"} • {band.ZonaOP}
              </span>
            </div>
          </ItemTable>
        ))}
      </ItemsTable>
    </section>
  );
}

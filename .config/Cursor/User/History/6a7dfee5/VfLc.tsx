import Table from "@/components/table";
import { getCustomTable } from "@/services/archive.service";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import Search from "./-components/search";
import CreateBands from "./-components/create-bands";
import { BANDS_TABLE } from "../-consts";
import { useRefreshListener } from "@/hooks/use-refresh-listener";
import { useState } from "react";
import { FIELD_DISPLAY_NAMES, VISIBLE_FIELDS } from './-consts/field-names';

export const Route = createFileRoute("/_app/analysis/_layout/archive/bands/")({
  component: RouteComponent,
  loader: async () => {
    const bands = await getCustomTable(BANDS_TABLE);

    if (bands.error) {
      return null;
    }

    const transformedBands = bands.data.map(band => {
      const transformedBand: any = {};
      VISIBLE_FIELDS.forEach(key => {
        const displayName = FIELD_DISPLAY_NAMES[key as keyof typeof FIELD_DISPLAY_NAMES];
        transformedBand[displayName] = band[key];
      });
      return transformedBand;
    });

    return { ...bands, data: transformedBands };
  }
});

function RouteComponent() {
  const router = useRouter();
  const [filteredBands, setFilteredBands] = useState<any[]>([]);
  const bands = Route.useLoaderData()?.data;

  useRefreshListener(router);

  return bands ? (
    <main className="px-5 py-3">
      <h1 className="text-2xl font-bold">Bandas</h1>
      <header className="flex justify-between items-end mt-4">
        <Search 
          bands={bands} 
          onSearch={setFilteredBands} 
        />
        <CreateBands />
      </header>
      {bands.length > 0 ? (
        <Table 
          data={filteredBands.length > 0 ? filteredBands : bands}
          columns={VISIBLE_FIELDS.map(field => ({
            ...BANDS_TABLE?.columns?.find(col => col.field === field),
            headerClassName: 'text-center'
          }))}
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-neutral-500 my-5">No hay bandas disponibles</p>
        </div>
      )}
    </main>
  ) : (
    <div classname="flex flex-col items-center justify-center min-h-[calc(100vh-32px)] gap-3">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        classname="h-12 w-12 text-red-500 animate-pulse" 
        fill="none" 
        viewbox="0 0 24 24" 
        stroke="currentcolor"
      >
        <path 
          strokelinecap="round" 
          strokelinejoin="round" 
          strokewidth={2} 
          d="m12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3l13.732 4c-.77-1.333-2.694-1.333-3.464 0l3.34 16c-.77 1.333.192 3 1.732 3z" 
        />
      </svg>
      <h1 classname="text-red-500 font-semibold text-lg">error cargando bandas</h1>
      <p classname="text-neutral-500 text-sm">intente de nuevo más tarde</p>
    </div>
  );
}

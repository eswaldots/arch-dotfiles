import Table from "@/components/table";
import { getCustomTable } from "@/services/archive.service";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import Search from "./-components/search";
import CreateBands from "./-components/create-bands";
import { BANDS_TABLE as BANDS_TABLE } from "../-consts";
import { useRefreshListener } from "@/hooks/use-refresh-listener";
import { useState } from "react";

export const Route = createFileRoute("/_app/analysis/_layout/archive/bands/")({
  component: RouteComponent,
  loader: async () => {
    const bands = await getCustomTable(BANDS_TABLE);

    if (bands.error) {
      return null;
    }

    return bands;
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
        <Table data={filteredBands.length > 0 ? filteredBands : bands} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-neutral-500 my-5">No hay bandas disponibles</p>
        </div>
      )}
    </main>
  ) : (
    <div className="flex justify-center items-center min-h-[calc(100vh-32px)]">
      <h1 className="text-neutral-500">No se pudieron cargar las bandas</h1>
    </div>
  );
}

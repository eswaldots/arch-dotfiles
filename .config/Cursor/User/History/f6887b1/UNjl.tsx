import Table from "@/components/table";
import { getCustomTable } from "@/services/archive.service";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import Search from "./-components/search";
import { useRefreshListener } from "@/hooks/use-refresh-listener";
import { useState } from "react";
import CreateQuadrant from "./-components/create-quadrant";
import { QUADRANT_TABLE } from "../-consts";

export const Route = createFileRoute("/_app/analysis/_layout/archive/quadrant/")({
  component: RouteComponent,
  loader: async () => {
    const quadrant = await getCustomTable(QUADRANT_TABLE);

    if (quadrant.error) {
      return null;
    }

    return quadrant;
  }
});

function RouteComponent() {
  const router = useRouter();
  const [filteredQuadrants, setFilteredQuadrants] = useState<any[]>([]);
  const quadrant = Route.useLoaderData()?.data;

  useRefreshListener(router);

  return quadrant ? (
    <main className="px-5 py-3">
      <h1 className="text-2xl font-bold">Cuadrantes</h1>
      <header className="flex justify-between items-end mt-4">
        <Search 
          quadrant={quadrant} 
          onSearch={setFilteredQuadrants} 
        />
        <CreateQuadrant />
      </header>
      {quadrant.length > 0 ? (
        <Table data={filteredQuadrants.length > 0 ? filteredQuadrants : quadrant} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-neutral-500 my-5">No hay cuadrantes disponibles</p>
        </div>
      )}
    </main>
  ) : (
    <div className="flex justify-center items-center min-h-[calc(100vh-32px)]">
      <h1 className="text-neutral-500">No se pudieron cargar los cuadrantes</h1>
    </div>
  );
}

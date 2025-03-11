import Table from "@/components/table";
import { getCustomTable } from "@/services/archive.service";
import { createFileRoute } from "@tanstack/react-router";
import Search from "./-components/search";
import CreateInstitute from "./-components/create-institute";
import { INSTITUTES_TABLE } from "../-consts";

export const Route = createFileRoute(
  "/_app/personal/_layout/archive/institutes/"
)({
  component: RouteComponent,
  loader: async () => {
    const institutes = await getCustomTable(INSTITUTES_TABLE);

    if (institutes.error) {
      return null
    }

    return institutes;
  }
});

function RouteComponent() {
  const institutes = Route.useLoaderData()?.data;

  return institutes ? (
    <main className="px-5 py-3">
      <h1 className="text-2xl font-bold">Institutos</h1>
      <header className="flex justify-between items-end mt-4">
        <Search />
        <CreateInstitute />
      </header>
      {institutes.length > 0 ? (
        <Table data={institutes} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-neutral-500 my-5">No hay institutos disponibles</p>
        </div>
      )}
    </main>
  ) : (<h1>
    <span className="text-neutral-500">
      No se pudo cargar los institutos
    </span>
  </h1>);
}

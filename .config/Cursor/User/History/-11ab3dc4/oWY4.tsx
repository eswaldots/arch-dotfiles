import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import ItemTable from "../-components/item-table";
import ItemsTable from "../-components/items-table";
import useBounding from "../-context/use-bounding";
import { getCustomTable } from "@/services/archive.service";
import { BANDS_TABLE } from "../../../archive/-consts";
import SearchInput from "@/components/inputs/search-input";

export const Route = createFileRoute(
  "/_app/analysis/_layout/management/bounding/band/"
)({
  component: RouteComponent,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'q' does not exist on type {}.
  loaderDeps: ({ search: { q } }) => ({ q }),
  loader: async ({ deps: { q } }) => {
    const res = await getCustomTable(BANDS_TABLE, q);

    if (res.error) {
      throw new Error(res.error.toString());
    }

    return res
  }
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const bands = Route.useLoaderData().data;


  const setBand = useBounding((state) => state.setBand);

  const handleSelect = useCallback((band: any) => {
    setBand(band);
    navigate({ to: "../member", from: Route.fullPath, viewTransition: true});
  }, [setBand, navigate]);

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
            onClick={() => handleSelect(band)}
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

import { createFileRoute } from "@tanstack/react-router";
import SearchInput from "@/components/inputs/search-input";
import ItemsTable from "../bounding/-components/items-table";
import ItemTable from "../bounding/-components/item-table";
import { getBoundings } from "@/services/analysis.service";
import { getCustomTable } from "@/services/archive.service";
import { BANDS_TABLE } from "../../archive/-consts";

export const Route = createFileRoute(
  "/_app/analysis/_layout/management/update/"
)({
  component: RouteComponent,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'q' does not exist on type {}.
  loaderDeps: ({ search: { q } }) => ({ q }),
  loader: async ({ deps: { q } }) => {
    const bounding_res = await getBoundings(q);
    const bands_res = await getCustomTable(BANDS_TABLE)

    if (bounding_res.error) {
      throw new Error(bounding_res.error.toString());
    }

    console.log(bounding_res)

    return {
      bounding_res,
      bands_res
    }
  }
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { bounding_res, bands_res } = Route.useLoaderData();

  return (
    <section className="text-left w-screen px-8 flex flex-col gap-4">
      <h1 className="text-2xl text-left font-semibold">Seleccionar banda</h1>

      <div className="w-full">
        <SearchInput label="Buscar banda" />
      </div>

      <ItemsTable>
        {bounding_res?.data?.map((band: any, index: number) => (
          <ItemTable
            key={band.id}
            isFirst={index === 0}
            isLast={index === bounding_res.data.length - 1}
          >
            <div className="flex flex-col">
              <span className="font-semibold">N° {JSON.stringify(band)}</span>
            </div>
          </ItemTable>
        ))}
      </ItemsTable>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import Input from "@/components/inputs/input";
import ItemTable from "../-components/item-table";
import ItemsTable from "../-components/items-table";
import useBounding from "../-context/use-bounding";
import { getBands } from "@/services/analysis.service";
import { getCustomTable } from "@/services/archive.service";
import { BANDS_TABLE } from "../../../archive/-consts";


export const Route = createFileRoute(
  "/_app/analysis/_layout/management/bounding/band/"
)({
  component: RouteComponent,
  loader: async () => {
    const res = await getCustomTable(BANDS_TABLE);

    if (res.error) {
      return null;
    }

    return res
  }
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { data } = Route.useLoaderData();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const setBand = useBounding((state) => state.setBand);

  const handleSelect = useCallback((band: any) => {
    setBand(band);
    navigate({ to: "../member", from: Route.fullPath, viewTransition: true});
  }, [setBand, navigate]);

  const filteredBands = bands.filter(band =>
    band.nombre && band.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="text-left w-screen px-8 flex flex-col gap-4">
      <h1 className="text-2xl text-left font-semibold">Seleccionar banda</h1>

      <div className="w-full">
        <Input 
          label="Buscar banda" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ItemsTable>
        {filteredBands.map((band, index) => (
          <ItemTable
            key={band.id}
            isFirst={index === 0}
            isLast={index === filteredBands.length - 1}
            onClick={() => handleSelect(band)}
          >
            <div className="flex flex-col">
              <span className="font-semibold">{band.nombre}</span>
              <span className="text-sm text-gray-600">
                {band.integrantes} integrantes • {band.genero}
              </span>
            </div>
          </ItemTable>
        ))}
      </ItemsTable>
    </section>
  );
}

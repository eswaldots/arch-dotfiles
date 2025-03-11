import { createFileRoute } from "@tanstack/react-router";
import Input from "@/components/inputs/input";
import { useCallback } from "react";
import ItemTable from "../-components/item-table";
import ItemsTable from "../-components/items-table";
import useBounding from "../-context/use-bounding";
import { getPublicRepein } from "@/services/analysis.service";
import { PublicRepein } from "@/models/analysis-model";
import SearchInput from "@/components/inputs/search-input";

export const Route = createFileRoute(
  "/_app/analysis/_layout/management/bounding/member/"
)({
  component: RouteComponent,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'q' does not exist on type {}.
  loaderDeps: ({ search: { q } }) => ({ q }),
  loader: async ({ deps: { q } }) => {
    const res = await getPublicRepein(q);
    console.log(res);

    if (res.error) {
      throw new Error(res.error.toString());
    }

    return res
  }
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const members = Route.useLoaderData().data;

  const setMember = useBounding((state) => state.setMember);

  const handleSelect = useCallback((member: PublicRepein) => {
    setMember(member);

    navigate({ to: "../bounding-band", from: Route.fullPath, viewTransition: true, resetScroll: true});
  }, [setMember, navigate]);

  return (
    <section className="text-left w-screen px-8 flex flex-col gap-4">
      <h1 className="text-2xl text-left font-semibold">Seleccionar individuo</h1>

      <search className="w-full">
        <SearchInput label="Buscar individuo" />
      </search>

      <ItemsTable>
        {members?.map((member, index) => (
          <ItemTable
            key={member.toString()}
            isFirst={index === 0}
            isLast={index === members.length - 1}
            onClick={() => handleSelect(member)}
          >
            <div className="flex flex-col">
              <span className="font-semibold">{member.repein_ci}</span>
              <span className="text-sm text-neutral-500">
              <span className="text-sm text-neutral-100 font-medium">{member.repein_name} {member.repein_surnames}</span>{" "} 
              {member.repein_nicknames ? `(${member.repein_nicknames})` : "Apodo Desconocido"} • {" "}
              {member.repein_age > 1 ? `${member.repein_age} años` : "Edad Desconocida"}
              </span>
            </div>
          </ItemTable>
        ))}
      </ItemsTable>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import Input from "@/components/inputs/input";
import { useCallback } from "react";
import ItemTable from "../-components/item-table";
import ItemsTable from "../-components/items-table";
import useBounding from "../-context/use-bounding";
import { getPublicRepein } from "@/services/analysis.service";

export const Route = createFileRoute(
  "/_app/analysis/_layout/management/bounding/member/"
)({
  component: RouteComponent,
  loader: async () => await getPublicRepein(),
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const members = ["Gabriel", "Aaron", "Aaron", "Aaron"];

  const setMember = useBounding((state) => state.setMember);

  const handleSelect = useCallback((member: string) => {
    setMember(member);

    navigate({ to: "../bounding", from: Route.fullPath, viewTransition: true});
  }, [setMember, navigate]);

  return (
    <section className="text-left w-screen px-8 flex flex-col gap-4">
      <h1 className="text-2xl text-left font-semibold">Seleccionar individuo</h1>

      <search className="w-full">
        <Input label="Buscar individuo" />
      </search>

      <ItemsTable>
        {members.map((member, index) => (
          <ItemTable
            key={member}
            isFirst={index === 0}
            isLast={index === members.length - 1}
            onClick={() => handleSelect(member)}
          >
            {member}
          </ItemTable>
        ))}
      </ItemsTable>
    </section>
  );
}

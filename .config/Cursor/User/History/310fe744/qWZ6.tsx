import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import SearchInput from '@/components/inputs/search-input';
import { getCustomTable } from '@/services/archive.service';
import ItemTable from '../bounding/-components/item-table';
import ItemsTable from '../bounding/-components/items-table';
import { getPublicRepein } from '@/services/analysis.service';
import createWindow from '@/services/window.service';

interface SearchResult {
  personal_ci: string;
  personal_name: string;
}

export const Route = createFileRoute('/_app/analysis/_layout/management/query/')({
  component: RouteComponent,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'q' does not exist on type {}.
  loaderDeps: ({ search: { q } }) => ({ q }),
  loader: async ({ deps: { q } }) => {
    const res = await getPublicRepein(q);

    if (res.error) {
      throw new Error(res.error.toString());
    }

    return res
  }
});

function RouteComponent() {
  const { q } = Route.useParams();

  const navigate = Route.useNavigate();

  const members = Route.useLoaderData().data;

  const handleClick = (repeinId: string) => {
    createWindow({
      url: "/analysis/management/query/" + repeinId,
      title: "Ficha de " + repeinId,
      width: 1000,
      height: 600,
      x: 0,
      y: 0,
      center: true
    });
  }

  return (
    <section className="text-left w-screen px-8 flex flex-col gap-4">
      <h1 className="text-2xl text-left font-semibold">Seleccionar individuo</h1>

      <search className="w-full">
        <SearchInput label="Buscar individuo" defaultValue={q} />
      </search>

      <ItemsTable>
        {members?.map((member, index) => (
          <ItemTable
            key={member.toString()}
            isFirst={index === 0}
            isLast={index === members.length - 1}
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

export default function ImageSearch() {
  return (
      <div className="p-4 border rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Búsqueda por Rostro</h2>
        <div className="flex gap-6 items-start">
          <div className="flex flex-col gap-3">
            <div className="w-48 h-48 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
            </div>
            <input
              type="file"
              accept="image/*"
              className="text-sm"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Buscar por rostro
            </button>
          </div>

        </div>
      </div>
  )
}
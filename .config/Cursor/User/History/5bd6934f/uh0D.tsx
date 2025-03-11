import { createFileRoute } from '@tanstack/react-router'
import Search from './-components/search'
import { getPublicPersonal } from '@/services/personal.service';
import PersonalTable from '@/components/personal-table';

export const Route = createFileRoute('/_app/personal/_layout/personal/search/')(
  {
    component: RouteComponent,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'q' does not exist on type {}.
    loaderDeps: ({ search: { q } }) => ({ q }),
    loader: async ({ deps: { q } }) => {
      return await getPublicPersonal(q)
    }
  },
)

function RouteComponent() {
  const { data, success } = Route.useLoaderData();

  return (<main className="px-5 py-3 overflow-hidden max-h-[calc(100vh-32px)]">
    <h1 className="text-2xl font-bold">Personal</h1>
    <header className="flex justify-between items-end mt-4">
      <Search />
    </header>

    {data && <PersonalTable data={data} />}
    {!success && <p>Hubo un error cargando los datos</p>}

  </main>)
}

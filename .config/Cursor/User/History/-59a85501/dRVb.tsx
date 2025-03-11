import Table from '@/components/table'
import { getCustomTable } from '@/services/archive.service'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import Search from './-components/search'
import CreateRedip from './-components/create-redip'
import { REDIP_TABLE } from '../-consts'
import { useRefreshListener } from '@/hooks/use-refresh-listener'

export const Route = createFileRoute(
  '/_app/analysis/_layout/archive/redip/',
)({
  component: RouteComponent,
  loader: async () => {
    const redip = await getCustomTable(REDIP_TABLE)

    if (redip.error) {
      return null
    }

    return redip
  },
})

function RouteComponent() {
  const router = useRouter()

  const redip = Route.useLoaderData()?.data

  useRefreshListener(router)

  return redip ? (
    <main className="px-5 py-3">
      <h1 className="text-2xl font-bold">Redip</h1>
      <header className="flex justify-between items-end mt-4">
        <Search
          redip={redip}
          onSearch={(filtered) => setFilteredRedip(filtered)}
        />
        <CreateRedip />
      </header>
      {redip.length > 0 ? (
        <Table data={redip} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-neutral-500 my-5">No hay registros disponibles</p>
        </div>
      )}
    </main>
  ) : (
    <h1 className="flex justify-center items-center min-h-[200px]">
      <span className="text-neutral-500">No se pudieron cargar los registros</span>
    </h1>
  )
}

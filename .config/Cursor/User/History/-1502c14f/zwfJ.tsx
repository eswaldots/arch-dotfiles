import Table from '@/components/table'
import { getCustomTable } from '@/services/archive.service'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import Search from './-components/search'
import CreateMunicipality from './-components/create-municipality'
import { MUNICIPALITY_TABLE as MUNICIPALITY_TABLE } from '../-consts'
import { useRefreshListener } from '@/hooks/use-refresh-listener'
import { useState } from 'react'

export const Route = createFileRoute(
  '/_app/analysis/_layout/archive/municipality/',
)({
  component: RouteComponent,
  loader: async () => {
    const municipality = await getCustomTable(MUNICIPALITY_TABLE)

    if (municipality.error) {
      return null
    }

    return municipality
  },
})

function RouteComponent() {
  const router = useRouter()
  const [filteredMunicipality, setFilteredMunicipality] = useState<any[]>([])
  const municipality = Route.useLoaderData()?.data

  useRefreshListener(router)

  return municipality ? (
    <main className="px-5 py-3">
      <h1 className="text-2xl font-bold">Municipios</h1>
      <header className="flex justify-between items-end mt-4">
        <Search municipality={municipality} onSearch={setFilteredMunicipality} />
        <CreateMunicipality />
      </header>
      {municipality.length > 0 ? (
        <Table data={filteredMunicipality.length > 0 ? filteredMunicipality : municipality} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-neutral-500 my-5">No hay municipios disponibles</p>
        </div>
      )}
    </main>
  ) : (
    <h1 className="flex justify-center items-center min-h-[200px]">
      <span className="text-neutral-500">No se pudieron cargar los municipios</span>
    </h1>
  )
}

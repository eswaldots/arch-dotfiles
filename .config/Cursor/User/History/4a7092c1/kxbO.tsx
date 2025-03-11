import Table from '@/components/table'
import { getCustomTable } from '@/services/archive.service'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import Search from './-components/search'
import CreateEstate from './-components/create-estate'
import { ESTATE_TABLE as ESTATE_TABLE } from '../-consts'
import { useRefreshListener } from '@/hooks/use-refresh-listener'
import { useState } from 'react'

export const Route = createFileRoute('/_app/analysis/_layout/archive/estate/')({
  component: RouteComponent,
  loader: async () => {
    const estate = await getCustomTable(ESTATE_TABLE)

    if (estate.error) {
      return null
    }

    return estate
  },
})

function RouteComponent() {
  const router = useRouter()
  const [filteredEstate, setFilteredEstate] = useState<any[]>([])
  const estate = Route.useLoaderData()?.data

  useRefreshListener(router)

  return estate ? (
    <main className="px-5 py-3">
      <h1 className="text-2xl font-bold">Estados del País</h1>
      <header className="flex justify-between items-end mt-4">
        <Search estate={estate} onSearch={setFilteredEstate} />
        <CreateEstate />
      </header>
      {estate.length > 0 ? (
        <Table data={filteredEstate.length > 0 ? filteredEstate : estate} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-neutral-500 my-5">No hay Estados disponibles</p>
        </div>
      )}
    </main>
  ) : (
    <h1 className="flex justify-center items-center min-h-[200px]">
      <span className="text-neutral-500">No se pudieron cargar los estados</span>
    </h1>
  );
}

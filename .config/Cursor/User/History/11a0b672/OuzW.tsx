import Table from '@/components/table'
import { getCustomTable } from '@/services/archive.service'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import Search from './-components/search'
import CreateParish from './-components/create-parish'
import { PARISH_TABLE as PARISH_TABLE } from '../-consts'
import { useRefreshListener } from '@/hooks/use-refresh-listener'
import { useState } from 'react'

export const Route = createFileRoute('/_app/analysis/_layout/archive/parish/')({
  component: RouteComponent,
  loader: async () => {
    const parish = await getCustomTable(PARISH_TABLE)

    if (parish.error) {
      return null
    }

    return parish
  },
})
function RouteComponent() {
  const router = useRouter()
  const [filteredParish, setFilteredParish] = useState<any[]>([])
  const parish = Route.useLoaderData()?.data

  useRefreshListener(router)

  return parish ? (
    <main className="px-5 py-3">
      <h1 className="text-2xl font-bold">Parroquias</h1>
      <header className="flex justify-between items-end mt-4">
        <Search parish={parish} onSearch={setFilteredParish} />
        <CreateParish />
      </header>
      {parish.length > 0 ? (
        <Table data={filteredParish.length > 0 ? filteredParish : parish} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-neutral-500 my-5">No hay parroquia disponibles</p>
        </div>
      )}
    </main>
  ) : (
    <h1 className="flex justify-center items-center min-h-[200px]">
      <span className="text-neutral-500">No se pudieron cargar las parroquias</span>
    </h1>
  )
}

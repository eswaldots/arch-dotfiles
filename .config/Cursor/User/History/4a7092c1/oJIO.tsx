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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-32px)] gap-3">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-12 w-12 text-red-500 animate-pulse" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
        />
      </svg>
      <h1 className="text-red-500 font-semibold text-lg">Error cargando estados</h1>
      <p className="text-neutral-500 text-sm">Intente recargar la página</p>
    </div>
  );
}

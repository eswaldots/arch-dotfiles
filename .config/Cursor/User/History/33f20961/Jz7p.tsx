import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/analysis/_layout/management/query/$repeinId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams();

  return <main>
    <h1 className='font-bold text-2xl py-4'>Ficha de {params.repeinId}</h1>
  </main>
}

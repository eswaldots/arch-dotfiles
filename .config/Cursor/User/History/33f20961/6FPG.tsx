import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/analysis/_layout/management/query/$repeinId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams();

  return <main className='px-5 py-3'>
    <h1 className='font-bold text-2xl'>Ficha de RePeIn</h1>
  </main>
}

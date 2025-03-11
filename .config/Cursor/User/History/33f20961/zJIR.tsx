import { getPublicRepein } from '@/services/analysis.service';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/analysis/_layout/management/query/$repeinId',
)({
  component: RouteComponent,
  loader: async ({ params: { repeinId } }) => await getPublicRepein(repeinId)
})

function RouteComponent() {
  const repein = Route.useLoaderData();
  console.log(repein)
  return <main className='px-5 py-3'>
    <h1 className='font-bold text-2xl'>Ficha de RePeIn</h1>
  </main>
}

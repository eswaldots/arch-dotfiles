import { getPublicRepeinById } from '@/services/analysis.service';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/analysis/_layout/management/query/$repeinId',
)({
  component: RouteComponent,
  loader: async ({ params }) => await getPublicRepeinById(Number(params.repeinId))
})

function RouteComponent() {
  const repein = Route.useLoaderData();

  return <main className='px-5 py-3'>
    <h1 className='font-bold text-2xl'>Ficha de RePeIn</h1>

    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'> 
        <h2 className='font-bold text-lg'>Datos personales</h2>

        <div className='flex flex-col gap-2'>
          <p>{repein.data.personal_ci}</p>
          <p>{repein.data.personal_name}</p>
          <p>{repein.data.personal_surnames}</p>
        </div>
      </div>
    </div>
  </main>
}

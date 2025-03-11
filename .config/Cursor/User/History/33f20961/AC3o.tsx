import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/analysis/_layout/management/query/$repeinId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams();
  console.log(params);

  return <main>
    <h1>Ficha de {params.repeinId}</h1>
  </main>
}

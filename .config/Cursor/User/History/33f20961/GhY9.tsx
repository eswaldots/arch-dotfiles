import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/analysis/_layout/management/query/$repeinId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /_app/analysis/_layout/management/query/$repeinId!'
}

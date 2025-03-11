import TitleBar from '@/components/title-bars/title-bar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/analysis/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='max-h-screen overflow-hidden'>
      <TitleBar shouldMaximize={false} />
      <div className='overflow-y-auto'>
      <Outlet />
</div>
    </main>
  )
}

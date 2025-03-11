import TitleBar from '@/components/title-bars/title-bar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/analysis/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='max-h-screen overflow-y-hidden'>
      <TitleBar shouldMaximize={false} />
      <div className='overflow-y-auto h-full'>
      <Outlet />
</div>
    </main>
  )
}

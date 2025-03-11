import TitleBar from '@/components/title-bars/title-bar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/analysis/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='flex flex-col h-screen overflow-hidden'>
      <TitleBar shouldMaximize={false} />
      <div className='flex-1 overflow-y-auto'>
        <Outlet />
      </div>
    </main>
  )
}

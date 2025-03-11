import { LoaderIcon } from '@/assets/icons/loader'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => {
    console.log("JAJAJA SOY PENDEJO")
    return (
      <>
        <main>
          <Outlet />
        </main>
      </>
    )
  },
  pendingComponent: () => <main className="flex items-center justify-center h-screen w-screen"><LoaderIcon className="text-primary size-32" /></main>
})

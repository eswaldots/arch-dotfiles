import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <main>
          <Outlet />
        </main>
      </>
    )
  },
  pendingComponent: () =>  <main className="flex items-center justify-center h-screen w-screen"><LoaderIcon className="text-primary size-32" /></main>
})

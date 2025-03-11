import { BuildIcon } from "@/assets/icons/build";
import { ChartIcon } from "@/assets/icons/chart";
import { LoaderIcon } from "@/assets/icons/loader";
import { PhoneIcon } from "@/assets/icons/phone";
import { StorageIcon } from "@/assets/icons/storage";
import { TruckIcon } from "@/assets/icons/truck";
import Dropdown from "@/components/dropdown";
import DropdownMenu from "@/components/dropdown/dropdown-menu";
import DropdownTrigger from "@/components/dropdown/dropdown-trigger";
import usePoolState from "@/hooks/use-pool-state";
import useTheme from "@/hooks/use-theme";
import {
  createFileRoute,
  Link,
  Outlet,
  useRouterState
} from "@tanstack/react-router";
import { Bounce } from "react-toastify";
import { ToastContainer } from "react-toastify";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
  pendingComponent: () => <main className="flex items-center justify-center h-screen w-screen"><LoaderIcon className="text-primary size-32" /></main>,
  errorComponent: (e) => <main>
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-32px)] gap-3">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-12 w-12 text-red-500 animate-pulse" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentcolor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="m12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3l13.732 4c-.77-1.333-2.694-1.333-3.464 0l3.34 16c-.77 1.333.192 3 1.732 3z" 
        />
      </svg>
      <h1 className="text-red-500 font-semibold text-lg">Hubo un error inesperado</h1>
      <p className="text-neutral-500 text-sm">Detalles del error: {e.error.message}</p>
    </div>

  </main>
});

function RouteComponent() {
  const actualRoute = useRouterState().location;
  const { theme } = useTheme();

  usePoolState(actualRoute.pathname);

  const routes = [
    { name: "Personal", path: "/personal", icon: <BuildIcon /> },
    { name: "Parque", path: "/storage", icon: <StorageIcon /> },
    { name: "Vehiculos", path: "/transport", icon: <TruckIcon /> },
    { name: "Operaciones", path: "/operations", icon: <PhoneIcon /> },
    { name: "Análisis", path: "/analysis", icon: <ChartIcon /> }
  ];

  return (
    <main className="relative bg-neutral-950">
      <Outlet />
      {/* Manejado por usePoolState()*/}
      <ToastContainer
        position="bottom-right"
        toastClassName="bg-neutral-950 shadow-xl text-neutral-500"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        transition={Bounce}
      />
      {routes.map((route) => route.path).includes(actualRoute.pathname) && (
        <article className="z-30 absolute bottom-6 left-6">
          <Dropdown>
            <DropdownTrigger>
              <button className="hover:bg-neutral-700 px-4 bg-neutral-900 rounded-md py-2 border-neutral-500 text-neutral-500 hover:text-neutral-100 transition-colors">
                <div className="size-8">
                  {
                    routes.filter(
                      (route) => route.path === actualRoute.pathname
                    )[0]?.icon
                  }
                </div>
              </button>
            </DropdownTrigger>
            <DropdownMenu>
              {routes.map((route, index) => (
                <Link
                  key={String(route)}
                  to={route.path}
                  className={
                    "flex items-center border-transparent z-20 border px-3 py-2 rounded-md transition gap-4 hover:bg-neutral-900 hover:border-neutral-800 " + 
                    (route.path === actualRoute.pathname ? "font-bold" : "")
                  }
                >
                  <div
                 style={{
                  opacity: route.path === actualRoute.pathname ? 1 : 0.6
                 }} 
                  className="size-6">{route.icon}</div>
                  <span className="text-sm" key={index}>
                    {route.name}
                  </span>
                </Link>
              ))}
            </DropdownMenu>
          </Dropdown>
        </article>
      )}
    </main>
  );
}

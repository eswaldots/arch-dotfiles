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
                    "flex items-center border-transparent z-20 border px-2 py-1 rounded-md transition gap-4 hover:bg-neutral-900 hover:border-neutral-800 " + 
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

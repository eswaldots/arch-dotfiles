import { BuildIcon } from "@/assets/icons/build";
import { ChartIcon } from "@/assets/icons/chart";
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
        toastClassName="bg-neutral-800 text-neutral-500"
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
                <div className="size-10">
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
                    "flex relative items-center border-transparent z-20 border px-2 py-2 rounded-md transition gap-2 hover:bg-neutral-900 hover:border-neutral-800 " + 
                    (route.path === actualRoute.pathname ? "text-black" : "")
                  }
                >
                  {route.path === actualRoute.pathname && <span className="absolute top-0 left-0 w-full h-full z-10 bg-primary rounded-md opacity-20"></span>}
                  <div className="size-6 opacity-60 z-10">{route.icon}</div>
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

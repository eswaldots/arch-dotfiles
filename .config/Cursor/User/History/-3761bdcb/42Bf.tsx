import { BuildIcon } from "@/assets/icons/build";
import { ChartIcon } from "@/assets/icons/chart";
import { PhoneIcon } from "@/assets/icons/phone";
import { StorageIcon } from "@/assets/icons/storage";
import { TruckIcon } from "@/assets/icons/truck";
import Dropdown from "@/components/dropdown";
import DropdownMenu from "@/components/dropdown/dropdown-menu";
import DropdownTrigger from "@/components/dropdown/dropdown-trigger";
import { Module } from "@/constants/modules";
import usePoolState from "@/hooks/use-pool-state";
import { changeDatabasePool } from "@/services/database.service";
import { getTheme } from "@/services/theme.service";
import capitalizeString from "@/utils/capitalize-string";
import {
  createFileRoute,
  Link,
  Outlet,
  useRouterState
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bounce } from "react-toastify";
import { ToastContainer } from "react-toastify";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
  pendingComponent: () => <div>loading..</div>
});

function RouteComponent() {
  const actualRoute = useRouterState().location;
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  usePoolState(actualRoute.pathname);

  const routes = [
    { name: "Personal", path: "/personal", icon: <BuildIcon /> },
    { name: "Parque", path: "/storage", icon: <StorageIcon /> },
    { name: "Vehiculos", path: "/transport", icon: <TruckIcon /> },
    { name: "Operaciones", path: "/operations", icon: <PhoneIcon /> },
    { name: "Análisis", path: "/analysis", icon: <ChartIcon /> }
  ];

  useEffect(() => {
    changeDatabasePool(capitalizeString(actualRoute.pathname.replace("/", "")) as Module)
  }, [actualRoute.pathname])

  useEffect(() => {
    const loadTheme = async () => {
      const currentTheme = await getTheme();
      setTheme(currentTheme);
    };

    loadTheme();
  }, []);

  return (
    <main className="relative bg-neutral-950">
      <Outlet />
      {/* Manejado por usePoolState()*/}
      <ToastContainer
        position="bottom-right"
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
                    "flex items-center border-transparent border p-2 rounded-md transition gap-2 " +
                    (route.path === actualRoute.pathname
                      ? "bg-primary text-white hover:opacity-80"
                      : "hover:bg-neutral-700 hover:border-neutral-800")
                  }
                >
                  <div className="size-10 opacity-60">{route.icon}</div>
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

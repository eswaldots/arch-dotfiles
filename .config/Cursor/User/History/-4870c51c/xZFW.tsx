import Button from "@/components/buttons/button";
import { getTables } from "@/services/config.service";
import createWindow from "@/services/window.service";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";
import TableItem from "./-components/table-item";

export const Route = createFileRoute("/_config/config/tables/")({
  component: RouteComponent,
  loader: async () => {
    const tables = await getTables();

    return tables;
  }
});

function RouteComponent() {
  const router = useRouter();
  const window = getCurrentWindow();
  const tables = Route.useLoaderData().data;

  const createTable = async () => {
    createWindow({
      title: "Nueva tabla",
      url: "/config/new-table",
      width: 336,
      minWidth: 336,
      height: 441,
      minHeight: 441,
      center: true,
      resizable: false,
      decorations: false,
      x: 0,
      y: 0
    });
  };

  useEffect(() => {
    const unlisten = window.listen("reload", () => {
      router?.invalidate();
    });

    return () => {
      unlisten.then((unlisten) => unlisten());
    };
  }, []);

  return (
    <main className="min-h-[calc(100vh-32px] z-10 flex flex-col gap-5 p-8">
      <span className="font-bold">
        <h1 className="text-xl font-bold ">Tablas</h1>
        <p className="text-sm text-neutral-500 font-normal">
          Listado de todas las tablas.
        </p>

        <section className="flex flex-col my-6 gap-5 items-start w-full">
          <h3 className="text-sm font-medium text-neutral-500 -mb-4">Nombre</h3>
          <hr className="text-neutral-100 w-full" />
          {tables?.length > 0 ? (
            tables.map((table: string) => (
              <TableItem key={table} table={table} />
            ))
          ) : (
            <span className="mx-auto opacity-80">
              No hay tablas para mostrar
            </span>
          )}
        </section>

        <Button
          onClick={async () => await createTable()}
          className="font-bold absolute bottom-6 right-6 px-6 py-2 transition-opacity active:opacity-30 rounded-md hover:opacity-60 bg-primary"
        >
          <span className="text-sm text-neutral-900 font-bold">
            Agregar nueva tabla
          </span>
        </Button>
      </span>
    </main>
  );
}

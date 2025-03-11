import Alert from "@/components/alert";
import Button from "@/components/buttons/button";
import Input from "@/components/inputs/input";
import Switch from "@/components/switch";
import { Module } from "@/constants/modules";
import useWindowForm from "@/hooks/use-window-form";
import { DbConfig } from "@/models/responses-model";
import {
  checkDatabaseDirection,
  getDbConfig,
  saveDbConfig
} from "@/services/config.service";
import { createFileRoute } from "@tanstack/react-router";
import { message } from "@tauri-apps/plugin-dialog";

export const Route = createFileRoute("/_config/config/database")({
  component: RouteComponent,
  // @ts-expect-error FIXME: Type 'Promise<GetCustomTableFieldsResponse<string[]>>' is not assignable to type 'Promise<GetCustomTableFieldsResponse<null>>'.
  loaderDeps: ({ search: { m } }) => ({ m }),
  loader: async ({ deps: { m } }) => {
    const response = await getDbConfig(m);

    return response;
  }
});

function RouteComponent() {
  const { m: module } = Route.useSearch() as { m: Module };

  const dbConfig = Route.useLoaderData().data as DbConfig;

  const {
    control,
    isDirty,
    watch,
    register,
    submitHandler,
    errors,
    handleSubmit
  } = useWindowForm({
    data: dbConfig,
    onSave: async (data) => await saveDbConfig(data, module),
    shouldReload: true
  });

  const localMode = watch("local_mode");

  const checkDb = async (data: DbConfig) => {
    const res = await checkDatabaseDirection(data);

    if (!res.success) {
      return await message(
        res.error ?? "Error al conectar a la base de datos",
        {
          kind: "error",
          title: "Error al conectar a la base de datos"
        }
      );
    }

    await message("Conexión correcta", {
      kind: "info",
      title: "Conexión correcta"
    });
  };

  return (
    <form onSubmit={submitHandler} className="flex h-full flex-col p-6 pb-10">
      <div className="flex flex-col gap-6 p-1 mb-10">
        <header className="gap-1 flex flex-col">
          <h1 className="text-xl font-bold ">Conexión a base de datos</h1>
          <span className="text-sm text-neutral-500">
            Parámetros de conexión hacia tu base de datos
          </span>
        </header>
        <Alert severity="warning" label="Importante">
          Cada módulo requiere una base de datos distinta. Los cambios realizados aquí solo afectarán al módulo actual y no a los demás.      </Alert>
        <section className="flex font-semibold text-lg flex-col gap-1">
          <h3 className="pb-3">Servidor</h3>
          <Switch
            errors={errors}
            control={control}
            label="Modo local"
            name="local_mode"
          />
        </section>
        <section
          style={{ opacity: localMode ? 0.5 : 1 }}
          className={"flex font-semibold text-lg flex-col gap-[6px]"}
        >
          <h3 className="pb-3 font-semibold">Dirección</h3>
          <fieldset
            disabled={localMode}
            className={"flex flex-col gap-[6px] transition-opacity "}
          >
            <Input
              errors={errors}
              register={register("db_user")}
              label="Usuario"
            />
            <Input
              errors={errors}
              register={register("db_password")}
              label="Contraseña"
              type="password"
            />
            <Input
              errors={errors}
              register={register("db_host")}
              label="Host"
            />
            <Input
              errors={errors}
              register={register("db_port")}
              label="Puerto"
            />
            <Input
              errors={errors}
              register={register("db_name")}
              label="Base de datos"
            />
          </fieldset>
        </section>
        <section className="flex absolute gap-3 right-6 bottom-6">
          <Button
            onClick={handleSubmit(async (data) => checkDb(data))}
            type="button"
            className="w-50 h-8 bg-neutral-900 hover:disabled:bg-neutral-900 hover:bg-neutral-950"
          >
            <span className="text-neutral-100 text-sm font-bold">
              Conectarse
            </span>
          </Button>
          <Button
            disabled={!isDirty}
            type="submit"
            className="w-50 h-8 hover:opacity-80 bg-primary"
          >
            <span className=" text-sm font-bold">Guardar</span>
          </Button>
        </section>
      </div>
    </form>
  );
}

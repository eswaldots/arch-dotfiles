import { LoaderIcon } from "@/assets/icons/loader";
import createWindow from "@/services/window.service";
import { WebviewOptions } from "@tauri-apps/api/webview";
import { WindowOptions } from "@tauri-apps/api/window";
import { exit } from "@tauri-apps/plugin-process";
import { useState } from "react";
import { createPortal } from "react-dom";

type Route = WebviewOptions & WindowOptions;

interface RouteProps {
  isFocused: boolean;
  routeGroup: {
    title: string;
    routes: Route[];
  };
}

export default function RouteButton(props: RouteProps) {
  const [open, setOpen] = useState(false);

  const LinkButtons = props.routeGroup.routes.map((route, index) => {
    return (
      route.title !== 'Salir del Sistema' ? <button
        onClick={() => {
          createWindow(route);
        }}
        className="text-left block rounded-md pl-3 hover:bg-neutral-800 py-1 text-nowrap w-full pr-3 indent-1"
        key={index}
      >
        {route.title}
      </button>
        :
        <>
          <button
            onClick={async () => {
              setOpen(!open)

              await new Promise(resolve => setTimeout(resolve, 10000)).then(() => exit(0))

            }}
            className="text-left block pl-3 transition-colors hover:bg-red-500 hover:text-neutral-900 rounded-md py-1 text-nowrap w-full pr-3 indent-1"
            key={index}
          >
            {route.title}
          </button>
        </>
    )
  });

  return (
    <>
      <div className="relative group z-50 h-6  text-[15px]">
        <div className="cursor-default font-normal title-bar-button transition-colors w-fit px-3 grid place-content-center h-full group-hover:bg-neutral-800 rounded-md">
          {props.routeGroup.title}
        </div>
        {props.isFocused && (
          <div className="hidden group-hover:inline-block absolute shadow-xl  motion-ease motion-preset-fade-lg motion-scale-in-95 motion-duration-75">
            <article className="bg-neutral-950 mt-1 z-50 rounded-md top-full border border-neutral-900 left-0 p-1 items-start text-left ">
              {LinkButtons}
            </article>
          </div>
        )}
      </div>

      {
        open && createPortal(<>
          <div className="motion-ease motion-preset-fade-lg motion-duration-75 bg-black opacity-90 grid place-items-center w-screen absolute inset-0 z-40 h-screen" >
            <article className="motion-ease motion-preset-fade-lg motion-duration-75 motion-scale-in-90 bg-neutral-950 flex p-8 rounded-md flex-col items-center justify-center">
              <LoaderIcon className='text-primary size-28 mb-4' />
              <h1 className='text-3xl text-neutral-100 font-bold mb-2'>Saliendo del sistema</h1>
              <span className='text-neutral-500'>Estamos trabajando en guardar todo el historial</span>
            </article>
          </div>
        </>, document.getElementById('root') as HTMLElement)
      }
    </>
  );
}

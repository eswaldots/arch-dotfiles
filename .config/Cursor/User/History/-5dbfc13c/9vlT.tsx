import { useState } from "react";
import RouteButton from "./route-button";
import { WebviewOptions } from "@tauri-apps/api/webview";
import { WindowOptions } from "@tauri-apps/api/window";

type Route = WebviewOptions & WindowOptions;

export interface RouteGroup {
  title: string;
  routes: Route[];
}

interface PropsRoutesButtons {
  routes: RouteGroup[];
  logo?: string;
}

export default function RoutesButton(props: PropsRoutesButtons) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <article className="flex items-center h-8">
      <picture className="h-5 min-w-8 grid place-content-center px-2">
        <img
          loading="eager"
          decoding="sync"
          src={props.logo ?? "/logo.png"}
          alt="logo"
          className="h-5"
        />
      </picture>
      <section
        onClick={() => setIsFocused(!isFocused)}
        className="flex items-center gap-1"
      >
        {props.routes.map((routeGroup, index) => {
          return (
            <RouteButton
              isFocused={isFocused}
              routeGroup={routeGroup}
              key={index}
            />
          );
        })}
      </section>
    </article>
  );
}

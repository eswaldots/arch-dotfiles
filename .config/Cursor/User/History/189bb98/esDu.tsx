import PersonalTitleBar from "@/components/title-bars/personal-title-bar";
import { getLogo } from "@/utils/get-logo";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { routes } from "./-routes";
import { getWallpaper } from "@/utils/get-wallpaper";
import { Module } from "@/constants/modules";

export const Route = createFileRoute("/_app/transport/")({
  component: RouteComponent,
  loader: async () => {
    const logo = await getLogo();
    const wallpaper = await getWallpaper(Module.TRANSPORT_MODULE);

    return [logo, wallpaper];
  }
});

function RouteComponent() {
  const [logo, wallpaper]: string[] = Route.useLoaderData();
  const [isWallpaperLoaded, setIsWallpaperLoaded] = useState(true);

  return (
    <main>
      <PersonalTitleBar routes={routes} logo={logo} shouldMaximize={true} />
      <div className="flex items-center justify-center relative w-screen h-[calc(100vh-32px)] bg-cover bg-center bg-no-repeat">
        {isWallpaperLoaded && (
          <img
            onError={() => {
              setIsWallpaperLoaded(false);
            }}
            src={wallpaper}
            alt="Wallpaper4"
            className="absolute z-10 object-cover w-full h-full"
          />
        )}
        <img
          src={(logo as string) ?? "/logo.png"}
          alt="logo"
          style={{
            viewTransitionName: "image-expand"
          }}
          className="z-20 w-[550px] object-contain"
        />
      </div>
    </main>
  );
}

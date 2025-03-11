import { LoaderIcon } from '@/assets/icons/loader'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { load } from '@tauri-apps/plugin-store'

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
  pendingComponent: () => <main className="flex items-center justify-center h-screen w-screen"><LoaderIcon className="text-primary size-32" /></main>,
  loader: async () => {
    const window = await getCurrentWindow();  

    if (window.label === "main") {
      const store = await load("settings.json", { autoSave: false });
      const darkMode = (await store.get("dark_mode")) as string;
      const colorScheme = (await store.get("color_scheme")) as string;
      
    const rootElement = document.getElementById('root')!;
      rootElement.style.setProperty("--primary", colorScheme);
      rootElement.classList.add(darkMode ? "dark" : "light");
      rootElement.classList.remove(darkMode ? "light" : "dark");
    }

    return {};
  }
})

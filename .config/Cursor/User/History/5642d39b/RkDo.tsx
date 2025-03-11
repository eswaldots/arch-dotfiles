import { StoreConfig } from '@/constants/store';
import { createRootRoute, Outlet } from '@tanstack/react-router'
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
  loader: async () => {
      const store = await load(StoreConfig.FILE_NAME, { autoSave: false });
      const darkMode = (await store.get(StoreConfig.DARK_MODE_KEY)) as string;
      const colorScheme = (await store.get(StoreConfig.COLOR_SCHEME_KEY)) as string;
      
    const rootElement = document.getElementById('root')!;
      rootElement.style.setProperty("--primary", colorScheme);
      rootElement.classList.add(darkMode ? "dark" : "light");
      rootElement.classList.remove(darkMode ? "light" : "dark");
    }
})

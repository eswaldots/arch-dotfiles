import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./globals.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { load } from "@tauri-apps/plugin-store";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById("root")! as HTMLElement;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  // Wrap initialization in async function
  const initializeApp = async () => {
    const store = await load("settings.json", { autoSave: false });
    const darkMode = (await store.get("dark_mode")) as string;
    const colorScheme = (await store.get("color_scheme")) as string;

    rootElement.style.setProperty("--primary", colorScheme);
    rootElement.classList.add(darkMode ? "dark" : "light");
    rootElement.classList.remove(darkMode ? "light" : "dark");

    root.render(
      <main id={"app"} className="antialiased text-neutral-100 bg-neutral-950">
        <RouterProvider router={router} />
      </main>
    );
  };



  // Call the async function
  initializeApp();
}

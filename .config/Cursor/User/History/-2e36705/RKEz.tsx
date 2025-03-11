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
  root.render(
    <main id={"app"} className="antialiased text-neutral-100 bg-neutral-950">
      <RouterProvider router={router} />
    </main>
  );
}

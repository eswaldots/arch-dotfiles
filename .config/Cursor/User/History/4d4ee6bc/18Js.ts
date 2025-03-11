import { WebviewOptions } from "@tauri-apps/api/webview";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { getCurrentWindow, WindowOptions } from "@tauri-apps/api/window";

export default async function createWindow(
  options: WebviewOptions & WindowOptions & { label?: string },
  label?: string
) {
  //  FIXME: This is a hack to prevent the window from being destroyed

  /* const currentWindow = getCurrentWindow();

  if (currentWindow) {
    await currentWindow.setEnabled(false)
  } */

  const webview = new WebviewWindow(
    label ? label : (options.label ?? options.url) || "",
    {
      ...options,
      // Prevent React re-initialization
      url: {
        type: 'html',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <link rel="stylesheet" href="/index.css" />
            </head>
            <body>
              <div id="root"></div>
              <script type="module" src="/src/main.tsx"></script>
            </body>
          </html>
        `.replace(/\n\s+/g, '') // Minify HTML
      }
    }
  );

  /* webview.once('tauri://destroyed', async () => {
    await currentWindow.setEnabled(true)
  }) */

  webview.once("tauri://error", (e) => {
    console.error(e);
    throw new Error("Error creating window");
  });
}

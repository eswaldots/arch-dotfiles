import { load } from "@tauri-apps/plugin-store"

export function getTheme() {

}

export async function loadTheme() {
  try {
    const store = await load('settings.json', { autoSave: false })

    const colorScheme: string | undefined = await store.get('color_scheme')

    if (colorScheme === undefined) return

    document.documentElement.style.setProperty('--primary', colorScheme)
  } catch (error) {
    console.error('Error setting theme', error)
    throw new Error('Error setting theme')
  }
}
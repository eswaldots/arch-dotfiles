import { load } from "@tauri-apps/plugin-store"

export async function getTheme() {
    const store = await load('settings.json', { autoSave: false })

    const darkMode: string | undefined = await store.get('color_scheme')

    if (darkMode) return "dark"
    else return "light"

}

export async function getColorScheme() {
    const store = await load('settings.json', { autoSave: false })

    const colorScheme: string | undefined = await store.get('color_scheme')

    if (colorScheme === undefined) return

    return colorScheme
}

export async function loadColorScheme() {
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
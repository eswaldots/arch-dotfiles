import { load } from "@tauri-apps/plugin-store"

// Configuración reutilizable
const StoreConfig = {
  FILE_NAME: 'settings.json',
  COLOR_SCHEME_KEY: 'color_scheme',
  DEFAULT_THEME: 'light',
  DEFAULT_COLOR: '#4f46e5' // Color primario por defecto
} as const

// Helper reutilizable para cargar el store
async function getStore() {
  return await load(StoreConfig.FILE_NAME, { autoSave: false })
}

/**
 * Obtiene el tema actual basado en la configuración almacenada
 * @returns 'dark' | 'light' - Tema actual
 */
export async function getTheme(): Promise<'dark' | 'light'> {
  const store = await getStore()
  const hasDarkMode = await store.get(StoreConfig.COLOR_SCHEME_KEY)
  return hasDarkMode ? 'dark' : StoreConfig.DEFAULT_THEME
}

/**
 * Obtiene el esquema de color personalizado almacenado
 * @returns string | undefined - Valor hexadecimal del color o undefined
 */
export async function getColorScheme(): Promise<string | undefined> {
  const store = await getStore()
  return store.get<string>(StoreConfig.COLOR_SCHEME_KEY)
}

/**
 * Carga y aplica el esquema de color al documento HTML
 * @throws Error si falla la carga de la configuración
 */
export async function loadColorScheme(): Promise<void> {
  try {
    const store = await getStore()
    const colorScheme = await store.get<string>(StoreConfig.COLOR_SCHEME_KEY)
    
    document.documentElement.style.setProperty(
      '--primary',
      colorScheme || StoreConfig.DEFAULT_COLOR
    )
  } catch (error) {
    console.error('Error loading color scheme:', error)
    throw new Error('Failed to load color scheme')
  }
}
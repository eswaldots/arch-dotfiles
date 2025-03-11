import { StoreConfig } from "@/constants/store"
import { load } from "@tauri-apps/plugin-store"

// Helper reutilizable para cargar el store
async function getStore() {
  return await load(StoreConfig.FILE_NAME, { autoSave: false })
}

/**
 * Obtiene el tema actual basado en la configuración almacenada
 * @returns 'dark' | 'light' - Tema actual
 */
export function getTheme(): "dark" | "light" {
  // Implement sync theme detection (e.g., from localStorage)
  return localStorage.getItem('theme') as "dark" | "light" || 'dark';
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
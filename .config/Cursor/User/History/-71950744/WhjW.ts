import { useState } from 'react'
import { open } from '@tauri-apps/plugin-dialog'
import { convertFileSrc } from '@tauri-apps/api/core'

export default function usePhotoPicker() {
  const [image, setImage] = useState<string | null>(null)

  const searchImage = async () => {
    const dialog = await open({
      directory: false,
      multiple: false,
      filters: [{ name: 'Imagenes', extensions: ['jpg', 'png', 'jpeg'] }]
    })

    if (dialog === null) return

    const imageSrc = convertFileSrc(dialog as string)

    // Verificar que la imagen existe antes de mostrarla
    try {
      await new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = reject
        img.src = imageSrc
      })
      
      setImage(imageSrc)
    } catch (error) {
      console.error('Error loading image:', error)
      setImage("/logo.png")
    }

    return dialog
  }

  const convertLocalSrc = (src: string) => {
    return convertFileSrc(src)
  }

  // TODO: Handle error on upload same image

  return { image, searchImage, convertLocalSrc }
}

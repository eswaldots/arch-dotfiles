import { useState } from 'react'
import { open } from '@tauri-apps/plugin-dialog'
import { convertFileSrc } from '@tauri-apps/api/core'

export default function usePhotoPicker() {
  const [image, setImage] = useState<string | null>(null)
  const [error, setError] = useState<boolean>(false)

  const searchImage = async () => {
    const dialog = await open({
      directory: false,
      multiple: false,
      filters: [{ name: 'Imagenes', extensions: ['jpg', 'png', 'jpeg'] }]
    })

    if (dialog === null) return

    const imageSrc = convertFileSrc(dialog as string)

    /* Regresa el valor de dialog para poder registrar la ruta correctamente,
    mientras que se hace un setImage para poder mostrar el asset creado en
    la preview del componente */

    setImage(imageSrc)

    return dialog
  }

  const convertLocalSrc = (src: string) => {
    return convertFileSrc(src)
  }

  // TODO: Handle error on upload same image

  return { image, searchImage, convertLocalSrc, setImage }
}

import Button from '@/components/buttons/button'
import Input from '@/components/inputs/input'
import { login } from '@/services/auth.service'
import { loadTheme } from '@/services/theme.service'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { convertFileSrc } from '@tauri-apps/api/core'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { load } from '@tauri-apps/plugin-store'
import { useState } from 'react'

export const Route = createFileRoute('/_auth/')({
  component: RouteComponent,
  loader: async () => {
    const store = await load('settings.json')

    const imagePath = (await store.get('enterprise_image_path')) as
      | string
      | null

    if (!imagePath) return [store, null]

    const imagePathConverted = convertFileSrc(imagePath)

    await loadTheme()

    return [store, imagePathConverted]
  }
})

function RouteComponent() {
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const [store, imagePath] = Route.useLoaderData()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement)

    const username = formData.get('username') as string
    const password = formData.get('password') as string

    const res = await login(username, password)

    if (res.error !== null) {
      setLoading(false)
      return setError(res.error)
    }

    await (
      store as {
        set: (key: string, value: string) => Promise<void>
        save: () => Promise<void>
      }
    ).set('session_id', res.session_id ?? '')
    await (
      store as {
        set: (key: string, value: string) => Promise<void>
        save: () => Promise<void>
      }
    ).save()

    const window = getCurrentWindow()

    await window.maximize()

    navigate({ to: '/personal', viewTransition: true })
  }

  return (
    <main className="flex flex-col gap-6 items-center justify-center h-[calc(100vh_-_32px)]">
      <section className="flex flex-col items-center justify-center gap-3">
        <img
          src={(imagePath as string) ?? '/logo.png'}
          alt="logo"
          style={{
            viewTransitionName: "image-expand",
          }}
          className="w-[350px] object-contain"
        />
        <h1 className="text-2xl font-bold">Ingreso al sistema</h1>
      </section>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <Input required name="username" label="Usuario" />
        <Input required type="password" name="password" label="Contraseña" />
        <Button className='transition bg-primary hover:opacity-80'>
          {loading ? <span className="motion-blur-in motion-ease motion-duration-75 text-md font-bold">Cargando...</span> : <span className="text-md font-bold">Iniciar sesión</span>
          }
        </Button>
      </form>
      <p className="text-center w-full">
        <span
          style={{
            opacity: error ? 1 : 0
          }}
          className="transition-all ease-in-out text-red-500"
        >
          {error || 'Placeholder'}
        </span>
      </p>
    </main>
  )
}

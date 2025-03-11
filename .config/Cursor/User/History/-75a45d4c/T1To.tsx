import { createFileRoute } from '@tanstack/react-router'
import Select from '@/components/select'
import SelectItem from '@/components/select/select-item'
import Input from '@/components/inputs/input'
import ColorSelect from '@/components/color-select'
import ColorSelectItem from '@/components/color-select/select-item'
import Switch from '@/components/switch'
import TextArea from '@/components/inputs/textarea'
import { useMultiStepForm } from '../-context/multi-step-form-context'
import {
  INPUT_SELECT_ERROR_MESSAGE,
  INPUT_STRING_ERROR_MESSAGE,
} from '../-constants'
import PhotoPicker from '@/components/inputs/photo-picker'
import { useEffect } from 'react'

export const Route = createFileRoute(
  '/_app/analysis/_layout/management/repein-personal/traits/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { register, control, watch, submitHandler, errors } = useMultiStepForm()

  const hasTatoos = watch('trait_has_tattoos')
  console.log(hasTatoos)

  useEffect(() => {
    localStorage.setItem('form_editing', 'true')
  }, [])

  return (
    <form
      onSubmit={submitHandler}
      id="file-form"
      className="flex flex-col gap-5"
    >
      <h1 className="text-xl font-bold">Rasgos fisicos</h1>

      <section className="flex flex-col gap-5 justify-between w-full">
        <h3 className="text-lg font-semibold -mb-2">Rasgos generales</h3>
        <section className="flex gap-3 items-center justify-between">
          <div className="w-full">
            <Select
              control={control}
              errors={errors}
              rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
              name="trait_build"
              label="Contextura"
            >
              <SelectItem value="delgate">Delgado</SelectItem>

              <SelectItem value="normal">Normal</SelectItem>

              <SelectItem value="robust">Robusto</SelectItem>
            </Select>
          </div>
          <div className="flex gap-2 items-end">
            <article className="w-20">
              <Input
                errors={errors}
                register={register('trait_height', {
                  required: INPUT_STRING_ERROR_MESSAGE,
                })}
                name="trait_height"
                label="Estatura"
              />
            </article>
            <span className="mb-2">cm</span>
          </div>
        </section>

        <ColorSelect
          errors={errors}
          name="trait_skin"
          control={control}
          rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
          label="Color de piel"
        >
          <ColorSelectItem value="#fdddca">Claro</ColorSelectItem>
          <ColorSelectItem value="#fdbe93">Olivaceo</ColorSelectItem>
          <ColorSelectItem value="#d28856">Morena</ColorSelectItem>
          <ColorSelectItem value="#804000">Oscura</ColorSelectItem>
        </ColorSelect>

        <Switch
          errors={errors}
          name="trait_has_tattoos"
          label="Tatuajes"
          control={control}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-normal text-neutral-500">
            Foto de tatuajes
          </label>
          <PhotoPicker
            disabled={!watch('trait_has_tattoos')}
            control={control}
            name="trait_tattoos"
          />

            <Switch
          errors={errors}
          name="trait_has_scars"
          label="Cicatrices"
          control={control}
          />
          <div className="flex flex-col gap-3"></div>
          <label className="text-sm font-normal text-neutral-500">
            Foto de Cicatrices
          </label>
          <PhotoPicker
            disabled={!watch('trait_has_scars')}
            control={control}
            name="trait_scars"
          />
       
        
        </div>
      </section>

      <section className="flex flex-col gap-5 justify-between w-full">
        <h3 className="text-lg font-semibold -mb-2">
          Caracteristicas faciales
        </h3>

        <ColorSelect
          errors={errors}
          name="trait_eyes_color"
          control={control}
          rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
          label="Color de ojos"
        >
          <ColorSelectItem value="#634e34">Marron</ColorSelectItem>
          <ColorSelectItem value="#3b83bd">Azul</ColorSelectItem>
          <ColorSelectItem value="#317873">Verde</ColorSelectItem>
          <ColorSelectItem value="#f5a9a9">Rojo</ColorSelectItem>
          <ColorSelectItem value="#e0e0e0">Gris</ColorSelectItem>
          <ColorSelectItem value="#c0c0c0">Negro</ColorSelectItem>
        </ColorSelect>

        <Select
          errors={errors}
          name="trait_eyes_type"
          control={control}
          rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
          label="Tipo de ojos"
        >
          <SelectItem value="normal">Normal</SelectItem>
          <SelectItem value="round">Arredondado</SelectItem>
        </Select>

        <ColorSelect
          errors={errors}
          name="trait_hair_color"
          control={control}
          rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
          label="Color de pelo"
        >
          <ColorSelectItem value="#FFD700">Rubio</ColorSelectItem>
          <ColorSelectItem value="#944D03">Castaño</ColorSelectItem>
          <ColorSelectItem value="#FF4500">Rojo</ColorSelectItem>
          <ColorSelectItem value="#808080">Gris</ColorSelectItem>
          <ColorSelectItem value="#FFFFFF">Blanco</ColorSelectItem>
        </ColorSelect>

        <Select
          errors={errors}
          name="trait_hair_type"
          control={control}
          rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
          label="Tipo de pelo"
        >
          <SelectItem value="normal">Normal</SelectItem>
          <SelectItem value="curly">Rizado</SelectItem>
          <SelectItem value="straight">Liso</SelectItem>
          <SelectItem value="wavy">Ondulado</SelectItem>
          <SelectItem value="coily">Crespo</SelectItem>
        </Select>

        <Select
          errors={errors}
          name="trait_eyebrow_type"
          control={control}
          rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
          label="Tipo de cejas"
        >
          <SelectItem value="normal">Normal</SelectItem>
          <SelectItem value="raised">Levantadas</SelectItem>
          <SelectItem value="flat">Plano</SelectItem>
          <SelectItem value="up">Arriba</SelectItem>
          <SelectItem value="down">Abajo</SelectItem>
        </Select>

        <Select
          errors={errors}
          control={control}
          name="trait_nose_type"
          rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
          label="Nariz"
        >
          <SelectItem value="normal">Normal</SelectItem>
          <SelectItem value="columbine">Aguileña</SelectItem>
          <SelectItem value="upturned">Respingada</SelectItem>
          <SelectItem value="flat">Chata</SelectItem>
          <SelectItem value="pointed">Puntiaguda</SelectItem>
        </Select>

        <Select
          errors={errors}
          control={control}
          name="trait_face_type"
          rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
          label="Tipo de cara"
        >
          <SelectItem value="oval">Ovalada</SelectItem>
          <SelectItem value="round">Redonda</SelectItem>
          <SelectItem value="square">Cuadrada</SelectItem>
          <SelectItem value="rectangular">Rectangular</SelectItem>
          <SelectItem value="triangular">Triangular</SelectItem>
          <SelectItem value="heart">En forma de corazón</SelectItem>
        </Select>

        <Select
          errors={errors}
          control={control}
          name="trait_lips_type"
          rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
          label="Tipo de labios"
        >
          <SelectItem value="thin">Delgados</SelectItem>
          <SelectItem value="full">Gruesos</SelectItem>
          <SelectItem value="round">Redondeados</SelectItem>
          <SelectItem value="heart_shaped">En forma de corazón</SelectItem>
          <SelectItem value="downturned">Hacia abajo</SelectItem>
        </Select>
      </section>

      <section className="flex flex-col gap-5 justify-between w-full">
        <h3 className="text-lg font-semibold -mb-2">Otros rasgos corporales</h3>

        <Select
          errors={errors}
          control={control}
          name="trait_hands_type"
          rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
          label="Manos"
        >
          <SelectItem value="thin">Delgadas</SelectItem>
          <SelectItem value="mid">Medianas</SelectItem>
          <SelectItem value="thick">Gruesas</SelectItem>
        </Select>

        <TextArea
          errors={errors}
          register={register('trait_others', {
            required: INPUT_STRING_ERROR_MESSAGE,
          })}
          className="flex break-words 
           items-start p-3 outline-none disabled:opacity-60 disabled:hover:bg-neutral-900  h-32 bg-neutral-800 rounded-md hover:bg-neutral-700 transition-colors"
          name="trait_others"
          label="Otros"
        />
      </section>
    </form>
  )
}

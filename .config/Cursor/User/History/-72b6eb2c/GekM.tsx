import Button from '@/components/buttons/button'
import Input from '@/components/inputs/input'
import Modal from '@/components/modal'
import ModalContent from '@/components/modal/modal-content'
import ModalTrigger from '@/components/modal/modal-trigger'
import { createFileRoute } from '@tanstack/react-router'
import ChildrenForm from './-components/children-form'
import { RelativesProvider, useRelatives } from './-hooks/-use-relatives'
import ChildrenItem from './-components/children-item'
import RelativeItem from './-components/relative-item'
import RelativeForm from './-components/relative-form'
import { useMultiStepForm } from '../-context/multi-step-form-context'
import {
  INPUT_DATE_ERROR_MESSAGE,
  INPUT_STRING_ERROR_MESSAGE,
} from '../-constants'
import { useEffect } from 'react'
import AgeInput from '@/components/inputs/age-input'
import CISelect from '@/components/ci-select'

export const Route = createFileRoute(
  '/_app/analysis/_layout/management/repein-personal/relatives/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <RelativesProvider>
      <RelativesForm />
    </RelativesProvider>
  )
}

function RelativesForm() {
  const { childrens, relatives } = useRelatives()

  const { register, errors, setValue, control } = useMultiStepForm()

  useEffect(() => {
    setValue('relatives', JSON.stringify(relatives))
    setValue('childrens', JSON.stringify(childrens))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relatives, childrens])

  return (
    <form id="file-form" className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">Datos Familiares</h1>
      <section className="flex flex-col gap-5 justify-between w-full">
        <h3 className="text-lg font-semibold -mb-2">Datos de conyuge</h3>

        <CISelect
          control={control}
          errors={errors}
          name="fathers_ci"
          label="Cedulad de identidad"
        />

        <section className="flex gap-3 items-center justify-between">
          <Input
            register={register('fathers_name', {
              required: INPUT_STRING_ERROR_MESSAGE,
            })}
            name="fathers_name"
            label="Nombres"
            errors={errors}
          />
          <Input
            register={register('fathers_surname', {
              required: INPUT_STRING_ERROR_MESSAGE,
            })}
            name="fathers_surname"
            label="Apellidos"
            errors={errors}
          />
        </section>

        <section className="flex gap-3 items-center justify-between">
          <AgeInput
            label="Fecha de nacimiento"
            register={register('fathers_birthday', {
              required: INPUT_DATE_ERROR_MESSAGE,
            })}
            register_age={register('fathers_age', {
              required: INPUT_DATE_ERROR_MESSAGE,
            })}
            errors={errors}
          />
        </section>

        <Input
          register={register('fathers_phone', {
            required: INPUT_STRING_ERROR_MESSAGE,
          })}
          name="fathers_phone"
          label="Teléfono"
          errors={errors}
        />
      </section>

      <section className="flex flex-col gap-5 justify-between w-full">
        <h3 className="text-lg font-semibold -mb-2">Hijos</h3>

        <Modal>
          <ModalTrigger>
            <Button
              type="button"
              className="w-full h-8 bg-neutral-800 font-bold hover:opacity-80"
            >
              <span className="text-neutral-100">Agregar hijo</span>
            </Button>
          </ModalTrigger>
          <ModalContent>
            <ChildrenForm />
          </ModalContent>
        </Modal>

        {childrens.map((child) => (
          <ChildrenItem key={child.id} {...child} />
        ))}
      </section>

      <section className="flex flex-col gap-5 justify-between w-full">
        <h3 className="text-lg font-semibold -mb-2">Familiares</h3>

        <Modal>
          <ModalTrigger>
            <Button
              type="button"
              className="w-full h-8 bg-neutral-800 font-bold hover:opacity-80"
            >
              <span className="text-neutral-100">Agregar familiar</span>
            </Button>
          </ModalTrigger>
          <ModalContent>
            <RelativeForm />
          </ModalContent>
        </Modal>

        {relatives.map((relative) => (
          <RelativeItem key={relative.id} {...relative} />
        ))}
      </section>
    </form>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import Button from '@/components/buttons/button'
import DatePicker from '@/components/inputs/datepicker'
import Input from '@/components/inputs/input'
import Modal from '@/components/modal'
import ModalContent from '@/components/modal/modal-content'
import ModalTrigger from '@/components/modal/modal-trigger'
import Select from '@/components/select'
import SelectItem from '@/components/select/select-item'
import { useForm } from 'react-hook-form'
import { useCallback } from 'react'
import ItemTable from '../-components/item-table'
import ItemsTable from '../-components/items-table'
import useBounding from '../-context/use-bounding'
import BoundingForm from '../-components/bounding-form'

export const Route = createFileRoute(
  '/_app/analysis/_layout/management/bounding/bounding-band/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { register, handleSubmit, watch, control } = useForm()

  const setMember = useBounding((state) => state.setMember)

  const tiposVinculo = ['Tipo 1', 'Tipo 2', 'Tipo 3']
  const organismos = ['Organismo 1', 'Organismo 2', 'Organismo 3'] // Esto debería venir de la BD tabla organismos base de datos s_peronal

  const tieneProcedimiento = watch('tieneProcedimiento')

  const onSubmit = (data: any) => {
    console.log(data)
    // Aquí manejarías el envío del formulario
  }

  return (
    <section className="text-left w-screen px-8 flex flex-col gap-4">
      <h1 className="text-2xl text-left font-semibold">
        Agregar vínculo persona
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="space-y-2">
          <label className="font-medium">Tipo</label>
          <Select {...register('tipo')} control={control} placeholder="Seleccione el tipo">
            {tiposVinculo.map((tipo) => (
              <SelectItem key={tipo} value={tipo}>
                {tipo}
              </SelectItem>
            ))}
          </Select>
          <div className="grid grid-cols-2 gap-4">
            <Input {...register('expediente')} label="Expediente" />
            <Input {...register('oficio')} label="Oficio" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-medium">Organismo</label>
          <Select
            {...register('organismo')}
            placeholder="Seleccione el organismo"
          >
            {organismos.map((org) => (
              <SelectItem key={org} value={org}>
                {org}
              </SelectItem>
            ))}
          </Select>
        </div>

        <Input {...register('documento')} label="N° Documento" />

        <div className="space-y-2">
          <label className="font-medium">Motivo</label>
          <textarea
            {...register('motivo')}
            className="w-full p-2 border rounded-lg min-h-[100px]"
          />
        </div>

        <DatePicker {...register('fecha')} label="Fecha" />

        <div className="space-y-2">
          <label className="font-medium">¿Tiene procedimiento?</label>
          <Select {...register('tieneProcedimiento')}>
            <SelectItem value="si">Sí</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </Select>
        </div>

        {tieneProcedimiento === 'si' && (
          <div className="space-y-2">
            <label className="font-medium">Reseña</label>
            <textarea
              {...register('resena')}
              className="w-full p-2 border rounded-lg min-h-[100px]"
            />
          </div>
        )}

        <Button
          type="submit"
          className="w-full font-bold bg-primary hover:opacity-80"
        >
          Guardar vínculo
        </Button>
      </form>

      <button
        onClick={() => navigate({ to: '../' })}
        className="font-bold text-primary absolute bottom-8 transition right-8"
      >
        Terminar
      </button>
    </section>
  )
}

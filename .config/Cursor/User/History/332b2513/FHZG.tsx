import { createFileRoute } from '@tanstack/react-router'
import Button from '@/components/buttons/button'
import DatePicker from '@/components/inputs/datepicker'
import Input from '@/components/inputs/input'
import Select from '@/components/select'
import SelectItem from '@/components/select/select-item'
import { useForm } from 'react-hook-form'
import useBounding from '../-context/use-bounding'
import { BOUNDING_TYPES } from '../-context/constants'
import TextArea from '@/components/inputs/textarea'
import Checkbox from '@/components/inputs/checkbox'
import { BoundingBandForm } from '../-models/bounding-band.model'

export const Route = createFileRoute(
  '/_app/analysis/_layout/management/bounding/bounding-band/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { register, handleSubmit, watch, control } = useForm<BoundingBandForm>()

  const setMember = useBounding((state) => state.setMember)

  const organismos = ['Organismo 1', 'Organismo 2', 'Organismo 3'] // Esto debería venir de la BD tabla organismos base de datos s_peronal

  const has_procedure = watch('has_procedure')

  console.log(has_procedure)

  const onSubmit = (data: any) => {
    console.log(data)
    // Aquí manejarías el envío del formulario
  }

  return (
    <section className="text-left w-screen px-8 flex flex-col gap-4">
      <h1 className="text-2xl text-left font-semibold">
        Agregar vínculo persona
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="space-y-2">
          <h3 className="font-medium -mb-2">Tipo de vinculo</h3>
          <Select control={control} name="tipo" label="">
            {BOUNDING_TYPES.map((boundingType) => (
              <SelectItem key={boundingType.slug} value={boundingType.slug}>
                {boundingType.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="space-y-2 flex flex-col gap-2">
          <label className="font-medium -mb-2">Organismo</label>
          <Select control={control} name="organismo" label="Nombre del Organismo">
            {organismos.map((org) => (
              <SelectItem key={org} value={org}>
                {org}
              </SelectItem>
            ))}
          </Select>

        <Input {...register('organization')} label="N° Documento" />

        </div>

        <div className="space-y-2">
          <h3 className="font-medium -mb-2">Motivo</h3>
          <TextArea
          label=''
            {...register('reason')}
          />


        <DatePicker register={register('date')} name="date" label="Fecha" />

        </div>

        <div className="flex flex-col gap-1 space-y-2">

          <Checkbox
          label='¿Tiene procedimiento?'
          register={register('has_procedure')}
          />

        {has_procedure && (
          <>
          <div>
            <label className="font-medium -mb-2">Reseña</label>
            <TextArea
            label=''
              {...register('procedure_description')}
            />
</div>
</>
        )}

        </div>


        <Button
          type="submit"
          className="w-full font-bold bg-primary hover:opacity-80"
        >
          Guardar vínculo
        </Button>
      </form>

      <button
        className="font-bold text-primary absolute bottom-8 transition right-8"
      >
        Terminar
      </button>
    </section>
  )
}

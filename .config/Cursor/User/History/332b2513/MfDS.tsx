import { createFileRoute } from '@tanstack/react-router'
import DatePicker from '@/components/inputs/datepicker'
import Input from '@/components/inputs/input'
import Select from '@/components/select'
import SelectItem from '@/components/select/select-item'
import { useForm } from 'react-hook-form'
import useBounding from '../-context/use-bounding'
import { BOUNDING_TYPES } from '../-context/constants'
import TextArea from '@/components/inputs/textarea'
import Checkbox from '@/components/inputs/checkbox'
import { BoundingBandModel } from '../-models/bounding-band.model'
import { INPUT_DATE_ERROR_MESSAGE, INPUT_SELECT_ERROR_MESSAGE, INPUT_STRING_ERROR_MESSAGE } from '@/constants/validations'

export const Route = createFileRoute(
  '/_app/analysis/_layout/management/bounding/bounding-band/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm<BoundingBandModel>()

  const setBoundingBand = useBounding((state) => state.setBoundingBand)

  const organismos = ['Organismo 1', 'Organismo 2', 'Organismo 3'] // Esto debería venir de la BD tabla organismos base de datos s_peronal

  const has_procedure = watch('has_procedure')

  const onSubmit = handleSubmit((data) => {
    setBoundingBand(data)

    console.log("submit")

    navigate({ to: "../bounding-person", from: Route.fullPath, viewTransition: true, resetScroll: true});
  })

  return (
    <section className="text-left w-screen px-8 flex flex-col gap-4">
      <h1 className="text-2xl text-left font-semibold">
        Agregar vínculo persona
      </h1>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="space-y-2">
          <h3 className="font-medium -mb-2">Tipo de vinculo</h3>
          <Select control={control} name="bounding_type" label="">
            {BOUNDING_TYPES.map((boundingType) => (
              <SelectItem key={boundingType.slug} value={boundingType.slug}>
                {boundingType.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="space-y-2 flex flex-col gap-2">
          <label className="font-medium -mb-2">Organismo</label>
          <Select control={control} name="organization_id" rules={{ required: INPUT_SELECT_ERROR_MESSAGE }} errors={errors} label="Nombre del Organismo">
            {organismos.map((org) => (
              <SelectItem key={org} value={org}>
                {org}
              </SelectItem>
            ))}
          </Select>

        <Input register={register("document_id", {required: INPUT_STRING_ERROR_MESSAGE })} label="N° Documento" />

        </div>

        <div className="space-y-2 flex flex-col gap-2">
          <h3 className="font-medium -mb-2">Motivo</h3>
          <TextArea
          label=''
          register={register("reason", {required: INPUT_STRING_ERROR_MESSAGE})}
          />


        <DatePicker register={register('date', { required: INPUT_DATE_ERROR_MESSAGE })} name="date" label="Fecha" />

        </div>

        <div className="flex flex-col gap-1 space-y-2">

          <Checkbox
          label='¿Tiene procedimiento?'
          register={register('has_procedure', { required: INPUT_SELECT_ERROR_MESSAGE})}
          />

        {has_procedure && (
          <div className='motion-preset-fade-sm motion-scale-y-in-75 motion-duration-100 motion-ease'>
            <label className="font-medium -mb-2">Reseña</label>
            <TextArea
            label=''
              register={register('procedure_description', { required: INPUT_STRING_ERROR_MESSAGE})}
            />
</div>
        )}

        </div>


      </form>

      <button
      type='submit'
        className="font-bold text-primary absolute bottom-8 transition right-8"
      >
       Continuar
      </button>
    </section>
  )
}

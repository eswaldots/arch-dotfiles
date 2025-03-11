import Checkbox from "@/components/inputs/checkbox"
import DatePicker from "@/components/inputs/datepicker"
import Input from "@/components/inputs/input"
import TextArea from "@/components/inputs/textarea"
import Select from "@/components/select"
import SelectItem from "@/components/select/select-item"
import { INPUT_SELECT_ERROR_MESSAGE, INPUT_STRING_ERROR_MESSAGE, INPUT_DATE_ERROR_MESSAGE } from "@/constants/validations"
import { useForm } from "react-hook-form"
import { BOUNDING_TYPES } from "../-context/constants"
import useBounding from "../-context/use-bounding"
import { BoundingBandModel } from "../-models/bounding-band.model"
import { useModal } from "@/components/modal/modal-context"
import Button from "@/components/buttons/button"

export default function BoundingBandForm() {
  const { setOpen } = useModal();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<BoundingBandModel>()

  const setBoundingBand = useBounding((state) => state.setBoundingBand)

  const organismos = ['CICPC', 'CPNB', 'SEBIN']
  const dependencias = ['Juzgado', 'Delegación', 'Sub Delegación']
  const estados = ['Miranda', 'Carabobo']

  const has_procedure = watch('has_procedure')

  const onSubmit = (data: BoundingBandModel) => {
    setBoundingBand(data)

    setOpen(false)
  }

  return (
    <section className="text-left px-8 flex flex-col gap-4 w-[500px] bg-neutral-950 max-h-[90vh] overflow-y-auto py-12">
      <h1 className="text-2xl text-left font-semibold">
        Agregar vínculo banda
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium">Tipo de vínculo</h3>
            <Select
              errors={errors}
              control={control}
              name="bounding_type"
              label=""
            >
              {BOUNDING_TYPES.map((boundingType) => (
                <SelectItem key={boundingType.slug} value={boundingType.slug}>
                  {boundingType.name}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">N° Documento</h3>
            <Input
              errors={errors}
              register={register('document_id', {
                required: INPUT_STRING_ERROR_MESSAGE,
              })}
              label=""
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Fecha</h3>
            <DatePicker
              errors={errors}
              register={register('date', { required: INPUT_DATE_ERROR_MESSAGE })}
              name="date"
              label=""
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium">Organismo</h3>
            <Select
              control={control}
              name="organization_id"
              rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
              errors={errors}
              label=""
            >
              {organismos.map((org) => (
                <SelectItem key={org} value={org}>
                  {org}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Dependencia</h3>
            <Select
              control={control}
              name="dependency"
              rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
              errors={errors}
              label=""
            >
              {dependencias.map((dep) => (
                <SelectItem key={dep} value={dep}>
                  {dep}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Estado</h3>
            <Select
              control={control}
              name="state"
              rules={{ required: INPUT_SELECT_ERROR_MESSAGE }}
              errors={errors}
              label=""
            >
              {estados.map((estado) => (
                <SelectItem key={estado} value={estado}>
                  {estado}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Motivo</h3>
            <TextArea
              errors={errors}
              label=""
              register={register('reason', {
                required: INPUT_STRING_ERROR_MESSAGE,
              })}
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Imágenes</h3>
            <Input
              type="file"
              multiple
              accept="image/*"
              errors={errors}
              register={register('images')}
              label=""
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 space-y-2">
          <Checkbox
            label="¿Tiene procedimiento?"
            register={register('has_procedure', {
              required: INPUT_SELECT_ERROR_MESSAGE,
            })}
          />

          {has_procedure && (
            <div className="motion-preset-fade-sm motion-scale-y-in-75 motion-duration-100 motion-ease">
              <label className="font-medium -mb-2">Reseña</label>
              <TextArea
                errors={errors}
                label=""
                register={register('procedure_description', {
                  required: INPUT_STRING_ERROR_MESSAGE,
                })}
              />
            </div>
          )}
        </div>

        <Button type="submit" className="w-full">Agregar vínculo</Button>

      </form>
    </section>
  )
}

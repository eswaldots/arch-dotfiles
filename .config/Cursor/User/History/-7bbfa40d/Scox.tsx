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
import {
  INPUT_DATE_ERROR_MESSAGE,
  INPUT_SELECT_ERROR_MESSAGE,
  INPUT_STRING_ERROR_MESSAGE,
} from '@/constants/validations'
import Button from '@/components/buttons/button'
import Modal from '@/components/modal'
import ModalContent from '@/components/modal/modal-content'
import ModalTrigger from '@/components/modal/modal-trigger'
import BoundingBandForm from '../-components/bounding-band-form'
import ItemTable from '../-components/item-table'
import ItemsTable from '../-components/items-table'

export const Route = createFileRoute(
  '/_app/analysis/_layout/management/bounding/bounding-band/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<BoundingBandModel>()

  const setBoundingBand = useBounding((state) => state.setBoundingBand)

  const boundingsBand = useBounding((state) => state.boundingBand)


  console.log(boundingsBand)

  const onSubmit = (data: BoundingBandModel) => {
    setBoundingBand(data)

    navigate({
      to: '../bounding-person',
      from: Route.fullPath,
      viewTransition: true,
      resetScroll: true,
    })
  }

  return (
    <section className="text-left w-screen px-8 flex flex-col gap-4">
      <h1 className="text-2xl text-left font-semibold">
        Agregar vínculos de banda
      </h1>

      <Modal>
        <ModalTrigger>
          <Button className='bg-neutral-800 text-neutral-100'>Agregar vínculo de banda</Button>
        </ModalTrigger>

        <ModalContent>
          <BoundingBandForm />
        </ModalContent>
      </Modal>


      <ItemsTable>
        {boundingsBand?.map((member, index) => (
          <ItemTable
            key={member.toString()}
            isFirst={index === 0}
            isLast={index === boundingsBand.length - 1}
          >
            <div className="flex flex-col">
              <span className="font-semibold">{member.bounding_type === "record" ? "Expediente" : "Oficio"}</span>
              <span className="text-sm text-neutral-500">
              </span>
            </div>
          </ItemTable>
        ))}
      </ItemsTable>

        <button
          type="submit"
          className="font-bold text-primary absolute bottom-8 transition right-8"
        >
          Continuar
        </button>

    </section>
  )
}

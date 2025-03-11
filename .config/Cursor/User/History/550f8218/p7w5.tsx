import useBounding from '../-context/use-bounding'
import Button from '@/components/buttons/button'
import Modal from '@/components/modal'
import ModalContent from '@/components/modal/modal-content'
import ModalTrigger from '@/components/modal/modal-trigger'
import BoundingBandForm from '../-components/bounding-band-form'
import ItemTable from '../-components/item-table'
import ItemsTable from '../-components/items-table'
import { createFileRoute } from '@tanstack/react-router'
import { getRepeinRecordsById } from '@/services/analysis.service'

export const Route = createFileRoute(
  '/_app/analysis/_layout/management/bounding/bounding-member/',
)({
  component: RouteComponent,
  loader: async () => {
    const repein = useBounding((state) => state.member)

    const boundingBands = await getRepeinRecordsById(repein?.repein_id ?? 0)

    return {
      boundingBands
    }
  },
})


function RouteComponent() {
  const navigate = Route.useNavigate()

  const boundingsMember = useBounding((state) => state.boundingMember)

  return (
    <section className="text-left w-screen px-8 flex flex-col gap-4">
      <h1 className="text-2xl text-left font-semibold">
        Agregar vínculos de individuo
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
        {boundingsMember?.map((member, index) => (
          <ItemTable
            key={member.toString()}
            isFirst={index === 0}
            isLast={index === boundingsMember.length - 1}
          >
            <div className="flex flex-col">
              <span className="font-semibold">{member.record_type === "record" ? "Expediente" : "Oficio"}</span>
              <span className="text-sm text-neutral-500">
              </span>
            </div>
          </ItemTable>
        ))}
      </ItemsTable>

        <button
        onClick={() => navigate({
          to: '../bounding-member',
          from: Route.fullPath,
          viewTransition: true,
          resetScroll: true,
        })}
          type="submit"
          className="font-bold text-primary absolute bottom-8 transition right-8"
        >
          Continuar
        </button>

    </section>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import useBounding from '../-context/use-bounding'
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

  const repein = useBounding((state) => state.member)

  const boundingsBand = useBounding((state) => state.boundingBand)

  return (
    <section className="text-left w-screen px-8 flex flex-col gap-4">
      <h1 className="text-2xl text-left font-semibold">
        Agregar Informacion a  Banda
      </h1>

      <Modal>
        <ModalTrigger>
          <Button className='bg-neutral-800 text-neutral-100'>Agregar Vínculo</Button>
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
            <div className="flex flex-col w-30 border-r border-neutral-800 pr-2">
              <span className="font-semibold">{member.bounding_type === "record" ? "Expediente" : "Oficio"}</span>
              <span className="text-sm text-neutral-500"></span>
            </div>
            <div className="flex flex-col w-45 border-r border-neutral-800 px-2">
              <span className="font-semibold">N° {member.document_id}</span>
              <span className="text-sm text-neutral-500"></span>
            </div>
            <div className="flex flex-col w-58 border-r border-neutral-800 px-2">
              <span className="font-semibold whitespace-nowrap">
                el {member.date ? new Date(member.date).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }).replace(/\//g, '-') : ''}
              </span>
              <span className="text-sm text-neutral-500"></span>
            </div>
            <div className="flex flex-col flex-1 pl-2">
              <span className="font-semibold truncate">Por {member.reason}</span>
              <span className="text-sm text-neutral-500"></span>
            </div>
          </ItemTable>
        ))}
      </ItemsTable>

        <button
        disabled={boundingsBand?.length === 0}
        onClick={() => navigate({
          to: '../bounding-member',
          search: {
            repeinId: Number(repein?.repein_id)
          },
          from: Route.fullPath,
          viewTransition: true,
          resetScroll: true,
        })}
          type="submit"
          className="font-bold text-primary absolute bottom-8 transition right-8 disabled:opacity-50"
        >
          Continuar
        </button>

    </section>
  )
}

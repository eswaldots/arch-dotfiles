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
import { useEffect } from 'react'
import BoundingMemberForm from '../-components/bounding-member-form'

export const Route = createFileRoute(
  '/_app/analysis/_layout/management/bounding/bounding-member/',
)({
  component: RouteComponent,
  loaderDeps: ({ search: { repeinId } }) => ({ repeinId }),
  loader: async ({ deps: { repeinId } }) => {
    const boundingBands = await getRepeinRecordsById(repeinId)

    return boundingBands
  },
})


function RouteComponent() {
  const records = Route.useLoaderData().data
  const setBoundingMember = useBounding((state) => state.setBoundingMember)

  useEffect(() => {
    if (records) {
      records.forEach((record) => { 
        setBoundingMember({
          ...record,
          record_id: Number(record.record_id)
        })
      })
    }
  }, [records, setBoundingMember])

  const navigate = Route.useNavigate()

  const boundingsMember = useBounding((state) => state.boundingMember)

  return (
    <section className="text-left w-screen px-8 flex flex-col gap-4">
      <h1 className="text-2xl text-left font-semibold">
        Agregar Historial a Individuo
      </h1>

      <Modal>
        <ModalTrigger>
          <Button className='bg-neutral-800 text-neutral-100'>Agregar Historial</Button>
        </ModalTrigger>

        <ModalContent>
          <BoundingMemberForm />
        </ModalContent>
      </Modal>


      <ItemsTable>
        {boundingsMember?.map((member, index) => (
                <ItemTable
                key={member.toString()}
                isFirst={index === 0}
                isLast={index === boundingsMember.length - 1}
              >
                <div className="flex flex-col w-30">
                  <span className="font-semibold">{member.record_type === "expediente" ? "Expediente" : "Oficio"}</span>
                  <span className="text-sm text-neutral-500"></span>
                </div>
                <div className="flex flex-col w-45">
                  <span className="font-semibold">N° {member.record_document}</span>
                  <span className="text-sm text-neutral-500"></span>
                </div>
                <div className="flex flex-col w-58">
                  <span className="font-semibold whitespace-nowrap">
                    el {member.record_date ? new Date(member.record_date).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }).replace(/\//g, '-') : ''}
                  </span>
                  <span className="text-sm text-neutral-500"></span>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-semibold truncate">Por {member.record_name}</span>
                  <span className="text-sm text-neutral-500"></span>
                </div>
              </ItemTable>
        ))}
      </ItemsTable>

        <button
        onClick={() => navigate({
          to: '../bounding',
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

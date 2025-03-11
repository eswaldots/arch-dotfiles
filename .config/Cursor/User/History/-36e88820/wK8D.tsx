import Button from '@/components/buttons/button'
import Modal from '@/components/modal'
import ModalContent from '@/components/modal/modal-content'
import ModalTrigger from '@/components/modal/modal-trigger'
import { createFileRoute } from '@tanstack/react-router'
import RecordForm from './-components/record-form'
import { RecordsProvider, useRecords } from './-context/records-context'
import RecordItem from './-components/record-item'
import { useMultiStepForm } from '../-context/multi-step-form-context'
import { useEffect } from 'react'

export const Route = createFileRoute(
  '/_app/analysis/_layout/management/repein-personal/record/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <RecordsProvider>
      <RecordsForm />
    </RecordsProvider>
  )
}

function RecordsForm() {
  const { records } = useRecords()
  const { setValue } = useMultiStepForm()

  useEffect(() => {
    setValue('records', JSON.stringify(records))

    console.log(records)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records])

  return (
    <form id="file-form" className="flex flex-col gap-5 w-full">
      <h1 className="text-xl font-bold -mb-2">Historial delictivo</h1>
      <Modal>
        <ModalTrigger>
          <Button
            type="button"
            className="w-full h-8 bg-neutral-800 mt-4 font-bold hover:opacity-80"
          >
            <span className="text-neutral-100">Agregar historial</span>
          </Button>
        </ModalTrigger>
        <ModalContent>
          <RecordForm />
        </ModalContent>
      </Modal>

      {records?.map((record) => <RecordItem key={record.id} {...record} />)}
    </form>
  )
}

import { maximizeWindow } from '../actions'
import { SquareIcon } from '@/assets/icons/square'

interface PropsMaximizeButton {
  disabled: boolean
}

export default function MaximizeButton(props: PropsMaximizeButton) {
  return (
    <button
      disabled={props.disabled}
      onClick={() => maximizeWindow()}
      className="grid place-content-center disabled:opacity-50 disabled:hover:bg-transparent w-12 hover:bg-black/5 active:bg-black/50 group transition-colors"
    >
      <SquareIcon stroke='currentColor' strokeWidth={0.5} className='text-neutral-100' />
    </button>
  )
}

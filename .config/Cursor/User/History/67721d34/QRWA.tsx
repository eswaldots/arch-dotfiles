import ActionsButtons from '../actions-buttons'

interface PropsTitleBar {
  shouldMaximize?: boolean
}

export default function TitleBar(props: PropsTitleBar) {
  return (
    <header data-tauri-drag-region className="title-bar grid place-content-end fixed pb-10">
      <ActionsButtons shouldMaximize={props.shouldMaximize ?? true} />
    </header>
  )
}

interface CheckboxProps {
  label: string
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input className="w-4 h-4 text-primary" type="checkbox" />
      <label>{props.label}</label>
    </div>
  )
}

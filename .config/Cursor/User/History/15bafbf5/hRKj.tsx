interface CheckboxProps {
  label: string
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" />
      <label>{props.label}</label>
    </div>
  )
}

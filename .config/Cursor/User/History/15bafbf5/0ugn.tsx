interface CheckboxProps {
  label: string
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <div>
      <input type="checkbox" />
      <label>{props.label}</label>
    </div>
  )
}

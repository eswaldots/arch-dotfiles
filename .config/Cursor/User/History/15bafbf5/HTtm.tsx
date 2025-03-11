import { UseFormRegisterReturn } from "react-hook-form"

interface CheckboxProps {
  label: string
  register?: UseFormRegisterReturn
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input className="w-4 h-4 text-primary" type="checkbox" {...props.register} />
      <label>{props.label}</label>
    </div>
  )
}

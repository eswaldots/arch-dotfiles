import { cn } from '@/utils/cn'
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  label: string
  value?: string
  className?: string
  name?: string
  type?: string
  register?: UseFormRegisterReturn
  placeholder?: string
  errors?: FieldErrors
  required?: boolean
  disabled?: boolean
}

export default function TextArea(props: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-normal text-neutral-500">
        {props.label}
      </label>
      <textarea
        className={cn(
          'font-normal h-32 w-full transition-colors shadow-sm rounded-md outline-none px-4 py-[18px] resize-none',
          'bg-neutral-900 disabled:hover:bg-neutral-900 hover:bg-neutral-700 focus:hover:bg-neutral-900',
          props.className
        )}
        {...props.register}
        {...props}
      />
      {props.register?.name && props.errors?.[props?.register?.name] && (
        <span className="text-red-500 text-xs mb-3">
          {props.errors?.[props?.register?.name]?.message?.toString()}
        </span>
      )}
    </div>
  )
}

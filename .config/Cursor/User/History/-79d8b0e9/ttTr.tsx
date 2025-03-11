import { MagnifyingGlassIcon } from "@/assets/icons/magnifying-glass";
import { useSearch } from "./use-search";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function SearchInput({
  label,
  error,
  className,
  ...props
}: SearchInputProps) {

  const { value, handleChange } = useSearch();

  const inputId = "search-input";

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-neutral-700" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
        <input
          type="text"
          onChange={(e) => handleChange(e.target.value)}
          className={`w-full rounded-md bg-neutral-900 border border-neutral-300 pl-10 pr-3 py-2 text-sm placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${className}`}
          {...props}
          id={inputId}
          name={inputId}
        />
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

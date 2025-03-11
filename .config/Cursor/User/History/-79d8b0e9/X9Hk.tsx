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
  defaultValue,
  ...props
}: SearchInputProps) {

  const { handleChange } = useSearch();

  const inputId = "search-input";

  return (
    <div className="flex flex-col gap-2">
      {label && (
      <label className="text-sm font-normal text-neutral-500">
        {label}
      </label>
      )}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
        <input
          type="text"
          defaultValue={defaultValue}
          onChange={(e) => handleChange(e.target.value)}
          className={`w-full rounded-md bg-neutral-900 border-neutral-300 pl-10 pr-3 py-2 text-sm placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${className}`}
          {...props}
          id={inputId}
          name={inputId}
        />
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

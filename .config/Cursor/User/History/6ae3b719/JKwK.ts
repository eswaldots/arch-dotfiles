import { useDebouncedCallback } from "@/hooks/use-debounce";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function useSearch() {
  const [value, setValue] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate({ from: pathname });

  const handleChange = useDebouncedCallback((term: string) => {
    setValue(term);

    navigate({ search: { q: term}
    }, resetScroll: false, replace: true });
  }, 500);

  return { value, handleChange };
}

import { useDebouncedCallback } from "@/hooks/use-debounce";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function useSearch() {
  const [value, setValue] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate({ from: pathname });

  const handleChange = useDebouncedCallback((term: string) => {
    setValue(term);

    navigate({ search: { q: term }, resetScroll: false, replace: false, viewTransition: true });
  }, 500);

  return { value, handleChange };
}

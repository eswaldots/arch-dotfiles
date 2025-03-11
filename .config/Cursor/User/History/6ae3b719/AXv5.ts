import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function useSearch() {
  const [value, setValue] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate({ from: pathname });

  const handleChange = (term: string) => {
    setValue(term);
  };

  useEffect(() => {
    if (!value) {
      navigate({ search: (prev) => {
        const newSearch = {...prev};
        delete newSearch.q;
        return newSearch;
      }, resetScroll: false, replace: true });
      return;
    }

    navigate({ search: (prev) => ({ ...prev, q: value }), resetScroll: false, replace: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return { value, handleChange };
}

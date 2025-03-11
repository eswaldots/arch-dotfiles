import { useEffect, useRef } from "react";
import { useDropdown } from "./dropdown-context";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface DropdownMenuProps {
  children: React.ReactNode;
}

export default function DropdownMenu(props: DropdownMenuProps) {
  const { isOpen, setIsOpen } = useDropdown();
  const menuRef = useRef<HTMLUListElement>(null);

  useOutsideClick(menuRef, () => setIsOpen(false));

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <ul
      ref={menuRef}
      role="menu"
      className={
        "flex transition flex-col bg-neutral-950 rounded-md p-2 z-50 shadow-xl gap-1 " +
        (isOpen
          ? "opacity-100 motion-ease-in motion-scale-in-95 motion-duration-75 motion-preset-fade-sm"
          : "opacity-0 hidden motion-duration-75 motion-ease-out motion-scale-out-95")
      }
    >
      {props.children}
    </ul>
  );
}

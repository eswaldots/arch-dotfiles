import { ChevronDownIcon } from "@/assets/icons/chevron-down";
import { cn } from "@/utils/cn";

interface PropsItemTable {
  children: React.ReactNode;
  key: string;
  isFirst: boolean;
  isLast: boolean;
  onClick?: () => void;
}

export default function ItemTable(props: PropsItemTable) {
  return (
    <li
      onClick={props.onClick}
      className={
        cn("flex justify-between items-center gap-1 cursor-default py-4 px-6 transition hover:bg-neutral-700 border-b border-neutral-700 ",
        props.isFirst && "rounded-t-md ",
        props.isLast && " rounded-b-md border-b-0")
      }
    >
      {props.children}
      <ChevronDownIcon className="text-neutral-500 size-6 rotate-[270deg]" />
    </li>
  );
}

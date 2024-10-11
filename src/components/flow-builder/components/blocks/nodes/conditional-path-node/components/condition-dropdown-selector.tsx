import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";

const conditionList = [
  { id: nanoid(), condition: "Exists" },
  { id: nanoid(), condition: "Does not exist" },
  { id: nanoid(), condition: "Equal" },
  { id: nanoid(), condition: "Not equal" },
  { id: nanoid(), condition: "Starts with" },
  { id: nanoid(), condition: "Ends with" },
  { id: nanoid(), condition: "Contains" },
  { id: nanoid(), condition: "Empty" },
  { id: nanoid(), condition: "Not empty" },
  { id: nanoid(), condition: "Greater than" },
  { id: nanoid(), condition: "Less than" },
];

type ConditionDropdownSelectorProps = Readonly<{
  value: { id: string; condition: string } | null;
  onChange: (value: { id: string; condition: string } | null) => void;
}>;

export function ConditionDropdownSelector({
  value,
  onChange,
}: ConditionDropdownSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="h-8 w-full flex items-center justify-between border border-dark-50 rounded-md bg-dark-300 px-2.5 outline-none transition active:(border-dark-200 bg-dark-400/50) data-[state=open]:(border-dark-200 bg-dark-500) data-[state=closed]:(hover:bg-dark-300)"
        >
          <div className="flex items-center">
            <div className="text-sm font-medium leading-none tracking-wide">
              {value ? value.condition : "Select Condition"}
            </div>
          </div>

          <div className="i-lucide:chevrons-up-down ml-1 size-3 op-50" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={5}
        className={cn(
          "w-fit select-none border border-dark-100 rounded-lg bg-dark-200/90 p-0.5 text-light-50 shadow-xl backdrop-blur-lg transition",
          "animate-in data-[side=top]:slide-in-bottom-0.5 data-[side=bottom]:slide-in-bottom--0.5 data-[side=bottom]:fade-in-40 data-[side=top]:fade-in-40"
        )}
      >
        {conditionList.map(({ id, condition }) => (
          <DropdownMenuItem
            key={id}
            className="h-8 flex cursor-pointer items-center border border-transparent rounded-lg p-1.5 pr-6 outline-none transition active:(border-dark-100 bg-dark-300) hover:bg-dark-100"
            onSelect={() => onChange({ id, condition })}
          >
            <div className="flex items-center gap-x-2">
              <div className="text-xs font-medium leading-none tracking-wide">
                {condition}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

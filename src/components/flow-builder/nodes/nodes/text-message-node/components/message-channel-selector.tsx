import { listify } from "radash";
import {
  MessageChannelDetail,
  MessageChannelDetails,
  MessageChannelType,
} from "../constants/channels";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type MessageChannelSelectorProps = Readonly<{
  detail: MessageChannelDetail;
  onSelect: (
    channel: MessageChannelDetail & { type: MessageChannelType }
  ) => void;
}>;

export function MessageChannelSelector({
  detail,
  onSelect,
}: MessageChannelSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="h-7 flex items-center justify-center border border-transparent rounded-lg bg-transparent px-1.2 outline-none transition active:(border-dark-200 bg-dark-400/50) data-[state=open]:(border-dark-200 bg-dark-500) data-[state=closed]:(hover:bg-dark-100)"
        >
          <div className={cn(detail.icon, "size-4")} />

          <div className="i-lucide:chevrons-up-down ml-1 size-3 op-50" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={5}
        className={cn(
          "min-w-40 select-none border border-dark-100 rounded-lg bg-dark-200/90 p-0.5 text-light-50 shadow-xl backdrop-blur-lg transition",
          "animate-in data-[side=top]:slide-in-bottom-0.5 data-[side=bottom]:slide-in-bottom--0.5 data-[side=bottom]:fade-in-40 data-[side=top]:fade-in-40"
        )}
      >
        {listify(MessageChannelDetails, (k, v) => (
          <DropdownMenuItem
            key={k}
            className="cursor-pointer border border-transparent rounded-lg p-1.5 outline-none transition active:(border-dark-100 bg-dark-300) hover:bg-dark-100"
            onSelect={() => onSelect({ ...v, type: k })}
          >
            <div className="flex items-center gap-x-2">
              <div className={cn(v.icon, "size-4")} />

              <div className="text-xs font-medium leading-none tracking-wide">
                {v.name}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

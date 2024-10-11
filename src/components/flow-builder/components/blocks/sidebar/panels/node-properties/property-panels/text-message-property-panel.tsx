import { MessageChannelDetails } from "@/components/flow-builder/components/blocks/nodes/text-message-node/constants/channels";
import { TextMessageNodeData } from "@/components/flow-builder/components/blocks/nodes/text-message-node/text-message.node";
import { BuilderNodeType } from "@/components/flow-builder/components/blocks/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { listify } from "radash";
import { useMemo } from "react";

type TextMessageNodePropertyPanelProps = Readonly<{
  id: string;
  type: BuilderNodeType;
  data: TextMessageNodeData;
  updateData: (data: Partial<TextMessageNodeData>) => void;
}>;

export default function TextMessageNodePropertyPanel({
  id,
  data,
  updateData,
}: TextMessageNodePropertyPanelProps) {
  const currentMessageChannelDetail = useMemo(() => {
    return MessageChannelDetails[data.channel];
  }, [data.channel]);

  return (
    <div className="flex flex-col gap-4.5 p-4">
      <div className="flex flex-col">
        <div className="text-xs text-card-foreground/60 font-semibold">
          Unique Identifier
        </div>

        <div className="mt-2 flex">
          <input
            type="text"
            value={id}
            readOnly
            className="h-8 w-full border border-card-foreground/10 rounded-md bg-card px-2.5 text-sm font-medium shadow-sm outline-none transition hover:bg-card-foreground/60 read-only:text-card-foreground/80 read-only:opacity-80 read-only:hover:bg-card/30"
          />
        </div>
      </div>

      <div className="flex my-3  flex-col">
        <div className="text-xs text-card-foreground/60 font-semibold">
          Channel
        </div>

        <div className="mt-2 flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="h-8 w-full flex items-center justify-between border border-card-foreground/10 rounded-md bg-card px-2.5 shadow-sm outline-none transition active:border-card active:bg-card/50 data-[state=open]:border-card data-[state=open]:bg-card data-[state=closed]:hover:bg-card/60"
              >
                <div className="flex items-center">
                  <Icon
                    icon={currentMessageChannelDetail.icon}
                    className="size-4"
                  />

                  <div className="ml-2 text-sm font-medium leading-none tracking-wide">
                    {currentMessageChannelDetail.name}
                  </div>
                </div>

                <Icon
                  icon="lucide:chevrons-up-down"
                  className="ml-1 size-3 opacity-50"
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              sideOffset={5}
              align="start"
              className={cn(
                "[width:var(--radix-popper-anchor-width)] select-none border border-card-foreground/10 rounded-lg bg-card/90 p-0.5 text-cardshadow-xl backdrop-blur-lg transition",
                "animate-in data-[side=top]:slide-in-bottom-0.5 data-[side=bottom]:slide-in-bottom--0.5 data-[side=bottom]:fade-in-40 data-[side=top]:fade-in-40"
              )}
            >
              {listify(MessageChannelDetails, (k, v) => (
                <DropdownMenuItem
                  key={k}
                  className="cursor-pointer border border-transparent rounded-lg p-1.5 outline-none transition active:(border-card bg-card/60) hover:bg-card"
                  onSelect={() => updateData({ channel: k })}
                >
                  <div className="flex items-center gap-x-2">
                    <Icon icon={v.icon} className="size-4" />

                    <div className="text-xs font-medium leading-none tracking-wide">
                      {v.name}
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="text-xs text-card-foreground/60 font-semibold">
          Message
        </div>

        <div className="mt-2 flex">
          <textarea
            value={data.message}
            onChange={(e) => updateData({ message: e.target.value })}
            placeholder="Type your message here..."
            className="min-h-32 w-full resize-none border border-card-foreground/10 rounded-md bg-card px-2.5 py-2 text-sm font-medium shadow-sm outline-none transition focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/50 hover:bg-card/60 placeholder:text-card/50  placeholder:italic read-only:text-card/80"
          />
        </div>
      </div>
    </div>
  );
}

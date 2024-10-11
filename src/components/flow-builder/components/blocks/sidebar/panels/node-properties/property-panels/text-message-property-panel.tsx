import { MessageChannelDetails } from "@/components/flow-builder/components/blocks/nodes/text-message-node/constants/channels";
import { TextMessageNodeData } from "@/components/flow-builder/components/blocks/nodes/text-message-node/text-message.node";
import { BuilderNodeType } from "@/components/flow-builder/components/blocks/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
          <Input
            type="text"
            value={id}
            readOnly
            className="h-8 w-full read-only:opacity-80 read-only:hover:bg-card/30"
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
              <Button
                type="button"
                variant={"outline"}
                className="h-8 w-full flex items-center justify-between "
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
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              sideOffset={5}
              align="center"
              className={cn(
                "[width:var(--radix-popper-anchor-width)] select-none "
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
          <Textarea
            value={data.message}
            onChange={(e) => updateData({ message: e.target.value })}
            placeholder="Type your message here..."
            className="min-h-32 w-full resize-none "
          />
        </div>
      </div>
    </div>
  );
}

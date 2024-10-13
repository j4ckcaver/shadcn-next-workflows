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
import { TagsInput } from "@/components/ui/tags-input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { listify } from "radash";
import { useMemo } from "react";
import { TagsNodeData } from "../../../../nodes/tags-node/tags.node";

type TagsNodePropertyPanelProps = Readonly<{
  id: string;
  type: BuilderNodeType;
  data: TagsNodeData;
  updateData: (data: Partial<TagsNodeData>) => void;
}>;

export default function TagsNodePropertyPanel({
  id,
  data,
  updateData,
}: TagsNodePropertyPanelProps) {
  const currentTagsDetail = useMemo(() => {
    return data.tags;
  }, [data.tags]);

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
            disabled
            className="h-8 w-full read-only:opacity-80 read-only:hover:bg-card/30 select-none"
          />
        </div>
      </div>

      <div className="flex my-3  flex-col gap-2">
        <div className="text-xs text-card-foreground/60 font-semibold">
          Tags
        </div>

        <TagsInput
          placeholder="Type tag name"
          value={currentTagsDetail}
          onValueChange={(t) => updateData({ tags: t })}
          maxItems={5}
        />
        <p className="text-xs text-card-foreground/60">Max. 5 tags</p>
      </div>
    </div>
  );
}

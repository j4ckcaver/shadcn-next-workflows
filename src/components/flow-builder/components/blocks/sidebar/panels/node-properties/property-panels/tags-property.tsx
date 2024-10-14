import { BuilderNodeType } from "@/components/flow-builder/components/blocks/types";

import { Input } from "@/components/ui/input";

import { useMemo } from "react";
import { TagsNodeData } from "../../../../nodes/tags-node/tags.node";
import { TagsCombobox } from "@/components/flow-builder/components/ui/tags-combobox";

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
        <div className="flex justify-between">
          <div className="text-xs text-card-foreground/60 font-semibold">
            Tags
          </div>
          <p className="text-xs text-card-foreground/60">Max. 5 tags</p>
        </div>

        <TagsCombobox
          value={currentTagsDetail}
          onValueChange={(t) => updateData({ tags: t })}
          maxItems={5}
        />
      </div>
    </div>
  );
}

import { BuilderNodeType } from "@/components/flow-builder/components/blocks/types";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { MenuNodeData } from "../../../../nodes/menu-node/menu.node";
import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { produce } from "immer";

type MenuNodePropertyPanelProps = Readonly<{
  id: string;
  type: BuilderNodeType;
  data: MenuNodeData;
  updateData: (data: Partial<MenuNodeData>) => void;
}>;

export default function MenuNodePropertyPanel({
  id,
  data,
  updateData,
}: MenuNodePropertyPanelProps) {
  const { setNodes, setEdges } = useReactFlow();

  const removeNodePath = useCallback(
    (pathId: string) => {
      setNodes((nodes) =>
        produce(nodes, (draft) => {
          const node = draft.find((n) => n.id === id);

          if (node) {
            const options = node.data.options as MenuNodeData["options"];
            const pathIndex = options.findIndex((p) => p.id === pathId);
            options.splice(pathIndex, 1);
          }
        })
      );

      setEdges((edges) => edges.filter((edge) => edge.sourceHandle !== pathId));
    },
    [id, setEdges, setNodes]
  );

  return (
    <div className="flex flex-col gap-4 p-4">
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

      <div className="flex flex-col">
        <div className="text-xs text-card-foreground/60 font-semibold">
          Question
        </div>

        <div className="mt-2 flex">
          <Textarea
            rows={5}
            value={data.question?.message}
            onChange={(e) => updateData({ message: e.target.value })}
            placeholder="Type your message here..."
            className="min-h-32 w-full resize-none "
          />
        </div>
      </div>
    </div>
  );
}

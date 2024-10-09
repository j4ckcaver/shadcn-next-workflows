import { type Node, type NodeProps, Position } from "@xyflow/react";
import { nanoid } from "nanoid";
import { memo, useMemo, useState } from "react";
import { BaseNodeData, BuilderNode, RegisterNodeMetadata } from "../types";
import { getNodeDetail } from "../utils";
import CustomHandle from "../../components/handles/custom-handler";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/lucide-icon";
import { icons } from "lucide-react";

export interface EndNodeData extends BaseNodeData {
  label?: string;
}

const NODE_TYPE = BuilderNode.END;

type EndNodeProps = NodeProps<Node<EndNodeData, typeof NODE_TYPE>>;

export function EndNode({ data, selected, isConnectable }: EndNodeProps) {
  const meta = useMemo(() => getNodeDetail(NODE_TYPE), []);

  const [sourceHandleId] = useState<string>(nanoid());

  return (
    <>
      <div
        data-selected={selected}
        data-deletable={false}
        className="flex items-center border border-zinc-700 rounded-full bg-zinc-800 px-4 py-2 shadow-sm transition data-[selected=true]:border-orange-600"
      >
        <Icon
          name={meta.icon as keyof typeof icons}
          className={"size-4 shrink-0 mr-2 scale-130"}
        />

        <span className="mr-1">{data.label || meta.title}</span>
      </div>

      <CustomHandle
        type="target"
        id={sourceHandleId}
        position={Position.Left}
        isConnectable={isConnectable}
      />
    </>
  );
}

export const metadata: RegisterNodeMetadata<EndNodeData> = {
  type: NODE_TYPE,
  node: memo(EndNode),
  detail: {
    icon: "Square",
    title: "End",
    description: "End the chatbot flow",
  },
  connection: {
    inputs: 1,
    outputs: 0,
  },
  available: false,
  defaultData: {
    label: "End",
    deletable: false,
  },
};

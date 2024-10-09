import { type Node, type NodeProps, Position } from "@xyflow/react";
import { nanoid } from "nanoid";
import { memo, useMemo, useState } from "react";
import { BaseNodeData, BuilderNode, RegisterNodeMetadata } from "../types";
import { getNodeDetail } from "../utils";
import CustomHandle from "../../components/handles/custom-handler";
import Icon from "@/components/ui/lucide-icon";
import { icons } from "lucide-react";

export interface StartNodeData extends BaseNodeData {
  label?: string;
}

const NODE_TYPE = BuilderNode.START;

export type StartNodeProps = NodeProps<Node<StartNodeData, typeof NODE_TYPE>>;

export function StartNode({ data, selected, isConnectable }: StartNodeProps) {
  const meta = useMemo(() => getNodeDetail(NODE_TYPE), []);

  const [sourceHandleId] = useState<string>(nanoid());

  return (
    <>
      <div
        data-selected={selected}
        className="flex items-center border border-zinc-700 rounded-full bg-zinc-800 px-4 py-2 shadow-sm transition data-[selected=true]:border-orange-600"
      >
        <Icon
          name={meta.icon as keyof typeof icons}
          className={"size-4 shrink-0 mr-2 scale-130"}
        />

        <span className="mr-1">{data.label || meta.title}</span>
      </div>

      <CustomHandle
        type="source"
        id={sourceHandleId}
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </>
  );
}

export const metadata: RegisterNodeMetadata<StartNodeData> = {
  type: NODE_TYPE,
  node: memo(StartNode),
  detail: {
    icon: "Play",
    title: "Start",
    description: "Start the chatbot flow",
  },
  connection: {
    inputs: 0,
    outputs: 1,
  },
  available: false,
  defaultData: {
    label: "Start",
    deletable: false,
  },
};

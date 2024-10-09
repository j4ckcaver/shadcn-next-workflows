import {
  AVAILABLE_NODES,
  NODES_METADATA,
} from "@/components/flow-builder/nodes";
import { BuilderNodeType } from "@/components/flow-builder/nodes/types";
import Icon from "@/components/ui/lucide-icon";
import { icons } from "lucide-react";

type NodeListProps = Readonly<{
  nodes: Array<
    (typeof AVAILABLE_NODES)[number] & {
      __meta: (typeof NODES_METADATA)[BuilderNodeType];
      __enabled: boolean;
    }
  >;
  onNodeAdd: (type: BuilderNodeType) => void;
}>;

export default function NodeList({ nodes, onNodeAdd }: NodeListProps) {
  return (
    <div className="flex flex-col gap-y-0.5 p-1">
      {nodes.map((node) => (
        <button
          onClick={() => {
            onNodeAdd(node.type);
          }}
          type="button"
          disabled={!node.__enabled}
          key={node.type}
          className="flex items-center rounded-xl bg-transparent p-1 transition disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-20 active:bg-zinc-700/40 hover:bg-zinc-700"
        >
          <div className="size-7 flex shrink-0 items-center justify-center border border-zinc-600/60 rounded-lg bg-zinc-700">
            <Icon
              name={node.icon as keyof typeof icons}
              className={"size-4 text-white"}
            />
          </div>

          <div className="ml-2 text-sm text-zinc-400">{node.title}</div>
        </button>
      ))}
    </div>
  );
}

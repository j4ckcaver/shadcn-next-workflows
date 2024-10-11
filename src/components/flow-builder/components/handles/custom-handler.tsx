import { cn } from "@/lib/utils";
import {
  type Edge,
  Handle,
  type HandleProps,
  type InternalNode,
  type Node,
  getConnectedEdges,
  useNodeId,
  useStore,
} from "@xyflow/react";
import { useMemo } from "react";

type CustomHandleProps = Readonly<
  Omit<HandleProps, "isConnectable"> & {
    isConnectable:
      | boolean
      | number
      | undefined
      | ((value: {
          node: InternalNode<Node>;
          connectedEdges: Edge[];
        }) => boolean);
  }
>;

export default function CustomHandle({
  className,
  isConnectable,
  ...props
}: CustomHandleProps) {
  const { nodeLookup, edges } = useStore(({ nodeLookup, edges }) => ({
    nodeLookup,
    edges,
  }));
  const nodeId = useNodeId();

  const isHandleConnectable = useMemo<boolean | undefined>(() => {
    if (!nodeId) return false;

    const node = nodeLookup.get(nodeId);
    if (!node) return false;

    const connectedEdges = getConnectedEdges([node], edges);

    if (typeof isConnectable === "function")
      return isConnectable({ node, connectedEdges });

    if (typeof isConnectable === "number")
      return connectedEdges.length < isConnectable;

    return isConnectable;
  }, [edges, isConnectable, nodeId, nodeLookup]);

  return (
    <Handle
      className={cn(
        "hover:!ring-2 hover:ring-primary/50",
        "!size-3 border-1.25 border-card-foreground/10 transition bg-card shadow-sm",
        className
      )}
      isConnectable={isHandleConnectable}
      {...props}
    />
  );
}

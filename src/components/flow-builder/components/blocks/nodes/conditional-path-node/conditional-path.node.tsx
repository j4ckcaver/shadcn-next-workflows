import {
  type Node,
  type NodeProps,
  Position,
  useReactFlow,
} from "@xyflow/react";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { memo, useCallback, useMemo, useState } from "react";
import { BaseNodeData, BuilderNode, RegisterNodeMetadata } from "../../types";
import { getNodeDetail } from "../../utils";
import { useDeleteNode } from "@/hooks/use-delete-node";
import { ConditionDropdownSelector } from "./components/condition-dropdown-selector";
import CustomHandle from "../../../handles/custom-handler";
import { NodePath } from "./components/node-path";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  NodeCard,
  NodeCardContent,
  NodeCardDescription,
  NodeCardFooter,
  NodeCardHeader,
} from "@flow-builder-ui/node-card";
import { useFlowStore } from "@/stores/flow-store";
import { useShallow } from "zustand/shallow";

const caseList = [
  { id: nanoid(), value: "Allowed" },
  { id: nanoid(), value: "Denied" },
  { id: nanoid(), value: "Pending" },
  { id: nanoid(), value: "Approved" },
  { id: nanoid(), value: "Rejected" },
  { id: nanoid(), value: "Cancelled" },
  { id: nanoid(), value: "Completed" },
  { id: nanoid(), value: "Failed" },
];

const NODE_TYPE = BuilderNode.CONDITIONAL_PATH;

export interface ConditionalPathNodeData extends BaseNodeData {
  condition: {
    id: string;
    condition: string;
  } | null;
  paths: { id: string; case: { id: string; value: string } }[];
}

type ConditionalPathNodeProps = NodeProps<
  Node<ConditionalPathNodeData, typeof NODE_TYPE>
>;

export function ConditionalPathNode({
  id,
  isConnectable,
  selected,
  data,
}: ConditionalPathNodeProps) {
  const meta = useMemo(() => getNodeDetail(NODE_TYPE), []);

  const [showNodePropertiesOf] = useFlowStore(
    useShallow((s) => [s.actions.sidebar.showNodePropertiesOf])
  );
  const [sourceHandleId] = useState<string>(nanoid());

  const { setNodes, setEdges } = useReactFlow();
  const deleteNode = useDeleteNode();

  const onConditionChange = useCallback(
    (value: { id: string; condition: string } | null) => {
      setNodes((nodes) =>
        produce(nodes, (draft) => {
          const node = draft.find((n) => n.id === id);

          if (node) node.data.condition = value;
        })
      );
    },
    [id, setNodes]
  );

  const filteredCaseList = useMemo<
    Omit<ConditionalPathNodeData["paths"][number], "id">["case"][]
  >(() => {
    return caseList.filter(
      (c) => !data.paths.some((p) => p.case.value === c.value)
    );
  }, [data.paths]);

  const addNodePath = useCallback(
    (path: { id: string; value: string }) => {
      setNodes((nodes) =>
        produce(nodes, (draft) => {
          const node = draft.find((n) => n.id === id);

          if (node) {
            (node.data.paths as ConditionalPathNodeData["paths"]).push({
              id: nanoid(),
              case: path,
            });
          }
        })
      );
    },
    [id, setNodes]
  );

  const removeNodePath = useCallback(
    (pathId: string) => {
      setNodes((nodes) =>
        produce(nodes, (draft) => {
          const node = draft.find((n) => n.id === id);

          if (node) {
            const paths = node.data.paths as ConditionalPathNodeData["paths"];
            const pathIndex = paths.findIndex((p) => p.id === pathId);
            paths.splice(pathIndex, 1);
          }
        })
      );

      setEdges((edges) => edges.filter((edge) => edge.sourceHandle !== pathId));
    },
    [id, setEdges, setNodes]
  );

  const handleDeleteNode = () => {
    deleteNode(id);
  };

  const handleShowNodeProperties = useCallback(() => {
    showNodePropertiesOf({ id, type: NODE_TYPE });
  }, [id, showNodePropertiesOf]);

  return (
    <>
      <NodeCard
        data-selected={selected}
        onDoubleClick={handleShowNodeProperties}
      >
        <NodeCardHeader
          icon={meta.icon}
          title={meta.title}
          handleDeleteNode={handleDeleteNode}
          handleShowNodeProperties={handleShowNodeProperties}
          gradientColor={meta.gradientColor}
        />

        <NodeCardContent>
          <div className="relative min-h-10 flex flex-col">
            <div className="flex flex-col p-4">
              <div className="text-xs text-light-900/50 font-medium">
                Condition Attribute
              </div>

              <div className="mt-2 flex">
                <ConditionDropdownSelector
                  value={data.condition}
                  onChange={onConditionChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col p-4">
            <div className="text-xs text-light-900/50 font-medium">
              Paths to Follow
            </div>

            {data.paths.length > 0 && (
              <div className="mt-2 flex flex-col">
                {data.paths.map((path) => (
                  <NodePath
                    key={path.id}
                    id={path.id}
                    path={path.case}
                    onRemove={(_id) => removeNodePath(_id)}
                    isConnectable={isConnectable}
                  />
                ))}
              </div>
            )}

            {filteredCaseList.length > 0 && (
              <div className="mt-2 flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="h-8 w-full flex items-center justify-center border border-dark-50 rounded-md bg-dark-300 px-2.5 outline-none transition active:(border-dark-200 bg-dark-400/50)"
                    >
                      <div className="flex items-center">
                        <div className="text-xs font-medium leading-none tracking-wide">
                          Add Path
                        </div>
                      </div>

                      <div className="i-lucide:plus ml-1 size-4.5 text-white op-50" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    sideOffset={5}
                    className={cn(
                      "min-w-40 select-none border border-dark-100 rounded-lg bg-dark-200/90 p-0.5 text-light-50 shadow-xl backdrop-blur-lg transition",
                      "animate-in data-[side=top]:slide-in-bottom-0.5 data-[side=bottom]:slide-in-bottom--0.5 data-[side=bottom]:fade-in-40 data-[side=top]:fade-in-40"
                    )}
                  >
                    {filteredCaseList.map((path) => (
                      <DropdownMenuItem
                        key={path.id}
                        className="h-8 flex cursor-pointer items-center border border-transparent rounded-lg p-1.5 pr-6 outline-none transition active:(border-dark-100 bg-dark-300) hover:bg-dark-100"
                        onSelect={() =>
                          addNodePath({ id: path.id, value: path.value })
                        }
                      >
                        <div className="flex items-center gap-x-2">
                          <div className="text-xs font-medium leading-none tracking-wide">
                            {path.value}
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          <NodeCardDescription
            description="This is a dummy conditional path node. Has no functionality for
                matching conditions."
          />
          <NodeCardFooter nodeId={id} />
        </NodeCardContent>
      </NodeCard>
      <CustomHandle
        type="target"
        id={sourceHandleId}
        position={Position.Left}
        isConnectable={isConnectable}
        className="top-6! hover:!ring-2 hover:!ring-primary/50"
      />
    </>
  );
}

export const metadata: RegisterNodeMetadata<ConditionalPathNodeData> = {
  type: NODE_TYPE,
  node: memo(ConditionalPathNode),
  detail: {
    icon: "mynaui:git-branch",
    title: "Conditional Path",
    description:
      "Check a condition and take different paths based on the result.",
    gradientColor: "blue",
  },
  connection: {
    inputs: 1,
    outputs: 0,
  },
  defaultData: {
    condition: null,
    paths: [],
  },
};

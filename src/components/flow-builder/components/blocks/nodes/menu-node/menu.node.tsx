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
import CustomHandle from "../../../handles/custom-handler";
import { NodeOption } from "./components/node-option";

import {
  NodeCard,
  NodeCardContent,
  NodeCardDescription,
  NodeCardFooter,
  NodeCardHeader,
} from "@flow-builder-ui/node-card";
import { useFlowStore } from "@/stores/flow-store";
import { useShallow } from "zustand/shallow";
import { isEmpty } from "lodash";

const NODE_TYPE = BuilderNode.MENU;

export interface MenuNodeData extends BaseNodeData {
  condition: {
    id: string;
    condition: string;
  } | null;
  options: { id: string; case: { id: string; value: string } }[];
}

type MenuNodeProps = NodeProps<Node<MenuNodeData, typeof NODE_TYPE>>;

export function MenuNode({ id, isConnectable, selected, data }: MenuNodeProps) {
  const meta = useMemo(() => getNodeDetail(NODE_TYPE), []);

  const [showNodePropertiesOf] = useFlowStore(
    useShallow((s) => [s.actions.sidebar.showNodePropertiesOf])
  );
  const [sourceHandleId] = useState<string>(nanoid());

  const { setNodes, setEdges } = useReactFlow();
  const deleteNode = useDeleteNode();

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
          <div className=" min-h-10 flex flex-col">
            <div className="flex flex-col p-4">
              <div className="text-xs font-medium text-card-foreground">
                Question
              </div>

              <div className="line-clamp-4 mt-2 text-sm leading-snug">
                {isEmpty(data.message) ? (
                  <span className="text-card-foreground italic">
                    Choose an option:
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-col p-4">
            <div className="text-xs text-light-900/50 font-medium">Options</div>

            {data.options.length > 0 && (
              <div className="mt-2 flex flex-col relative">
                {data.options.map((path) => (
                  <NodeOption
                    key={path.id}
                    id={path.id}
                    path={path.case}
                    onRemove={(_id) => removeNodePath(_id)}
                    isConnectable={isConnectable}
                  />
                ))}
              </div>
            )}
          </div>

          <NodeCardDescription description="Options to choose from." />
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

export const metadata: RegisterNodeMetadata<MenuNodeData> = {
  type: NODE_TYPE,
  node: memo(MenuNode),
  detail: {
    icon: "f7:menu",
    title: "Menu",
    description:
      "Send options to the user choosing one of them based on the condition.",
    gradientColor: "fuchsia",
  },
  connection: {
    inputs: 1,
    outputs: 0,
  },
  defaultData: {
    condition: null,
    options: [
      {
        id: nanoid(),
        case: {
          id: nanoid(),
          value: "Option 1",
        },
      },
      {
        id: nanoid(),
        case: {
          id: nanoid(),
          value: "Option 2",
        },
      },
    ],
  },
};

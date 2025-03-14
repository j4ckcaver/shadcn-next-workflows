"use client";

import {
  Background,
  type EdgeTypes,
  type NodeChange,
  ReactFlow,
  useReactFlow,
  SelectionMode,
} from "@xyflow/react";
import { useCallback } from "react";
import { useDeleteKeyCode } from "@/hooks/use-delete-key-code";
import { useOnNodesDelete } from "@/hooks/use-on-nodes-delete";
import { useNodeAutoAdjust } from "@/hooks/use-node-auto-adjust";
import CustomDeletableEdge from "./components/edges/custom-deletable-edge";
import { useAddNodeOnEdgeDrop } from "@/hooks/use-add-node-on-edge-drop";
import { useDragDropFlowBuilder } from "@/hooks/use-drag-drop-flow-builder";
import { useIsValidConnection } from "@/hooks/use-is-valid-connection";
import CustomControls from "./components/controls/custom-controls";
import { cn } from "@/lib/utils";
import AddNodeFloatingMenu from "./components/add-node-floating-menu/add-node-floating-menu";
import { useFlowStore } from "@/stores/flow-store";
import { useShallow } from "zustand/shallow";
import { NODE_TYPES } from "./components/blocks";
import { BuilderNode } from "./components/blocks/types";
import { Card } from "../ui/card";
import { SaveFlowButton } from "./components/ui/save-flow-buttom";
import { ModeToggle } from "../ui/button-theme-toggle";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { FlowContextMenu } from "./components/context-menu/flow-context-menu";

const edgeTypes: EdgeTypes = {
  deletable: CustomDeletableEdge,
};

export const FlowBuilder = () => {
  const router = useRouter();
  const [
    name,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    deleteNode,
    deleteEdge
  ] = useFlowStore(
    useShallow((s) => [
      s.workflow.name,
      s.workflow.nodes,
      s.workflow.edges,
      s.actions.nodes.onNodesChange,
      s.actions.edges.onEdgesChange,
      s.actions.edges.onConnect,
      s.actions.nodes.deleteNode,
      s.actions.edges.deleteEdge,
    ])
  );
  const { getNodes } = useReactFlow();

  const {
    handleOnEdgeDropConnectEnd,
    floatingMenuWrapperRef,
    handleAddConnectedNode,
  } = useAddNodeOnEdgeDrop();

  const deleteKeyCode = useDeleteKeyCode();
  const onNodesDelete = useOnNodesDelete(nodes);

  const [onDragOver, onDrop] = useDragDropFlowBuilder();
  const isValidConnection = useIsValidConnection(nodes, edges);

  const autoAdjustNode = useNodeAutoAdjust();

  const handleAutoAdjustNodeAfterNodeMeasured = useCallback(
    (id: string) => {
      setTimeout(() => {
        const node = getNodes().find((n) => n.id === id);
        if (!node) {
          return;
        }

        if (node.measured === undefined) {
          handleAutoAdjustNodeAfterNodeMeasured(id);
          return;
        }

        autoAdjustNode(node);
      });
    },
    [autoAdjustNode, getNodes]
  );

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const filteredChanges = changes.map(change => {
        if (change.type === 'select') {
          const node = nodes.find(n => n.id === change.id);
          if (node && (node.type === BuilderNode.START || node.type === BuilderNode.END)) {
            return { ...change, selected: false };
          }
        }
        return change;
      });

      filteredChanges.forEach((change) => {
        if (change.type === "dimensions") {
          const node = getNodes().find((n) => n.id === change.id);
          if (node) {
            autoAdjustNode(node);
          }
        }

        if (change.type === "add") {
          handleAutoAdjustNodeAfterNodeMeasured(change.item.id);
        }
      });
      onNodesChange(filteredChanges);
    },
    [
      autoAdjustNode,
      getNodes,
      handleAutoAdjustNodeAfterNodeMeasured,
      onNodesChange,
      nodes,
    ]
  );

  const handleDeleteElements = useCallback(() => {
    const selectedNodes = nodes.filter(
      (node) => 
        node.selected && 
        node.type !== BuilderNode.START && 
        node.type !== BuilderNode.END
    );
    const selectedEdges = edges.filter((edge) => edge.selected);
    
    selectedNodes.forEach((node) => deleteNode(node));
    selectedEdges.forEach((edge) => deleteEdge(edge));
  }, [nodes, edges, deleteNode, deleteEdge]);

  return (
    <>
      <Card className=" h-14 border-0  from-primary/40 p-2 to-transparent rounded-none w-full  items-center flex justify-between border-b ">
        <div className="inline-flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground font-bold"
            onClick={() => router.back()}
          >
            <Icon
              icon="mdi:chevron-left"
              className="size-6 text-card-foreground"
            />
          </Button>
          <h1 className="text-card-foreground font-bold">{name}</h1>
        </div>

        {name !== "" && <div className="inline-flex items-center gap-2">
          <ModeToggle />
          <SaveFlowButton />
        </div>}

      </Card>
      <div className="relative w-full h-[94vh]">
        <FlowContextMenu>
          <ReactFlow
            proOptions={{ hideAttribution: true }}
            onInit={({ fitView }) => fitView().then()}
            nodeTypes={NODE_TYPES}
            nodes={nodes}
            onNodesChange={handleNodesChange}
            edgeTypes={edgeTypes}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectEnd={handleOnEdgeDropConnectEnd}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeDragStop={(_, node) => {
              autoAdjustNode(node);
            }}
            onNodesDelete={handleDeleteElements}
            isValidConnection={isValidConnection}
            selectionMode={SelectionMode.Full}
            multiSelectionKeyCode="Control"
            selectionOnDrag={true}
            selectionKeyCode={null}
            deleteKeyCode={deleteKeyCode}
            snapGrid={[16, 16]}
            snapToGrid
            fitView
          >
            <Background gap={24} />
            <CustomControls />
          </ReactFlow>
        </FlowContextMenu>
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 backdrop-blur-3xl transition-all",
          "opacity-0 bg-zinc-800/0 backdrop-saturate-100 pointer-events-none"
        )}
      >
        <div ref={floatingMenuWrapperRef} className="relative size-full">
          <AddNodeFloatingMenu onNodeAdd={handleAddConnectedNode} />
        </div>
      </div>
    </>
  );
};

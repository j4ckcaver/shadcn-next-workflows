import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { AVAILABLE_NODES } from "../blocks";
import { useInsertNode } from "@/hooks/use-insert-node";
import { useCallback, useEffect, useState } from "react";
import { BuilderNode, BuilderNodeType } from "../blocks/types";
import { Icon } from "@iconify/react";
import { useReactFlow, useViewport, Node } from "@xyflow/react";
import { useFlowStore } from "@/stores/flow-store";
import { useShallow } from "zustand/shallow";
import { toast } from "sonner";

interface FlowContextMenuProps {
  children: React.ReactNode;
}

export function FlowContextMenu({ children }: FlowContextMenuProps) {
  const insertNode = useInsertNode();
  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();
  const viewport = useViewport();
  const [deleteNode, deleteEdge, showNodeProperties] = useFlowStore(
    useShallow((s) => [
      s.actions.nodes.deleteNode, 
      s.actions.edges.deleteEdge,
      s.actions.sidebar.showNodePropertiesOf
    ])
  );
  const [copiedNode, setCopiedNode] = useState<Node | null>(null);
  const [contextMenuType, setContextMenuType] = useState<'canvas' | 'node'>('canvas');
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [menuKey, setMenuKey] = useState(0);

  const handleAddNode = useCallback(
    (type: BuilderNodeType, event: { clientX: number; clientY: number }) => {
      const rect = document.querySelector('.react-flow')?.getBoundingClientRect();
      if (rect) {
        const position = {
          x: (event.clientX - rect.left - viewport.x - 150) / viewport.zoom,
          y: (event.clientY - rect.top - viewport.y) / viewport.zoom,
        };
        insertNode(type, position);
      }
    },
    [insertNode, viewport]
  );

  const getSelectedNodes = useCallback(() => {
    return getNodes().filter(
      (node) => 
        node.selected && 
        node.type !== BuilderNode.START && 
        node.type !== BuilderNode.END
    );
  }, [getNodes]);

  const handleDeleteSelected = useCallback(() => {
    const selectedNodes = getSelectedNodes();
    const selectedEdges = getEdges().filter((edge) => edge.selected);
    
    selectedNodes.forEach((node) => deleteNode(node));
    selectedEdges.forEach((edge) => deleteEdge(edge));
  }, [getEdges, deleteNode, deleteEdge, getSelectedNodes]);

  const handleSelectAll = useCallback(() => {
    setNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        selected: node.type !== BuilderNode.START && node.type !== BuilderNode.END
      }))
    );
    setEdges((edges) =>
      edges.map((edge) => ({ ...edge, selected: true }))
    );
  }, [setNodes, setEdges]);

  const handleCopyNode = useCallback(() => {
    if (selectedNode) {
      setCopiedNode(selectedNode);
      toast.success("Node copied", {
        description: "Press Ctrl+V to paste the node",
        dismissible: true,
      });
    }
  }, [selectedNode]);

  const handlePasteNode = useCallback((event: { clientX: number; clientY: number }) => {
    if (copiedNode) {
      const rect = document.querySelector('.react-flow')?.getBoundingClientRect();
      if (rect) {
        const position = {
          x: (event.clientX - rect.left - viewport.x) / viewport.zoom,
          y: (event.clientY - rect.top - viewport.y) / viewport.zoom,
        };
        insertNode(copiedNode.type as BuilderNodeType, position);
      }
    }
  }, [copiedNode, insertNode, viewport]);

  const handleDuplicateNode = useCallback(() => {
    if (selectedNode) {
      const offset = 50;
      const position = {
        x: selectedNode.position.x + offset,
        y: selectedNode.position.y + offset,
      };
      insertNode(selectedNode.type as BuilderNodeType, position);
      toast.success("Node duplicated");
    }
  }, [selectedNode, insertNode]);

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const nodeElement = target.closest('.react-flow__node');
    
    if (nodeElement) {
      const nodeId = nodeElement.getAttribute('data-id');
      const node = getNodes().find(n => n.id === nodeId);
      if (node?.type !== BuilderNode.START && node?.type !== BuilderNode.END) {
        setContextMenuType('node');
        setSelectedNode(node || null);
      } else {
        setContextMenuType('canvas');
        setSelectedNode(null);
      }
    } else {
      setContextMenuType('canvas');
      setSelectedNode(null);
      setMenuKey(prev => prev + 1);
    }
  }, [getNodes]);

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setSelectedNode(null);
      setContextMenuType('canvas');
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete') {
        handleDeleteSelected();
      }
      
      if (event.key === 'a' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        if (getNodes().length > 2) {
          handleSelectAll();
        }
      }

      if (event.key === 'c' && (event.ctrlKey || event.metaKey) && selectedNode) {
        event.preventDefault();
        handleCopyNode();
      }

      if (event.key === 'd' && (event.ctrlKey || event.metaKey) && selectedNode) {
        event.preventDefault();
        handleDuplicateNode();
      }

      if (event.key === 'v' && (event.ctrlKey || event.metaKey) && copiedNode) {
        event.preventDefault();
        const rect = document.querySelector('.react-flow')?.getBoundingClientRect();
        if (rect) {
          const center = {
            clientX: rect.left + rect.width / 2,
            clientY: rect.top + rect.height / 2,
          };
          handlePasteNode(center);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDeleteSelected, handleSelectAll, handleCopyNode, handlePasteNode, handleDuplicateNode, selectedNode, copiedNode, getNodes]);

  const selectedCount = getSelectedNodes().length;
  const canSelectAll = getNodes().length > 2;

  return (
    <ContextMenu key={menuKey} onOpenChange={handleOpenChange}>
      <ContextMenuTrigger asChild>
        <div 
          className="flex h-full w-full"
          onContextMenu={handleContextMenu}
        >
          {children}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        {contextMenuType === 'canvas' ? (
          <>
            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <Icon icon="mynaui:plus" className="mr-2 h-4 w-4" />
                Add Node
              </ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-48">
                {AVAILABLE_NODES.map((node) => (
                  <ContextMenuItem
                    key={node.type}
                    onSelect={(e: any) => {
                      const event = e.target.ownerDocument.defaultView.event;
                      handleAddNode(node.type as BuilderNodeType, { 
                        clientX: event.clientX, 
                        clientY: event.clientY 
                      });
                    }}
                  >
                    <Icon icon={node.icon} className="mr-2 h-4 w-4" />
                    {node.title}
                  </ContextMenuItem>
                ))}
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuItem 
              onSelect={handleSelectAll}
              disabled={!canSelectAll}
            >
              <Icon icon="mynaui:select-all" className="mr-2 h-4 w-4" />
              Select All
              <span className="ml-auto text-xs text-muted-foreground">Ctrl+A</span>
            </ContextMenuItem>
            {copiedNode && (
              <ContextMenuItem
                onSelect={(e: any) => {
                  const event = e.target.ownerDocument.defaultView.event;
                  handlePasteNode({ 
                    clientX: event.clientX, 
                    clientY: event.clientY 
                  });
                }}
              >
                <Icon icon="mynaui:paste" className="mr-2 h-4 w-4" />
                Paste Node
                <span className="ml-auto text-xs text-muted-foreground">Ctrl+V</span>
              </ContextMenuItem>
            )}
          </>
        ) : (
          <>
            <ContextMenuItem onSelect={() => selectedNode && showNodeProperties({ id: selectedNode.id, type: selectedNode.type as BuilderNodeType })}>
              <Icon icon="mynaui:settings" className="mr-2 h-4 w-4" />
              Open Settings
              <span className="ml-auto inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Icon icon="mynaui:settings" className="h-3 w-3" />
                Alt+O
              </span>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onSelect={handleCopyNode}>
              <Icon icon="mynaui:copy" className="mr-2 h-4 w-4" />
              Copy Node
              <span className="ml-auto text-xs text-muted-foreground">Ctrl+C</span>
            </ContextMenuItem>
            <ContextMenuItem onSelect={handleDuplicateNode}>
              <Icon icon="ph:copy-simple-duotone" className="mr-2 h-4 w-4" />
              Duplicate Node
              <span className="ml-auto text-xs text-muted-foreground">Ctrl+D</span>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onSelect={handleDeleteSelected} className="text-red-600">
              <Icon icon="mynaui:trash" className="mr-2 h-4 w-4" />
              Delete {selectedCount > 1 ? `${selectedCount} Nodes` : 'Node'}
              <span className="ml-auto text-xs text-muted-foreground">Del</span>
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
} 
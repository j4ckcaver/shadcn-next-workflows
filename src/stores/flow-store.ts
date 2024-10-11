import { BuilderNodeType } from "@/components/flow-builder/components/blocks/types";
import { defaultEdges, defaultNodes } from "@/contants/default-nodes-edges";
import { nanoid } from "nanoid";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from "@xyflow/react";
import { create } from "zustand";

interface State {
  view: {
    mobile: boolean;
  };
  builder: {
    blurred: boolean;
  };
  nodes: Node[];
  edges: Edge[];
  sidebar: {
    active: "node-properties" | "available-nodes" | "none";
    panels: {
      nodeProperties: {
        selectedNode: { id: string; type: BuilderNodeType } | null | undefined;
      };
    };
  };
}

interface Actions {
  actions: {
    view: {
      setMobileView: (isMobile: boolean) => void;
    };
    builder: {
      setBlur: (blur: boolean) => void;
    };
    nodes: {
      onNodesChange: (changes: NodeChange[]) => void;
      setNodes: (nodes: Node[]) => void;
    };
    edges: {
      onEdgesChange: (changes: EdgeChange[]) => void;
      onConnect: (connection: Connection) => void;
      setEdges: (edges: Edge[]) => void;
    };
    sidebar: {
      setActivePanel: (
        panel: "node-properties" | "available-nodes" | "none"
      ) => void;
      showNodePropertiesOf: (node: {
        id: string;
        type: BuilderNodeType;
      }) => void;
      panels: {
        nodeProperties: {
          setSelectedNode: (
            node: { id: string; type: BuilderNodeType } | undefined | null
          ) => void;
        };
      };
    };
  };
}

interface IFlowState extends State {
  actions: Actions["actions"];
}

export const useFlowStore = create<IFlowState>()((set, get) => ({
  view: {
    mobile: false,
  },
  builder: {
    blurred: false,
  },
  edges: defaultEdges,
  nodes: defaultNodes,
  sidebar: {
    active: "none",
    panels: {
      nodeProperties: {
        selectedNode: null,
      },
    },
  },
  actions: {
    view: {
      setMobileView: (isMobile: boolean) =>
        set((state) => ({ view: { ...state.view, mobile: isMobile } })),
    },
    builder: {
      setBlur: (blur: boolean) =>
        set((state) => ({ builder: { ...state.builder, blurred: blur } })),
    },
    sidebar: {
      setActivePanel: (panel: "node-properties" | "available-nodes" | "none") =>
        set((state) => ({ sidebar: { ...state.sidebar, active: panel } })),
      showNodePropertiesOf: (node: { id: string; type: BuilderNodeType }) =>
        set((state) => ({
          sidebar: {
            ...state.sidebar,
            active: "node-properties",
            panels: {
              ...state.sidebar.panels,
              nodeProperties: {
                ...state.sidebar.panels.nodeProperties,
                selectedNode: node,
              },
            },
          },
        })),
      panels: {
        nodeProperties: {
          setSelectedNode: (
            node: { id: string; type: BuilderNodeType } | undefined | null
          ) =>
            set((state) => ({
              sidebar: {
                ...state.sidebar,
                panels: {
                  ...state.sidebar.panels,
                  nodeProperties: {
                    ...state.sidebar.panels.nodeProperties,
                    selectedNode: node,
                  },
                },
              },
            })),
        },
      },
    },
    nodes: {
      onNodesChange: (changes) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      setNodes: (nodes) => {
        set({ nodes });
      },
    },
    edges: {
      onEdgesChange: (changes) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection) => {
        const edge = { ...connection, id: nanoid(), type: "deletable" } as Edge;
        set({
          edges: addEdge(edge, get().edges),
        });
      },

      setEdges: (edges) => {
        set({ edges });
      },
    },
  },
}));

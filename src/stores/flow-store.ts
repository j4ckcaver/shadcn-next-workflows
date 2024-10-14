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
import { Tag } from "@/types/tag";

interface State {
  view: {
    mobile: boolean;
  };
  builder: {
    blurred: boolean;
  };
  nodes: Node[];
  edges: Edge[];
  tags: Tag[];
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
        tags: {
          setTags: (tags: Tag[]) => void;
          createTag: (tag: Tag) => void;
          deleteTag: (tag: Tag) => void;
          updateTag: (tag: Tag, newTag: Tag) => void;
        };
      };
    };
  };
}

interface IFlowState extends State {
  actions: Actions["actions"];
}

const TAGS = [
  {
    value: "marketing",
    label: "Marketing",
    color: "#ef4444",
  },
  {
    value: "lead",
    label: "Lead",
    color: "#eab308",
  },
  {
    value: "new",
    label: "New",
    color: "#22c55e",
  },
] satisfies Tag[];

export const useFlowStore = create<IFlowState>()((set, get) => ({
  view: {
    mobile: false,
  },
  builder: {
    blurred: false,
  },
  edges: defaultEdges,
  nodes: defaultNodes,
  tags: TAGS,
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
        tags: {
          setTags: (tags: Tag[]) => set({ tags }),
          createTag: (tag: Tag) =>
            set((state) => ({ tags: [...state.tags, tag] })),
          updateTag: (tag: Tag, newTag: Tag) =>
            set((state) => ({
              tags: state.tags.map((f) => (f.value === tag.value ? newTag : f)),
            })),
          deleteTag: (tag: Tag) =>
            set((state) => ({
              tags: state.tags.filter((f) => f.value !== tag.value),
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

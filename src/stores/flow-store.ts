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
import { produce } from "immer";

interface State {
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
    saveWorkflow: () => {
      nodes: Node[];
      edges: Edge[];
      tags: Tag[];
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

interface IFlowState {
  workflow: {
    id: string;
    name: string;
  } & State
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
  workflow: {
    id: nanoid(),
    name: "Default Workflow",
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
  },
  actions: {
    saveWorkflow: () => {
      const { workflow } = get();
      return workflow;
    },
    sidebar: {
      setActivePanel: (panel: "node-properties" | "available-nodes" | "none") =>
        set((state) => ({ workflow: { ...state.workflow, sidebar: { ...state.workflow.sidebar, active: panel } } })),
      showNodePropertiesOf: (node: { id: string; type: BuilderNodeType }) => {
        set((state) => ({
          workflow: {
            ...state.workflow,
            sidebar: {
              ...state.workflow.sidebar,
              active: "node-properties",
              panels: {
                ...state.workflow.sidebar.panels,
                nodeProperties: {
                  ...state.workflow.sidebar.panels.nodeProperties,
                  selectedNode: node,
                },
              },
            },
          }
        }));
      },
      panels: {
        nodeProperties: {
          setSelectedNode: (
            node: { id: string; type: BuilderNodeType } | undefined | null
          ) =>
            set((state) => ({
              workflow: {
                ...state.workflow,
                sidebar: {
                  ...state.workflow.sidebar,
                  panels: {
                    ...state.workflow.sidebar.panels,
                    nodeProperties: {
                      ...state.workflow.sidebar.panels.nodeProperties,
                      selectedNode: node,
                    },
                  },
                },
              }
            })),
        },
        tags: {
          setTags: (tags: Tag[]) => set({ workflow: { ...get().workflow, tags } }),
          createTag: (tag: Tag) =>
            set((state) => ({ workflow: { ...state.workflow, tags: [...state.workflow.tags, tag] } })),
          updateTag: (tag: Tag, newTag: Tag) =>
            set((state) => ({
              workflow: {
                ...state.workflow,
                tags: state.workflow.tags.map((f) =>
                  f.value === tag.value ? newTag : f
                ),
              }
            })),
          deleteTag: (tag: Tag) =>
            set((state) => ({
              workflow: {
                ...state.workflow,
                tags: state.workflow.tags.filter((f) => f.value !== tag.value),
              }
            })),
        },
      },
    },
    nodes: {
      onNodesChange: (changes) => {
        set((state) =>
          produce(state, (draft) => {
            const updatedNodes = applyNodeChanges(changes, draft.workflow.nodes);

            draft.workflow.nodes = updatedNodes;
          })
        );
      },
      setNodes: (nodes) => {
        set({ workflow: { ...get().workflow, nodes } });
      },
    },
    edges: {
      onEdgesChange: (changes) => {
        set((state) =>
          produce(state, (draft) => {
            const updatedEdges = applyEdgeChanges(changes, draft.workflow.edges);

            draft.workflow.edges = updatedEdges;
          })
        )
      },
      onConnect: (connection) => {
        const edge = { ...connection, id: nanoid(), type: "deletable" } as Edge;
        set({
          workflow: {
            ...get().workflow, edges: addEdge(edge, get().workflow.edges)
          }
        });
      },
      setEdges: (edges) => {
        set({ workflow: { ...get().workflow, edges } });
      },
    },
  },
}));

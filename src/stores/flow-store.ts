import { BuilderNodeType } from "@/components/flow-builder/components/blocks/types";
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
  sidebar: {
    active: "node-properties" | "available-nodes" | "none";
    isShowing: boolean;
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
      id: string;
      name: string;
      nodes: Node[];
      edges: Edge[];
    };
    setWorkflow: (workflow: IFlowState["workflow"]) => void;
    nodes: {
      onNodesChange: (changes: NodeChange[]) => void;
      setNodes: (nodes: Node[]) => void;
      deleteNode: (node: Node) => void;
    };
    edges: {
      onEdgesChange: (changes: EdgeChange[]) => void;
      onConnect: (connection: Connection) => void;
      setEdges: (edges: Edge[]) => void;
      deleteEdge: (edge: Edge) => void;
    };
    sidebar: {
      setShowPanel: (isShowing: boolean) => void;
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

export interface IFlowState {
  tags: Tag[];
  workflow: {
    id: string;
    name: string;
    description: string;
    status: "active" | "paused" | "draft" | "archived";

    // Zaman bilgileri
    createdAt: string;
    updatedAt: string;
    lastRunAt: string | null;
    nextRunAt: string | null;

    // Kullanıcı bilgileri
    createdBy: string;
    owner: string;

    // Versiyon bilgisi
    version: string;

    // Çalışma bilgileri
    frequency: string;
    frequencySettings?: Record<string, any>; // Özel zamanlama ayarları
    successRate: number | null;
    averageRuntime: number | null; // Milisaniye cinsinden

    // Çalıştırma durumu
    isRunning: boolean;
    progress: number;
    lastError: string | null;
    executionHistory?: Array<{
      id: string;
      startTime: string;
      endTime: string;
      status: "success" | "failure" | "cancelled";
      error?: string;
    }>;

    // İş akışı içeriği
    tags: string[];

    // Workflow önceliği
    priority?: "low" | "medium" | "high";

    // Yapılandırma
    timeout?: number; // Milisaniye cinsinden
    retryPolicy?: {
      maxAttempts: number;
      backoffMultiplier: number;
    };

    // Tetikleyiciler ve entegrasyonlar
    triggers?: Array<{
      type: string;
      config: Record<string, any>;
    }>;
    integrations?: Array<{
      type: string;
      id: string;
      config: Record<string, any>;
    }>;

    // Global değişkenler
    variables?: Record<string, any>;

    // İzinler
    permissions?: {
      viewUsers: string[];
      editUsers: string[];
    };

    isTemplate?: boolean;
  } & State; // Mevcut State tipini koruyoruz

  actions: Actions["actions"];
}

const TAGS = [] satisfies Tag[];

// Temel alanlar için öneriler:

// createdAt: Oluşturma zamanını takip etmek için updatedAt yanında bir createdAt alanı eklemek faydalı olur
// version: Workflow sürümünü takip etmek için bir versiyon numarası
// owner: Oluşturucudan farklı olarak, şu anda sorumlu kişiyi belirtmek için
// priority: Öncelik seviyesi (high, medium, low gibi)

// İş akışı izlemesi için:

// lastError: Son çalıştırmada oluşan hata bilgisi
// executionHistory: Son çalıştırmaların kısa bir geçmişi (tümü değil, son 3-5 çalıştırma)
// averageRuntime: Ortalama çalışma süresi

// İşlevsellik alanları:

// permissions: Kimler görüntüleyebilir/düzenleyebilir bilgisi
// isTemplate: Şablon olarak kullanılabilecek bir workflow mu?
// variables: Workflow içinde kullanılabilecek değişkenler
// timeout: Maksimum çalışma süresi
// retryPolicy: Başarısız olduğunda yeniden deneme stratejisi

// Entegrasyon için:

// integrations: Dış sistemlerle bağlantılar
// triggers: Manuel tetikleme dışında ne zaman çalıştırılacağı (webhook, zamanlanmış görev vb.)
// outputFormat: Çıktı formatı veya hedefi

export const useFlowStore = create<IFlowState>()((set, get) => ({
  tags: TAGS,
  workflow: {
    id: nanoid(),
    name: "",
    description: "",
    status: "draft", // draft, active, paused, archived
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "",
    owner: "", // Sorumlu kişi
    version: "1.0.0", // Sürüm takibi

    // Çalışma bilgileri
    lastRunAt: null,
    nextRunAt: null,
    frequency: "Manual", // Manual, Daily, Weekly, Monthly, Custom
    frequencySettings: {}, // Özel zamanlama ayarları
    successRate: null,
    averageRuntime: null, // Milisaniye cinsinden

    // Çalıştırma durumu
    isRunning: false,
    progress: 0,
    lastError: null,
    executionHistory: [], // Son birkaç çalıştırmanın özeti

    // İş akışı içeriği
    tags: [],
    edges: [],
    nodes: [],
    variables: {}, // Workflow içinde kullanılabilecek değişkenler

    // Yapılandırma
    priority: "medium", // low, medium, high
    timeout: 3600000, // 1 saat (ms cinsinden)
    retryPolicy: {
      maxAttempts: 3,
      backoffMultiplier: 1.5,
    },

    // Tetikleyiciler
    triggers: [
      // { type: "schedule", config: {...} },
      // { type: "webhook", config: {...} }
    ],

    // Entegrasyonlar
    integrations: [],

    // UI durum bilgisi
    sidebar: {
      active: "none",
      isShowing: true,
      panels: {
        nodeProperties: {
          selectedNode: null,
        },
      },
    },

    // İzinler
    permissions: {
      viewUsers: [],
      editUsers: [],
    },

    isTemplate: false, // Şablon olarak kullanılabilir mi?
  },
  actions: {
    saveWorkflow: () => {
      const { workflow } = get();
      set({ workflow });
      return workflow;
    },
    setWorkflow: (workflow: IFlowState["workflow"]) => {
      set((state) => ({
        workflow: {
          ...state.workflow,
          ...workflow,
        },
      }));
    },
    sidebar: {
      setShowPanel: (isShowing: boolean) =>
        set((state) => ({
          workflow: {
            ...state.workflow,
            sidebar: {
              ...state.workflow.sidebar,
              isShowing: isShowing,
            },
          },
        })),
      setActivePanel: (panel: "node-properties" | "available-nodes" | "none") =>
        set((state) => ({
          workflow: {
            ...state.workflow,
            sidebar: { ...state.workflow.sidebar, active: panel },
          },
        })),
      showNodePropertiesOf: (node: { id: string; type: BuilderNodeType }) => {
        set((state) => ({
          workflow: {
            ...state.workflow,
            sidebar: {
              ...state.workflow.sidebar,
              active: "node-properties",
              isShowing: true,
              panels: {
                ...state.workflow.sidebar.panels,
                nodeProperties: {
                  ...state.workflow.sidebar.panels.nodeProperties,
                  selectedNode: node,
                },
              },
            },
          },
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
              },
            })),
        },
        tags: {
          setTags: (tags: Tag[]) => set({ tags }),
          createTag: (tag: Tag) =>
            set((state) => ({
              tags: [...state.tags, tag],
            })),
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
        set((state) =>
          produce(state, (draft) => {
            const updatedNodes = applyNodeChanges(
              changes,
              draft.workflow.nodes
            );

            draft.workflow.nodes = updatedNodes;
          })
        );
      },
      setNodes: (nodes) => {
        set({ workflow: { ...get().workflow, nodes } });
      },
      deleteNode: (node: Node) => {
        set((state) => ({
          workflow: {
            ...state.workflow,
            nodes: state.workflow.nodes.filter((n) => n.id !== node.id),
          },
        }));
      },
    },
    edges: {
      onEdgesChange: (changes) => {
        set((state) =>
          produce(state, (draft) => {
            const updatedEdges = applyEdgeChanges(
              changes,
              draft.workflow.edges
            );

            draft.workflow.edges = updatedEdges;
          })
        );
      },
      onConnect: (connection) => {
        const edge = { ...connection, id: nanoid(), type: "deletable" } as Edge;
        set({
          workflow: {
            ...get().workflow,
            edges: addEdge(edge, get().workflow.edges),
          },
        });
      },
      setEdges: (edges) => {
        set({ workflow: { ...get().workflow, edges } });
      },
      deleteEdge: (edge: Edge) => {
        set((state) => ({
          workflow: {
            ...state.workflow,
            edges: state.workflow.edges.filter((e) => e.id !== edge.id),
          },
        }));
      },
    },
  },
}));

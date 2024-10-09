import { BuilderNodeType } from "@/components/flow-builder/nodes/types";
import { create } from "zustand";

interface State {
  view: {
    mobile: boolean;
  };
  builder: {
    blurred: boolean;
  };
  sidebar: {
    active: "node-properties" | "available-nodes" | "none";
    panels: {
      nodeProperties: {
        selectedNode: { id: string; type: BuilderNodeType } | null | undefined;
        paneSizes: (string | number)[];
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
          setPaneSizes: (sizes: (string | number)[]) => void;
        };
      };
    };
  };
}

interface IFlowState extends State {
  actions: Actions["actions"];
}

export const useFlowStore = create<IFlowState>()((set) => ({
  view: {
    mobile: false,
  },
  builder: {
    blurred: false,
  },
  sidebar: {
    active: "none",
    panels: {
      nodeProperties: {
        selectedNode: null,
        paneSizes: ["40%", "auto"],
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
          setPaneSizes: (sizes: (string | number)[]) =>
            set((state) => ({
              sidebar: {
                ...state.sidebar,
                panels: {
                  ...state.sidebar.panels,
                  nodeProperties: {
                    ...state.sidebar.panels.nodeProperties,
                    paneSizes: sizes,
                  },
                },
              },
            })),
        },
      },
    },
  },
}));

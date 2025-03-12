import type { IFlowState } from "@/stores/flow-store";

export const getWorkflows = async (): Promise<IFlowState["workflow"][]> => {
  // TODO: replace with actual data
  return [
    {
      id: "1",
      name: "Initial Workflow",
      edges: [],
      nodes: [
        {
          id: "rFM8ixvItA-i-bXblxZ_M",
          type: "start",
          position: {
            x: 0,
            y: 267,
          },
          deletable: false,
          data: {
            label: "Start",
            deletable: false,
          },

          measured: {
            width: 96,
            height: 42,
          },
        },
        {
          id: "DtJ7scXmGEA101ommJOKc",
          type: "end",
          position: {
            x: 640,
            y: 272,
          },
          deletable: false,
          data: {
            label: "End",
            deletable: true,
          },
          measured: {
            width: 90,
            height: 42,
          },
        },
      ],
      sidebar: {
        active: "available-nodes",
        isShowing: true,
        panels: {
          nodeProperties: {
            selectedNode: null,
          },
        },
      },
    },
  ];
};

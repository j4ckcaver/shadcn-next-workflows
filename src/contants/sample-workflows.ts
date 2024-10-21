export const getWorflows = async () => {
  const workflows = [
    {
      id: "WWxPnawgngqfwLthiqYuA",
      name: "Default Workflow",
      edges: [
        {
          id: "3_ZXXYSrbJOUcTgl2SECz",
          source: "dS6QyyHc7udfR5kakI2PO",
          target: "RaF-A7vIuKnIE0NVMW1vp",
          type: "deletable",
        },
        {
          id: "VceWxQhSQ4En8aJHJACSx",
          source: "dS6QyyHc7udfR5kakI2PO",
          target: "ayAYVikTMuZtpNygqOsib",
          type: "deletable",
        },
        {
          id: "D1a7uu6kEeaP7V3TchG8r",
          source: "dS6QyyHc7udfR5kakI2PO",
          target: "d_DX8VeS3P6AIsBiLigig",
          type: "deletable",
        },
        {
          id: "wgaCiSUoqnN3jWPbbxeBN",
          source: "ayAYVikTMuZtpNygqOsib",
          target: "efr_iAWzvnnBiRZ6TgxAg",
          type: "deletable",
        },
        {
          id: "GdD2bhPyvBvv76eaTQlmW",
          source: "RaF-A7vIuKnIE0NVMW1vp",
          target: "efr_iAWzvnnBiRZ6TgxAg",
          type: "deletable",
        },
      ],
      nodes: [
        {
          id: "dS6QyyHc7udfR5kakI2PO",
          type: "start",
          data: {
            label: "Start",
            deletable: false,
          },
          position: {
            x: 0,
            y: 267,
          },
          deletable: false,
          measured: {
            width: 96,
            height: 42,
          },
        },
        {
          id: "RaF-A7vIuKnIE0NVMW1vp",
          type: "text-message",
          data: {
            message:
              "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            deletable: true,
          },
          position: {
            x: 300,
            y: -140,
          },
          measured: {
            width: 288,
            height: 237,
          },
        },
        {
          id: "ayAYVikTMuZtpNygqOsib",
          type: "text-message",
          data: {
            message:
              "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            deletable: true,
          },
          position: {
            x: 300,
            y: 180,
          },
          measured: {
            width: 288,
            height: 237,
          },
        },
        {
          id: "d_DX8VeS3P6AIsBiLigig",
          type: "text-message",
          data: {
            message:
              "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            deletable: true,
          },
          position: {
            x: 300,
            y: 460,
          },
          measured: {
            width: 288,
            height: 237,
          },
        },
        {
          id: "efr_iAWzvnnBiRZ6TgxAg",
          type: "end",
          data: {
            label: "End",
            deletable: true,
          },
          position: {
            x: 800,
            y: 267,
          },
          measured: {
            width: 90,
            height: 42,
          },
        },
      ],
      tags: [
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
      ],
      sidebar: {
        active: "available-nodes",
        panels: {
          nodeProperties: {
            selectedNode: null,
          },
        },
      },
    },
    {
      id: "WWxPnawgngqfwLthiqYuA",
      name: "Default Workflow 2",
      edges: [
        {
          id: "3_ZXXYSrbJOUcTgl2SECz",
          source: "dS6QyyHc7udfR5kakI2PO",
          target: "RaF-A7vIuKnIE0NVMW1vp",
          type: "deletable",
        },
        {
          id: "KD-3Jv0pE55JhPE00X9wz",
          type: "deletable",
          target: "7AcPiwScElLyn__1TiMab",
          sourceHandle: "1vCbczeh7OyInq6-8AKAk",
          source: "RaF-A7vIuKnIE0NVMW1vp",
        },
        {
          id: "EmiEOz8TDo_7ofaie29HX",
          type: "deletable",
          target: "M2mqHdunHfpGtYGOADXL5",
          sourceHandle: "-EbqXo5CxQL8C3sX9WArS",
          source: "7AcPiwScElLyn__1TiMab",
        },
        {
          id: "GgIzkJ-AwphJTaGv9UOfk",
          type: "deletable",
          target: "-S758R2QAVkuPe4u-XWPa",
          sourceHandle: "I81L2TMA_QLw-B5jIsucg",
          source: "M2mqHdunHfpGtYGOADXL5",
        },
        {
          source: "-S758R2QAVkuPe4u-XWPa",
          sourceHandle: "Nm8031HeJmr8LccD7VKHO",
          target: "efr_iAWzvnnBiRZ6TgxAg",
          targetHandle: "LhyrM73GvXHJLTYlesvsj",
          id: "xyq2DFDoK923C20MSHvVv",
          type: "deletable",
        },
        {
          id: "oOZOIcJohUgO8QAeeMNZt",
          type: "deletable",
          target: "JLmcFnoohnxUgNS3Miw39",
          sourceHandle: "WzxNd7o2Gg1X2C3etCu6C",
          source: "7AcPiwScElLyn__1TiMab",
        },
        {
          id: "9CoO6feF_ESJGu79q9NBz",
          type: "deletable",
          target: "9DE5AkNUWIliCD0dAeE0d",
          sourceHandle: "fv6xe1dExRJsgQdAwKKqT",
          source: "JLmcFnoohnxUgNS3Miw39",
        },
        {
          source: "9DE5AkNUWIliCD0dAeE0d",
          sourceHandle: "TsZK2i0iCecZxDP86UoEi",
          target: "efr_iAWzvnnBiRZ6TgxAg",
          targetHandle: "LhyrM73GvXHJLTYlesvsj",
          id: "1029TfUJvZqO9gyeHWbIW",
          type: "deletable",
        },
        {
          id: "ch4mlrtlXUqV5kcobrfgY",
          type: "deletable",
          target: "BHlPdgQezeH_RFq9pKhwb",
          sourceHandle: "dGfJi8PzjMW7jfCjcjT-j",
          source: "7AcPiwScElLyn__1TiMab",
        },
        {
          id: "WsH_ytHR_naMZ96RQkq7B",
          type: "deletable",
          target: "M6rJt6koCCZDGqj4Y3Jl8",
          sourceHandle: "_L-PRzspxg_ZKn2AWxgBK",
          source: "BHlPdgQezeH_RFq9pKhwb",
        },
        {
          source: "M6rJt6koCCZDGqj4Y3Jl8",
          sourceHandle: "yPmgP5a4O5JVXmenxcWRe",
          target: "efr_iAWzvnnBiRZ6TgxAg",
          targetHandle: "LhyrM73GvXHJLTYlesvsj",
          id: "VABwiwDBcp_4NorrhXXAF",
          type: "deletable",
        },
      ],
      nodes: [
        {
          id: "dS6QyyHc7udfR5kakI2PO",
          type: "start",
          data: {
            label: "Start",
            deletable: false,
          },
          position: {
            x: -80,
            y: 256,
          },
          deletable: false,
          measured: {
            width: 96,
            height: 42,
          },
          selected: false,
          dragging: false,
        },
        {
          id: "RaF-A7vIuKnIE0NVMW1vp",
          type: "text-message",
          data: {
            message: "Welcome",
            deletable: true,
          },
          position: {
            x: 176,
            y: 192,
          },
          measured: {
            width: 288,
            height: 179,
          },
          selected: true,
          dragging: false,
        },
        {
          id: "efr_iAWzvnnBiRZ6TgxAg",
          type: "end",
          data: {
            label: "End",
            deletable: true,
          },
          position: {
            x: 2016,
            y: 368,
          },
          measured: {
            width: 90,
            height: 42,
          },
          selected: false,
          dragging: false,
        },
        {
          id: "7AcPiwScElLyn__1TiMab",
          type: "menu",
          data: {
            question: "Choose a option",
            options: [
              {
                id: "-EbqXo5CxQL8C3sX9WArS",
                option: {
                  id: 0,
                  value: "Option 1",
                },
              },
              {
                id: "WzxNd7o2Gg1X2C3etCu6C",
                option: {
                  id: 1,
                  value: "Option 2",
                },
              },
              {
                id: "dGfJi8PzjMW7jfCjcjT-j",
                option: {
                  id: 2,
                  value: "Option 3",
                },
              },
            ],
          },
          position: {
            x: 608,
            y: 128,
          },
          selected: false,
          measured: {
            width: 288,
            height: 348,
          },
          dragging: false,
        },
        {
          id: "M2mqHdunHfpGtYGOADXL5",
          type: "tags",
          data: {
            tags: ["option 1"],
          },
          position: {
            x: 1104,
            y: 32,
          },
          selected: false,
          measured: {
            width: 288,
            height: 186,
          },
          dragging: false,
        },
        {
          id: "-S758R2QAVkuPe4u-XWPa",
          type: "text-message",
          data: {
            message: "You choose option 1",
          },
          position: {
            x: 1520,
            y: 32,
          },
          selected: false,
          measured: {
            width: 288,
            height: 179,
          },
          dragging: false,
        },
        {
          id: "JLmcFnoohnxUgNS3Miw39",
          type: "tags",
          data: {
            tags: ["option 2"],
          },
          position: {
            x: 1120,
            y: 272,
          },
          selected: false,
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "9DE5AkNUWIliCD0dAeE0d",
          type: "text-message",
          data: {
            message: "Nice, you choose option 2",
          },
          position: {
            x: 1520,
            y: 272,
          },
          selected: false,
          measured: {
            width: 288,
            height: 179,
          },
          dragging: false,
        },
        {
          id: "BHlPdgQezeH_RFq9pKhwb",
          type: "tags",
          data: {
            tags: ["option 3"],
          },
          position: {
            x: 1120,
            y: 544,
          },
          selected: false,
          measured: {
            width: 288,
            height: 186,
          },
          dragging: false,
        },
        {
          id: "M6rJt6koCCZDGqj4Y3Jl8",
          type: "text-message",
          data: {
            message: "You choose option 3",
          },
          position: {
            x: 1520,
            y: 560,
          },
          selected: false,
          measured: {
            width: 288,
            height: 179,
          },
          dragging: false,
        },
      ],
      tags: [
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
        {
          value: "option 1",
          label: "Option 1",
          color: "#db0000",
        },
        {
          value: "option 2",
          label: "Option 2",
          color: "#1e00ff",
        },
        {
          value: "option 3",
          label: "Option 3",
          color: "#cecece",
        },
      ],
      sidebar: {
        active: "available-nodes",
        panels: {
          nodeProperties: {
            selectedNode: null,
          },
        },
      },
    },
  ];

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return workflows;
};

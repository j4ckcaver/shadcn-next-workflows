export const getWorflows = async () => {
  const workflows = [
    {
      id: "WWxPnawgngqfwLtheiqYuA",
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
      id: "WWxPnawgngsqfwLthiqYuA",
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
          source: "RaF-A7vIuKnIE0NVMW1vp",
        },
        {
          id: "EmiEOz8TDo_7ofaie29HX",
          type: "deletable",
          target: "M2mqHdunHfpGtYGOADXL5",
          source: "7AcPiwScElLyn__1TiMab",
        },
        {
          id: "GgIzkJ-AwphJTaGv9UOfk",
          type: "deletable",
          target: "-S758R2QAVkuPe4u-XWPa",
          source: "M2mqHdunHfpGtYGOADXL5",
        },
        {
          source: "-S758R2QAVkuPe4u-XWPa",
          target: "efr_iAWzvnnBiRZ6TgxAg",
          id: "xyq2DFDoK923C20MSHvVv",
          type: "deletable",
        },
        {
          id: "oOZOIcJohUgO8QAeeMNZt",
          type: "deletable",
          target: "JLmcFnoohnxUgNS3Miw39",
          source: "7AcPiwScElLyn__1TiMab",
        },
        {
          id: "9CoO6feF_ESJGu79q9NBz",
          type: "deletable",
          target: "9DE5AkNUWIliCD0dAeE0d",
          source: "JLmcFnoohnxUgNS3Miw39",
        },
        {
          source: "9DE5AkNUWIliCD0dAeE0d",
          target: "efr_iAWzvnnBiRZ6TgxAg",
          id: "1029TfUJvZqO9gyeHWbIW",
          type: "deletable",
        },
        {
          id: "ch4mlrtlXUqV5kcobrfgY",
          type: "deletable",
          target: "BHlPdgQezeH_RFq9pKhwb",
          source: "7AcPiwScElLyn__1TiMab",
        },
        {
          id: "WsH_ytHR_naMZ96RQkq7B",
          type: "deletable",
          target: "M6rJt6koCCZDGqj4Y3Jl8",
          source: "BHlPdgQezeH_RFq9pKhwb",
        },
        {
          source: "M6rJt6koCCZDGqj4Y3Jl8",
          target: "efr_iAWzvnnBiRZ6TgxAg",
          id: "VABwiwDBcp_4NorrhXXAF",
          type: "deletable",
        },
        {
          source: "RaF-A7vIuKnIE0NVMW1vp",
          target: "7AcPiwScElLyn__1TiMab",
          id: "bjFgv6z1n_JS_pEGizaAi",
          type: "deletable",
        },
        {
          source: "JLmcFnoohnxUgNS3Miw39",
          target: "9DE5AkNUWIliCD0dAeE0d",
          id: "5ykqOp3an2GX-iLn0S11L",
          type: "deletable",
        },
        {
          source: "M2mqHdunHfpGtYGOADXL5",
          target: "-S758R2QAVkuPe4u-XWPa",
          id: "VZWhW8KvDQRK7w8Blb-oO",
          type: "deletable",
        },
        {
          source: "BHlPdgQezeH_RFq9pKhwb",
          target: "M6rJt6koCCZDGqj4Y3Jl8",
          id: "klJy3Sdi_dKuPEZC3mcvs",
          type: "deletable",
        },
        {
          source: "-S758R2QAVkuPe4u-XWPa",
          target: "efr_iAWzvnnBiRZ6TgxAg",
          id: "eJpfuEoJtfFCQ78JBsNkp",
          type: "deletable",
        },
        {
          source: "9DE5AkNUWIliCD0dAeE0d",
          target: "efr_iAWzvnnBiRZ6TgxAg",
          id: "sp9cXXHK_Ht63njF3ajh8",
          type: "deletable",
        },
        {
          source: "M6rJt6koCCZDGqj4Y3Jl8",
          target: "efr_iAWzvnnBiRZ6TgxAg",
          id: "XTx_N6fDph0Zrk2LExG0b",
          type: "deletable",
        },
        {
          source: "7AcPiwScElLyn__1TiMab",
          target: "JLmcFnoohnxUgNS3Miw39",
          id: "eU2Qr2sihh8xy36LANtpl",
          type: "deletable",
        },
        {
          source: "7AcPiwScElLyn__1TiMab",
          target: "M2mqHdunHfpGtYGOADXL5",
          id: "_iU-4qZCiqq1xbrI08SbS",
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
          selected: false,
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
    {
      id: "WWxPnawgngqfwLthissqYuA",
      name: "Default Workflow 3",
      edges: [
        {
          id: "3_ZXXYSrbJOUcTgl2SECz",
          source: "dS6QyyHc7udfR5kakI2PO",
          target: "RaF-A7vIuKnIE0NVMW1vp",
          type: "deletable",
        },
        {
          source: "RaF-A7vIuKnIE0NVMW1vp",
          target: "M2mqHdunHfpGtYGOADXL5",
          id: "vfHIZpcAt9vbIHB-2pHip",
          type: "deletable",
        },
        {
          source: "dS6QyyHc7udfR5kakI2PO",
          target: "JLmcFnoohnxUgNS3Miw39",
          id: "Qz4osD9iBltaIPqXnBq_I",
          type: "deletable",
        },
        {
          id: "Oa1W70rgxNN4shNVCSfew",
          type: "deletable",
          target: "mUs0eeHWz-UANrvjOkti8",
          source: "JLmcFnoohnxUgNS3Miw39",
        },
        {
          source: "mUs0eeHWz-UANrvjOkti8",
          target: "efr_iAWzvnnBiRZ6TgxAg",
          id: "2faU_pUunBmOS-qhzJ8S0",
          type: "deletable",
        },
        {
          source: "M2mqHdunHfpGtYGOADXL5",
          target: "efr_iAWzvnnBiRZ6TgxAg",
          id: "Z3cWlOujnrvi7AxnHYzHO",
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
            x: 368,
            y: -32,
          },
          measured: {
            width: 288,
            height: 179,
          },
          selected: false,
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
          id: "mUs0eeHWz-UANrvjOkti8",
          type: "text-message",
          data: {
            message: "",
          },
          position: {
            x: 1616,
            y: 432,
          },
          selected: false,
          measured: {
            width: 288,
            height: 179,
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

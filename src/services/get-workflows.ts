import type { IFlowState } from "@/stores/flow-store";

export const getWorkflows = async (): Promise<IFlowState["workflow"][]> => {
  return [
    {
      id: "1",
      name: "Email Marketing Automation",
      description: "Send personalized emails based on customer activity",
      status: "active",
      createdAt: "2025-02-15T09:12:33",
      updatedAt: "2025-03-10T16:24:12",
      lastRunAt: "2025-03-11T14:30:00",
      nextRunAt: "2025-03-13T10:00:00",
      frequency: "Daily at 10:00",
      frequencySettings: {
        time: "10:00",
        days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      },
      successRate: 98.5,
      averageRuntime: 125000, // 2m 5s
      isRunning: false,
      progress: 0,
      lastError: null,
      executionHistory: [
        {
          id: "run-001",
          startTime: "2025-03-11T14:30:00",
          endTime: "2025-03-11T14:32:15",
          status: "success",
        },
        {
          id: "run-002",
          startTime: "2025-03-10T10:00:00",
          endTime: "2025-03-10T10:02:23",
          status: "success",
        },
        {
          id: "run-003",
          startTime: "2025-03-09T10:00:00",
          endTime: "2025-03-09T10:01:45",
          status: "success",
        },
      ],
      createdBy: "admin@company.com",
      owner: "marketing@company.com",
      version: "1.2.0",
      priority: "high",
      timeout: 600000, // 10 minutes
      retryPolicy: {
        maxAttempts: 3,
        backoffMultiplier: 1.5,
      },
      tags: ["marketing", "email", "automation"],
      variables: {
        emailSubject: "Weekly Newsletter",
        emailSender: "marketing@company.com",
        customerSegments: ["active", "new", "vip"],
      },
      isTemplate: false,
      permissions: {
        viewUsers: ["team@company.com", "analytics@company.com"],
        editUsers: ["admin@company.com", "marketing@company.com"],
      },
      edges: [
        {
          id: "27Uqm_guQgYOw81_ibdSu",
          source: "rFM8ixvItA-i-bXblxZ_M",
          target: "nESW80juDe8b5bB_tbmSc",
          type: "deletable",
        },
        {
          id: "aiMB_q-I713SLcttfM6PS",
          source: "nESW80juDe8b5bB_tbmSc",
          target: "5zne5FShP-jUCF1s7823h",
          type: "deletable",
        },
        {
          id: "gqnkF2AYRxqf8QUiZHuyr",
          source: "5zne5FShP-jUCF1s7823h",
          target: "8p15_Y66luCEbFS_J7vcO",
          type: "deletable",
        },
        {
          id: "AKIsmctF2xPTVcEGZgwBn",
          source: "8p15_Y66luCEbFS_J7vcO",
          target: "DtJ7scXmGEA101ommJOKc",
          type: "deletable",
        },
        {
          id: "wEgmkVqjI5s2VH32FIMvX",
          source: "nESW80juDe8b5bB_tbmSc",
          target: "9BP0qBxoQ70DKRq8gC1GX",
          type: "deletable",
        },
        {
          id: "VY2MoIexgvwqn-h8NU2Rp",
          source: "9BP0qBxoQ70DKRq8gC1GX",
          target: "F1zbrjG2vqeDEFElu1478",
          type: "deletable",
        },
        {
          id: "nCaxSFN8ZGR_o23Y6M7PA",
          source: "F1zbrjG2vqeDEFElu1478",
          target: "DtJ7scXmGEA101ommJOKc",
          type: "deletable",
        },
        {
          id: "K9n9h4MV4dpHMbrTstf48",
          source: "nESW80juDe8b5bB_tbmSc",
          target: "Z-jW1DqKIqpw1SDVMnkra",
          type: "deletable",
        },
        {
          id: "bnm75BAIbdRkozdO7sE3I",
          source: "Z-jW1DqKIqpw1SDVMnkra",
          target: "ORKuDH3QHalm-h0zs8zd_",
          type: "deletable",
        },
        {
          id: "SJVanPsTtjJSaTJ4_mJQK",
          source: "ORKuDH3QHalm-h0zs8zd_",
          target: "DtJ7scXmGEA101ommJOKc",
          type: "deletable",
        },
      ],
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
            x: 1440,
            y: 272,
          },
          deletable: false,
          data: {
            height: 42,
          },
        },
        {
          id: "5zne5FShP-jUCF1s7823h",
          type: "tags",
          position: {
            x: 592,
            y: -42,
          },
          deletable: false,
          data: {
            tags: ["marketing", "lead"],
          },

          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "nESW80juDe8b5bB_tbmSc",
          type: "menu",
          position: {
            x: 192,
            y: 96,
          },
          deletable: false,
          data: {
            options: [
              {
                id: "VDzoZ8Zy7ziN7Lk7-oCyr",
                option: {
                  id: 0,
                  value: "Marketing",
                },
              },
              {
                id: "oSWr4M-TyKs9xBYAFd1_R",
                option: {
                  id: 1,
                  value: "Lead",
                },
              },
              {
                id: "loCnMZeGPetaibXqZGyhp",
                option: {
                  id: 2,
                  value: "Support",
                },
              },
            ],
            question: "Please select an option:",
          },
          measured: {
            width: 288,
            height: 348,
          },
        },
        {
          id: "8p15_Y66luCEbFS_J7vcO",
          type: "text-message",
          position: {
            x: 992,
            y: 0,
          },
          deletable: false,
          data: {
            message: "You choose Marketing.",
          },
          measured: {
            width: 288,
            height: 199,
          },
        },
        {
          id: "9BP0qBxoQ70DKRq8gC1GX",
          type: "tags",
          position: {
            x: 592,
            y: 208,
          },
          deletable: false,
          data: {
            tags: ["lead"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "F1zbrjG2vqeDEFElu1478",
          type: "log-message",
          position: {
            x: 1024,
            y: 304,
          },
          deletable: false,
          data: {
            message: "You choose Lead.",
          },
          measured: {
            width: 288,
            height: 179,
          },
        },
        {
          id: "Z-jW1DqKIqpw1SDVMnkra",
          type: "tags",
          position: {
            x: 592,
            y: 432,
          },
          deletable: false,
          data: {
            tags: ["support"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "ORKuDH3QHalm-h0zs8zd_",
          type: "text-message",
          position: {
            x: 1040,
            y: 528,
          },
          deletable: false,
          data: {
            message: "You choose Support.",
          },
          measured: {
            width: 288,
            height: 179,
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

    // İkinci örnek - Data Analytics Pipeline
    {
      id: "2",
      name: "Data Analytics Pipeline",
      description:
        "Process and analyze weekly sales data from multiple sources",
      status: "active",
      createdAt: "2025-01-20T11:23:45",
      updatedAt: "2025-03-08T14:15:30",
      lastRunAt: "2025-03-09T02:00:00",
      nextRunAt: "2025-03-16T02:00:00",
      frequency: "Weekly on Sunday",
      frequencySettings: {
        dayOfWeek: 0, // Pazar
        time: "02:00",
        timezone: "UTC",
      },
      successRate: 92.3,
      averageRuntime: 1800000, // 30 dakika
      isRunning: false,
      progress: 0,
      lastError: "Database connection timeout at step 3 on 2025-02-23",
      executionHistory: [
        {
          id: "run-104",
          startTime: "2025-03-09T02:00:00",
          endTime: "2025-03-09T02:28:14",
          status: "success",
        },
        {
          id: "run-103",
          startTime: "2025-03-02T02:00:00",
          endTime: "2025-03-02T02:31:22",
          status: "success",
        },
        {
          id: "run-102",
          startTime: "2025-02-23T02:00:00",
          endTime: "2025-02-23T02:05:33",
          status: "failure",
          error: "Database connection timeout",
        },
      ],
      createdBy: "data.scientist@company.com",
      owner: "data.team@company.com",
      version: "2.4.1",
      priority: "medium",
      timeout: 3600000, // 1 saat
      retryPolicy: {
        maxAttempts: 2,
        backoffMultiplier: 2.0,
      },
      tags: ["analytics", "data", "weekly-report"],
      variables: {
        dataSources: ["salesforce", "shopify", "google_analytics"],
        outputFormat: "dashboard",
        notifyUsers: ["executive@company.com", "sales@company.com"],
      },
      isTemplate: false,
      permissions: {
        viewUsers: ["leadership@company.com", "sales.managers@company.com"],
        editUsers: ["data.team@company.com"],
      },
      edges: [
        {
          id: "27Uqm_guQgYOw81_ibdSu",
          source: "rFM8ixvItA-i-bXblxZ_M",
          target: "nESW80juDe8b5bB_tbmSc",
          type: "deletable",
        },
        {
          id: "aiMB_q-I713SLcttfM6PS",
          source: "nESW80juDe8b5bB_tbmSc",
          target: "5zne5FShP-jUCF1s7823h",
          type: "deletable",
        },
        {
          id: "gqnkF2AYRxqf8QUiZHuyr",
          source: "5zne5FShP-jUCF1s7823h",
          target: "8p15_Y66luCEbFS_J7vcO",
          type: "deletable",
        },
        {
          id: "AKIsmctF2xPTVcEGZgwBn",
          source: "8p15_Y66luCEbFS_J7vcO",
          target: "DtJ7scXmGEA101ommJOKc",
          type: "deletable",
        },
        {
          id: "wEgmkVqjI5s2VH32FIMvX",
          source: "nESW80juDe8b5bB_tbmSc",
          target: "9BP0qBxoQ70DKRq8gC1GX",
          type: "deletable",
        },
        {
          id: "VY2MoIexgvwqn-h8NU2Rp",
          source: "9BP0qBxoQ70DKRq8gC1GX",
          target: "F1zbrjG2vqeDEFElu1478",
          type: "deletable",
        },
        {
          id: "nCaxSFN8ZGR_o23Y6M7PA",
          source: "F1zbrjG2vqeDEFElu1478",
          target: "DtJ7scXmGEA101ommJOKc",
          type: "deletable",
        },
        {
          id: "K9n9h4MV4dpHMbrTstf48",
          source: "nESW80juDe8b5bB_tbmSc",
          target: "Z-jW1DqKIqpw1SDVMnkra",
          type: "deletable",
        },
        {
          id: "bnm75BAIbdRkozdO7sE3I",
          source: "Z-jW1DqKIqpw1SDVMnkra",
          target: "ORKuDH3QHalm-h0zs8zd_",
          type: "deletable",
        },
        {
          id: "SJVanPsTtjJSaTJ4_mJQK",
          source: "ORKuDH3QHalm-h0zs8zd_",
          target: "DtJ7scXmGEA101ommJOKc",
          type: "deletable",
        },
      ],
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
            x: 1440,
            y: 272,
          },
          deletable: false,
          data: {
            height: 42,
          },
        },
        {
          id: "5zne5FShP-jUCF1s7823h",
          type: "tags",
          position: {
            x: 592,
            y: -42,
          },
          deletable: false,
          data: {
            tags: ["marketing", "lead"],
          },

          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "nESW80juDe8b5bB_tbmSc",
          type: "menu",
          position: {
            x: 192,
            y: 96,
          },
          deletable: false,
          data: {
            options: [
              {
                id: "VDzoZ8Zy7ziN7Lk7-oCyr",
                option: {
                  id: 0,
                  value: "Marketing",
                },
              },
              {
                id: "oSWr4M-TyKs9xBYAFd1_R",
                option: {
                  id: 1,
                  value: "Lead",
                },
              },
              {
                id: "loCnMZeGPetaibXqZGyhp",
                option: {
                  id: 2,
                  value: "Support",
                },
              },
            ],
            question: "Please select an option:",
          },
          measured: {
            width: 288,
            height: 348,
          },
        },
        {
          id: "8p15_Y66luCEbFS_J7vcO",
          type: "text-message",
          position: {
            x: 992,
            y: 0,
          },
          deletable: false,
          data: {
            message: "You choose Marketing.",
          },
          measured: {
            width: 288,
            height: 199,
          },
        },
        {
          id: "9BP0qBxoQ70DKRq8gC1GX",
          type: "tags",
          position: {
            x: 592,
            y: 208,
          },
          deletable: false,
          data: {
            tags: ["lead"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "F1zbrjG2vqeDEFElu1478",
          type: "log-message",
          position: {
            x: 1024,
            y: 304,
          },
          deletable: false,
          data: {
            message: "You choose Lead.",
          },
          measured: {
            width: 288,
            height: 179,
          },
        },
        {
          id: "Z-jW1DqKIqpw1SDVMnkra",
          type: "tags",
          position: {
            x: 592,
            y: 432,
          },
          deletable: false,
          data: {
            tags: ["support"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "ORKuDH3QHalm-h0zs8zd_",
          type: "text-message",
          position: {
            x: 1040,
            y: 528,
          },
          deletable: false,
          data: {
            message: "You choose Support.",
          },
          measured: {
            width: 288,
            height: 179,
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

    // Üçüncü örnek - Müşteri Onboarding Süreci
    {
      id: "3",
      name: "Customer Onboarding Process",
      description: "Guide new customers through setup and initial training",
      status: "paused",
      createdAt: "2025-02-01T10:45:12",
      updatedAt: "2025-03-05T09:33:54",
      lastRunAt: "2025-03-01T15:22:10",
      nextRunAt: null,
      frequency: "Manual",
      successRate: 85.7,
      averageRuntime: 432000000, // 5 gün
      isRunning: false,
      progress: 0,
      lastError: null,
      executionHistory: [
        {
          id: "run-045",
          startTime: "2025-03-01T15:22:10",
          endTime: "2025-03-06T14:30:45",
          status: "success",
        },
        {
          id: "run-044",
          startTime: "2025-02-15T09:10:00",
          endTime: "2025-02-20T11:45:33",
          status: "success",
        },
      ],
      createdBy: "product@company.com",
      owner: "customer.success@company.com",
      version: "1.0.3",
      priority: "high",
      timeout: 604800000, // 1 hafta
      retryPolicy: {
        maxAttempts: 1, // Manuel müdahale gerektiğinden otomatik yeniden deneme yok
        backoffMultiplier: 1.0,
      },
      tags: ["onboarding", "customer-success", "training"],
      variables: {
        customerTier: "enterprise",
        trainingModules: ["basics", "advanced", "admin"],
        dedicatedCSM: true,
      },
      isTemplate: true, // Bu bir şablon olarak kullanılabilir
      permissions: {
        viewUsers: ["all@company.com"],
        editUsers: ["customer.success@company.com", "product@company.com"],
      },
      triggers: [
        {
          type: "event",
          config: {
            eventName: "new_customer_signup",
            source: "CRM",
          },
        },
      ],
      integrations: [
        {
          type: "crm",
          id: "salesforce",
          config: {
            fields: ["company_name", "contact_email", "plan"],
          },
        },
        {
          type: "calendar",
          id: "google_calendar",
          config: {
            calendarId: "customer.success@company.com",
          },
        },
      ],
      edges: [
        {
          id: "27Uqm_guQgYOw81_ibdSu",
          source: "rFM8ixvItA-i-bXblxZ_M",
          target: "nESW80juDe8b5bB_tbmSc",
          type: "deletable",
        },
        {
          id: "aiMB_q-I713SLcttfM6PS",
          source: "nESW80juDe8b5bB_tbmSc",
          target: "5zne5FShP-jUCF1s7823h",
          type: "deletable",
        },
        {
          id: "gqnkF2AYRxqf8QUiZHuyr",
          source: "5zne5FShP-jUCF1s7823h",
          target: "8p15_Y66luCEbFS_J7vcO",
          type: "deletable",
        },
        {
          id: "AKIsmctF2xPTVcEGZgwBn",
          source: "8p15_Y66luCEbFS_J7vcO",
          target: "DtJ7scXmGEA101ommJOKc",
          type: "deletable",
        },
        {
          id: "wEgmkVqjI5s2VH32FIMvX",
          source: "nESW80juDe8b5bB_tbmSc",
          target: "9BP0qBxoQ70DKRq8gC1GX",
          type: "deletable",
        },
        {
          id: "VY2MoIexgvwqn-h8NU2Rp",
          source: "9BP0qBxoQ70DKRq8gC1GX",
          target: "F1zbrjG2vqeDEFElu1478",
          type: "deletable",
        },
        {
          id: "nCaxSFN8ZGR_o23Y6M7PA",
          source: "F1zbrjG2vqeDEFElu1478",
          target: "DtJ7scXmGEA101ommJOKc",
          type: "deletable",
        },
        {
          id: "K9n9h4MV4dpHMbrTstf48",
          source: "nESW80juDe8b5bB_tbmSc",
          target: "Z-jW1DqKIqpw1SDVMnkra",
          type: "deletable",
        },
        {
          id: "bnm75BAIbdRkozdO7sE3I",
          source: "Z-jW1DqKIqpw1SDVMnkra",
          target: "ORKuDH3QHalm-h0zs8zd_",
          type: "deletable",
        },
        {
          id: "SJVanPsTtjJSaTJ4_mJQK",
          source: "ORKuDH3QHalm-h0zs8zd_",
          target: "DtJ7scXmGEA101ommJOKc",
          type: "deletable",
        },
      ],
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
            x: 1440,
            y: 272,
          },
          deletable: false,
          data: {
            height: 42,
          },
        },
        {
          id: "5zne5FShP-jUCF1s7823h",
          type: "tags",
          position: {
            x: 592,
            y: -42,
          },
          deletable: false,
          data: {
            tags: ["marketing", "lead"],
          },

          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "nESW80juDe8b5bB_tbmSc",
          type: "menu",
          position: {
            x: 192,
            y: 96,
          },
          deletable: false,
          data: {
            options: [
              {
                id: "VDzoZ8Zy7ziN7Lk7-oCyr",
                option: {
                  id: 0,
                  value: "Marketing",
                },
              },
              {
                id: "oSWr4M-TyKs9xBYAFd1_R",
                option: {
                  id: 1,
                  value: "Lead",
                },
              },
              {
                id: "loCnMZeGPetaibXqZGyhp",
                option: {
                  id: 2,
                  value: "Support",
                },
              },
            ],
            question: "Please select an option:",
          },
          measured: {
            width: 288,
            height: 348,
          },
        },
        {
          id: "8p15_Y66luCEbFS_J7vcO",
          type: "text-message",
          position: {
            x: 992,
            y: 0,
          },
          deletable: false,
          data: {
            message: "You choose Marketing.",
          },
          measured: {
            width: 288,
            height: 199,
          },
        },
        {
          id: "9BP0qBxoQ70DKRq8gC1GX",
          type: "tags",
          position: {
            x: 592,
            y: 208,
          },
          deletable: false,
          data: {
            tags: ["lead"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "F1zbrjG2vqeDEFElu1478",
          type: "log-message",
          position: {
            x: 1024,
            y: 304,
          },
          deletable: false,
          data: {
            message: "You choose Lead.",
          },
          measured: {
            width: 288,
            height: 179,
          },
        },
        {
          id: "Z-jW1DqKIqpw1SDVMnkra",
          type: "tags",
          position: {
            x: 592,
            y: 432,
          },
          deletable: false,
          data: {
            tags: ["support"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "ORKuDH3QHalm-h0zs8zd_",
          type: "text-message",
          position: {
            x: 1040,
            y: 528,
          },
          deletable: false,
          data: {
            message: "You choose Support.",
          },
          measured: {
            width: 288,
            height: 179,
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

    // Dördüncü örnek - Ürün Yayınlama Süreci
    {
      id: "4",
      name: "Product Release Pipeline",
      description: "Coordinate the release of new product features",
      status: "draft",
      createdAt: "2025-03-01T11:20:45",
      updatedAt: "2025-03-11T13:55:22",
      lastRunAt: null,
      nextRunAt: null,
      frequency: "Manual",
      successRate: null,
      averageRuntime: null,
      isRunning: false,
      progress: 0,
      lastError: null,
      executionHistory: [],
      createdBy: "project.manager@company.com",
      owner: "project.manager@company.com",
      version: "0.1.0",
      priority: "medium",
      timeout: 1209600000, // 2 hafta
      tags: ["product", "release", "development"],
      variables: {
        featureName: "",
        releaseType: "minor",
        qaRequired: true,
        stakeholders: ["product", "development", "marketing", "support"],
      },
      isTemplate: true,
      permissions: {
        viewUsers: ["engineering@company.com", "product@company.com"],
        editUsers: ["project.manager@company.com"],
      },
      edges: [
        {
          id: "27Uqm_guQgYOw81_ibdSu",
          source: "rFM8ixvItA-i-bXblxZ_M",
          target: "nESW80juDe8b5bB_tbmSc",
          type: "deletable",
        },
        {
          id: "aiMB_q-I713SLcttfM6PS",
          source: "nESW80juDe8b5bB_tbmSc",
          target: "5zne5FShP-jUCF1s7823h",
          type: "deletable",
        },
        {
          id: "gqnkF2AYRxqf8QUiZHuyr",
          source: "5zne5FShP-jUCF1s7823h",
          target: "8p15_Y66luCEbFS_J7vcO",
          type: "deletable",
        },
        {
          id: "AKIsmctF2xPTVcEGZgwBn",
          source: "8p15_Y66luCEbFS_J7vcO",
          target: "DtJ7scXmGEA101ommJOKc",
          type: "deletable",
        },
        {
          id: "wEgmkVqjI5s2VH32FIMvX",
          source: "nESW80juDe8b5bB_tbmSc",
          target: "9BP0qBxoQ70DKRq8gC1GX",
          type: "deletable",
        },
        {
          id: "VY2MoIexgvwqn-h8NU2Rp",
          source: "9BP0qBxoQ70DKRq8gC1GX",
          target: "F1zbrjG2vqeDEFElu1478",
          type: "deletable",
        },
        {
          id: "nCaxSFN8ZGR_o23Y6M7PA",
          source: "F1zbrjG2vqeDEFElu1478",
          target: "DtJ7scXmGEA101ommJOKc",
          type: "deletable",
        },
        {
          id: "K9n9h4MV4dpHMbrTstf48",
          source: "nESW80juDe8b5bB_tbmSc",
          target: "Z-jW1DqKIqpw1SDVMnkra",
          type: "deletable",
        },
        {
          id: "bnm75BAIbdRkozdO7sE3I",
          source: "Z-jW1DqKIqpw1SDVMnkra",
          target: "ORKuDH3QHalm-h0zs8zd_",
          type: "deletable",
        },
        {
          id: "SJVanPsTtjJSaTJ4_mJQK",
          source: "ORKuDH3QHalm-h0zs8zd_",
          target: "DtJ7scXmGEA101ommJOKc",
          type: "deletable",
        },
      ],
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
            x: 1440,
            y: 272,
          },
          deletable: false,
          data: {
            height: 42,
          },
        },
        {
          id: "5zne5FShP-jUCF1s7823h",
          type: "tags",
          position: {
            x: 592,
            y: -42,
          },
          deletable: false,
          data: {
            tags: ["marketing", "lead"],
          },

          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "nESW80juDe8b5bB_tbmSc",
          type: "menu",
          position: {
            x: 192,
            y: 96,
          },
          deletable: false,
          data: {
            options: [
              {
                id: "VDzoZ8Zy7ziN7Lk7-oCyr",
                option: {
                  id: 0,
                  value: "Marketing",
                },
              },
              {
                id: "oSWr4M-TyKs9xBYAFd1_R",
                option: {
                  id: 1,
                  value: "Lead",
                },
              },
              {
                id: "loCnMZeGPetaibXqZGyhp",
                option: {
                  id: 2,
                  value: "Support",
                },
              },
            ],
            question: "Please select an option:",
          },
          measured: {
            width: 288,
            height: 348,
          },
        },
        {
          id: "8p15_Y66luCEbFS_J7vcO",
          type: "text-message",
          position: {
            x: 992,
            y: 0,
          },
          deletable: false,
          data: {
            message: "You choose Marketing.",
          },
          measured: {
            width: 288,
            height: 199,
          },
        },
        {
          id: "9BP0qBxoQ70DKRq8gC1GX",
          type: "tags",
          position: {
            x: 592,
            y: 208,
          },
          deletable: false,
          data: {
            tags: ["lead"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "F1zbrjG2vqeDEFElu1478",
          type: "log-message",
          position: {
            x: 1024,
            y: 304,
          },
          deletable: false,
          data: {
            message: "You choose Lead.",
          },
          measured: {
            width: 288,
            height: 179,
          },
        },
        {
          id: "Z-jW1DqKIqpw1SDVMnkra",
          type: "tags",
          position: {
            x: 592,
            y: 432,
          },
          deletable: false,
          data: {
            tags: ["support"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "ORKuDH3QHalm-h0zs8zd_",
          type: "text-message",
          position: {
            x: 1040,
            y: 528,
          },
          deletable: false,
          data: {
            message: "You choose Support.",
          },
          measured: {
            width: 288,
            height: 179,
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

import type { IFlowState } from "@/stores/flow-store";
import { nanoid } from "nanoid";
import { useFlowStore } from "@/stores/flow-store";

// Tüm workflow'ları getir
export const getWorkflows = async (): Promise<IFlowState["workflow"][]> => {
  // (Mevcut getWorkflows fonksiyonu korundu)
  // API çağrısı burada olacak

  // Örnek veri dönüşü korundu
  return [
    {
      id: "1",
      name: "Email Marketing Automation",
      description: "Send personalized emails based on customer activity",
      status: "active",
      createdAt: "2025-02-15T09:12:33",
      updatedAt: "2025-03-14T10:15:42",
      lastRunAt: "2025-03-13T14:30:00",
      nextRunAt: "2025-03-15T10:00:00",
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
          startTime: "2025-03-13T14:30:00",
          endTime: "2025-03-13T14:32:05",
          status: "success",
        },
        {
          id: "run-002",
          startTime: "2025-03-12T10:00:00",
          endTime: "2025-03-12T10:02:13",
          status: "success",
        },
        {
          id: "run-003",
          startTime: "2025-03-11T10:00:00",
          endTime: "2025-03-11T10:01:55",
          status: "success",
        },
      ],
      createdBy: "admin@company.com",
      owner: "marketing@company.com",
      version: "1.3.0",
      priority: "high",
      timeout: 600000, // 10 minutes
      retryPolicy: {
        maxAttempts: 3,
        backoffMultiplier: 1.5,
      },
      tags: ["marketing", "email", "automation", "customer-engagement"],
      variables: {
        emailSubject: "Weekly Newsletter",
        emailSender: "marketing@company.com",
        customerSegments: ["active", "new", "vip", "dormant"],
      },
      isTemplate: false,
      permissions: {
        viewUsers: ["team@company.com", "analytics@company.com"],
        editUsers: ["admin@company.com", "marketing@company.com"],
      },
      edges: [
        {
          id: "edge_001",
          source: "node_start",
          target: "node_menu",
          type: "deletable",
        },
        {
          id: "edge_002",
          source: "node_menu",
          target: "node_tag_active",
          type: "deletable",
        },
        {
          id: "edge_003",
          source: "node_tag_active",
          target: "node_message_active",
          type: "deletable",
        },
        {
          id: "edge_004",
          source: "node_message_active",
          target: "node_end",
          type: "deletable",
        },
        {
          id: "edge_005",
          source: "node_menu",
          target: "node_tag_new",
          type: "deletable",
        },
        {
          id: "edge_006",
          source: "node_tag_new",
          target: "node_message_new",
          type: "deletable",
        },
        {
          id: "edge_007",
          source: "node_message_new",
          target: "node_end",
          type: "deletable",
        },
        {
          id: "edge_008",
          source: "node_menu",
          target: "node_tag_vip",
          type: "deletable",
        },
        {
          id: "edge_009",
          source: "node_tag_vip",
          target: "node_log_vip",
          type: "deletable",
        },
        {
          id: "edge_010",
          source: "node_log_vip",
          target: "node_end",
          type: "deletable",
        },
      ],
      nodes: [
        {
          id: "node_start",
          type: "start",
          position: {
            x: 50,
            y: 250,
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
          id: "node_end",
          type: "end",
          position: {
            x: 1200,
            y: 250,
          },
          deletable: false,
          data: {
            height: 42,
          },
          measured: {
            width: 96,
            height: 42,
          },
        },
        {
          id: "node_menu",
          type: "menu",
          position: {
            x: 200,
            y: 250,
          },
          deletable: false,
          data: {
            options: [
              {
                id: "opt_001",
                option: {
                  id: 0,
                  value: "Active Customers",
                },
              },
              {
                id: "opt_002",
                option: {
                  id: 1,
                  value: "New Customers",
                },
              },
              {
                id: "opt_003",
                option: {
                  id: 2,
                  value: "VIP Customers",
                },
              },
            ],
            question: "Select customer segment:",
          },
          measured: {
            width: 288,
            height: 348,
          },
        },
        {
          id: "node_tag_active",
          type: "tags",
          position: {
            x: 550,
            y: 100,
          },
          deletable: false,
          data: {
            tags: ["active", "engagement"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "node_message_active",
          type: "text-message",
          position: {
            x: 900,
            y: 100,
          },
          deletable: false,
          data: {
            message: "Sending regular newsletter to active customers.",
          },
          measured: {
            width: 288,
            height: 199,
          },
        },
        {
          id: "node_tag_new",
          type: "tags",
          position: {
            x: 550,
            y: 250,
          },
          deletable: false,
          data: {
            tags: ["new", "onboarding"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "node_message_new",
          type: "text-message",
          position: {
            x: 900,
            y: 250,
          },
          deletable: false,
          data: {
            message: "Sending welcome series to new customers.",
          },
          measured: {
            width: 288,
            height: 199,
          },
        },
        {
          id: "node_tag_vip",
          type: "tags",
          position: {
            x: 550,
            y: 400,
          },
          deletable: false,
          data: {
            tags: ["vip", "premium"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "node_log_vip",
          type: "log-message",
          position: {
            x: 900,
            y: 400,
          },
          deletable: false,
          data: {
            message: "Sending exclusive content to VIP customers.",
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

    {
      id: "2",
      name: "Data Analytics Pipeline",
      description: "Process and analyze sales data from multiple sources",
      status: "active",
      createdAt: "2025-01-20T11:23:45",
      updatedAt: "2025-03-14T09:45:12",
      lastRunAt: "2025-03-10T02:00:00",
      nextRunAt: "2025-03-17T02:00:00",
      frequency: "Weekly on Monday",
      frequencySettings: {
        dayOfWeek: 1, // Monday
        time: "02:00",
        timezone: "UTC",
      },
      successRate: 93.5,
      averageRuntime: 1750000, // 29 min 10 sec
      isRunning: false,
      progress: 0,
      lastError: "Database connection timeout at step 3 on 2025-02-23",
      executionHistory: [
        {
          id: "run-106",
          startTime: "2025-03-10T02:00:00",
          endTime: "2025-03-10T02:28:35",
          status: "success",
        },
        {
          id: "run-105",
          startTime: "2025-03-03T02:00:00",
          endTime: "2025-03-03T02:30:12",
          status: "success",
        },
        {
          id: "run-104",
          startTime: "2025-02-24T02:00:00",
          endTime: "2025-02-24T02:29:50",
          status: "success",
        },
      ],
      createdBy: "data.scientist@company.com",
      owner: "data.team@company.com",
      version: "2.5.0",
      priority: "medium",
      timeout: 3600000, // 1 hour
      retryPolicy: {
        maxAttempts: 2,
        backoffMultiplier: 2.0,
      },
      tags: ["analytics", "data", "weekly-report", "sales"],
      variables: {
        dataSources: ["salesforce", "shopify", "google_analytics", "hubspot"],
        outputFormat: "dashboard",
        notifyUsers: [
          "executive@company.com",
          "sales@company.com",
          "marketing@company.com",
        ],
      },
      isTemplate: false,
      permissions: {
        viewUsers: [
          "leadership@company.com",
          "sales.managers@company.com",
          "marketing.managers@company.com",
        ],
        editUsers: ["data.team@company.com", "admin@company.com"],
      },
      edges: [
        {
          id: "edge_101",
          source: "node_start_2",
          target: "node_menu_2",
          type: "deletable",
        },
        {
          id: "edge_102",
          source: "node_menu_2",
          target: "node_tag_sales",
          type: "deletable",
        },
        {
          id: "edge_103",
          source: "node_tag_sales",
          target: "node_message_sales",
          type: "deletable",
        },
        {
          id: "edge_104",
          source: "node_message_sales",
          target: "node_end_2",
          type: "deletable",
        },
        {
          id: "edge_105",
          source: "node_menu_2",
          target: "node_tag_marketing",
          type: "deletable",
        },
        {
          id: "edge_106",
          source: "node_tag_marketing",
          target: "node_log_marketing",
          type: "deletable",
        },
        {
          id: "edge_107",
          source: "node_log_marketing",
          target: "node_end_2",
          type: "deletable",
        },
        {
          id: "edge_108",
          source: "node_menu_2",
          target: "node_tag_executive",
          type: "deletable",
        },
        {
          id: "edge_109",
          source: "node_tag_executive",
          target: "node_message_executive",
          type: "deletable",
        },
        {
          id: "edge_110",
          source: "node_message_executive",
          target: "node_end_2",
          type: "deletable",
        },
      ],
      nodes: [
        {
          id: "node_start_2",
          type: "start",
          position: {
            x: 50,
            y: 250,
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
          id: "node_end_2",
          type: "end",
          position: {
            x: 1200,
            y: 250,
          },
          deletable: false,
          data: {
            height: 42,
          },
          measured: {
            width: 96,
            height: 42,
          },
        },
        {
          id: "node_menu_2",
          type: "menu",
          position: {
            x: 200,
            y: 250,
          },
          deletable: false,
          data: {
            options: [
              {
                id: "opt_101",
                option: {
                  id: 0,
                  value: "Sales Report",
                },
              },
              {
                id: "opt_102",
                option: {
                  id: 1,
                  value: "Marketing Insights",
                },
              },
              {
                id: "opt_103",
                option: {
                  id: 2,
                  value: "Executive Summary",
                },
              },
            ],
            question: "Select report type:",
          },
          measured: {
            width: 288,
            height: 348,
          },
        },
        {
          id: "node_tag_sales",
          type: "tags",
          position: {
            x: 550,
            y: 100,
          },
          deletable: false,
          data: {
            tags: ["sales", "revenue", "conversion"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "node_message_sales",
          type: "text-message",
          position: {
            x: 900,
            y: 100,
          },
          deletable: false,
          data: {
            message:
              "Generating detailed sales performance report with metrics by region and product.",
          },
          measured: {
            width: 288,
            height: 199,
          },
        },
        {
          id: "node_tag_marketing",
          type: "tags",
          position: {
            x: 550,
            y: 250,
          },
          deletable: false,
          data: {
            tags: ["marketing", "campaigns", "channels"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "node_log_marketing",
          type: "log-message",
          position: {
            x: 900,
            y: 250,
          },
          deletable: false,
          data: {
            message:
              "Generating marketing campaign effectiveness report with ROI analysis.",
          },
          measured: {
            width: 288,
            height: 179,
          },
        },
        {
          id: "node_tag_executive",
          type: "tags",
          position: {
            x: 550,
            y: 400,
          },
          deletable: false,
          data: {
            tags: ["executive", "summary", "kpi"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "node_message_executive",
          type: "text-message",
          position: {
            x: 900,
            y: 400,
          },
          deletable: false,
          data: {
            message:
              "Generating high-level executive summary with key performance indicators.",
          },
          measured: {
            width: 288,
            height: 199,
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

    {
      id: "3",
      name: "Customer Onboarding Process",
      description: "Guide new customers through setup and initial training",
      status: "active",
      createdAt: "2025-02-01T10:45:12",
      updatedAt: "2025-03-12T15:20:45",
      lastRunAt: "2025-03-10T09:15:22",
      nextRunAt: null,
      frequency: "Manual",
      successRate: 87.5,
      averageRuntime: 432000000, // 5 days
      isRunning: true,
      progress: 35,
      lastError: null,
      executionHistory: [
        {
          id: "run-048",
          startTime: "2025-03-10T09:15:22",
          endTime: null,
          status: "in-progress",
        },
        {
          id: "run-047",
          startTime: "2025-03-01T15:22:10",
          endTime: "2025-03-06T14:30:45",
          status: "success",
        },
        {
          id: "run-046",
          startTime: "2025-02-15T09:10:00",
          endTime: "2025-02-20T11:45:33",
          status: "success",
        },
      ],
      createdBy: "product@company.com",
      owner: "customer.success@company.com",
      version: "1.2.0",
      priority: "high",
      timeout: 604800000, // 1 week
      retryPolicy: {
        maxAttempts: 1,
        backoffMultiplier: 1.0,
      },
      tags: ["onboarding", "customer-success", "training", "enterprise"],
      variables: {
        customerTier: "enterprise",
        trainingModules: ["basics", "advanced", "admin", "integration"],
        dedicatedCSM: true,
        followUpSchedule: "weekly",
      },
      isTemplate: true,
      permissions: {
        viewUsers: ["all@company.com"],
        editUsers: [
          "customer.success@company.com",
          "product@company.com",
          "admin@company.com",
        ],
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
            fields: ["company_name", "contact_email", "plan", "industry"],
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
          id: "edge_201",
          source: "node_start_3",
          target: "node_menu_3",
          type: "deletable",
        },
        {
          id: "edge_202",
          source: "node_menu_3",
          target: "node_tag_basic",
          type: "deletable",
        },
        {
          id: "edge_203",
          source: "node_tag_basic",
          target: "node_message_basic",
          type: "deletable",
        },
        {
          id: "edge_204",
          source: "node_message_basic",
          target: "node_end_3",
          type: "deletable",
        },
        {
          id: "edge_205",
          source: "node_menu_3",
          target: "node_tag_advanced",
          type: "deletable",
        },
        {
          id: "edge_206",
          source: "node_tag_advanced",
          target: "node_log_advanced",
          type: "deletable",
        },
        {
          id: "edge_207",
          source: "node_log_advanced",
          target: "node_end_3",
          type: "deletable",
        },
        {
          id: "edge_208",
          source: "node_menu_3",
          target: "node_tag_admin",
          type: "deletable",
        },
        {
          id: "edge_209",
          source: "node_tag_admin",
          target: "node_message_admin",
          type: "deletable",
        },
        {
          id: "edge_210",
          source: "node_message_admin",
          target: "node_end_3",
          type: "deletable",
        },
      ],
      nodes: [
        {
          id: "node_start_3",
          type: "start",
          position: {
            x: 50,
            y: 250,
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
          id: "node_end_3",
          type: "end",
          position: {
            x: 1200,
            y: 250,
          },
          deletable: false,
          data: {
            height: 42,
          },
          measured: {
            width: 96,
            height: 42,
          },
        },
        {
          id: "node_menu_3",
          type: "menu",
          position: {
            x: 200,
            y: 250,
          },
          deletable: false,
          data: {
            options: [
              {
                id: "opt_201",
                option: {
                  id: 0,
                  value: "Basic Training",
                },
              },
              {
                id: "opt_202",
                option: {
                  id: 1,
                  value: "Advanced Features",
                },
              },
              {
                id: "opt_203",
                option: {
                  id: 2,
                  value: "Admin Setup",
                },
              },
            ],
            question: "Select onboarding module:",
          },
          measured: {
            width: 288,
            height: 348,
          },
        },
        {
          id: "node_tag_basic",
          type: "tags",
          position: {
            x: 550,
            y: 100,
          },
          deletable: false,
          data: {
            tags: ["basics", "getting-started", "onboarding"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "node_message_basic",
          type: "text-message",
          position: {
            x: 900,
            y: 100,
          },
          deletable: false,
          data: {
            message:
              "Scheduling introduction and basic feature training session.",
          },
          measured: {
            width: 288,
            height: 199,
          },
        },
        {
          id: "node_tag_advanced",
          type: "tags",
          position: {
            x: 550,
            y: 250,
          },
          deletable: false,
          data: {
            tags: ["advanced", "power-user", "training"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "node_log_advanced",
          type: "log-message",
          position: {
            x: 900,
            y: 250,
          },
          deletable: false,
          data: {
            message:
              "Scheduling advanced feature training with technical specialist.",
          },
          measured: {
            width: 288,
            height: 179,
          },
        },
        {
          id: "node_tag_admin",
          type: "tags",
          position: {
            x: 550,
            y: 400,
          },
          deletable: false,
          data: {
            tags: ["admin", "configuration", "setup"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "node_message_admin",
          type: "text-message",
          position: {
            x: 900,
            y: 400,
          },
          deletable: false,
          data: {
            message:
              "Scheduling admin configuration and security setup session.",
          },
          measured: {
            width: 288,
            height: 199,
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

    {
      id: "4",
      name: "Product Release Pipeline",
      description: "Coordinate the release of new product features",
      status: "draft",
      createdAt: "2025-03-01T11:20:45",
      updatedAt: "2025-03-14T10:30:15",
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
      version: "0.2.1",
      priority: "medium",
      timeout: 1209600000, // 2 weeks
      tags: ["product", "release", "development", "planning"],
      variables: {
        featureName: "",
        releaseType: "minor",
        qaRequired: true,
        stakeholders: [
          "product",
          "development",
          "marketing",
          "support",
          "sales",
        ],
        documentationRequired: true,
      },
      isTemplate: true,
      permissions: {
        viewUsers: [
          "engineering@company.com",
          "product@company.com",
          "marketing@company.com",
        ],
        editUsers: ["project.manager@company.com", "admin@company.com"],
      },
      edges: [
        {
          id: "edge_301",
          source: "node_start_4",
          target: "node_menu_4",
          type: "deletable",
        },
        {
          id: "edge_302",
          source: "node_menu_4",
          target: "node_tag_plan",
          type: "deletable",
        },
        {
          id: "edge_303",
          source: "node_tag_plan",
          target: "node_message_plan",
          type: "deletable",
        },
        {
          id: "edge_304",
          source: "node_message_plan",
          target: "node_end_4",
          type: "deletable",
        },
        {
          id: "edge_305",
          source: "node_menu_4",
          target: "node_tag_dev",
          type: "deletable",
        },
        {
          id: "edge_306",
          source: "node_tag_dev",
          target: "node_log_dev",
          type: "deletable",
        },
        {
          id: "edge_307",
          source: "node_log_dev",
          target: "node_end_4",
          type: "deletable",
        },
        {
          id: "edge_308",
          source: "node_menu_4",
          target: "node_tag_release",
          type: "deletable",
        },
        {
          id: "edge_309",
          source: "node_tag_release",
          target: "node_message_release",
          type: "deletable",
        },
        {
          id: "edge_310",
          source: "node_message_release",
          target: "node_end_4",
          type: "deletable",
        },
      ],
      nodes: [
        {
          id: "node_start_4",
          type: "start",
          position: {
            x: 50,
            y: 250,
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
          id: "node_end_4",
          type: "end",
          position: {
            x: 1200,
            y: 250,
          },
          deletable: false,
          data: {
            height: 42,
          },
          measured: {
            width: 96,
            height: 42,
          },
        },
        {
          id: "node_menu_4",
          type: "menu",
          position: {
            x: 200,
            y: 250,
          },
          deletable: false,
          data: {
            options: [
              {
                id: "opt_301",
                option: {
                  id: 0,
                  value: "Planning Phase",
                },
              },
              {
                id: "opt_302",
                option: {
                  id: 1,
                  value: "Development Phase",
                },
              },
              {
                id: "opt_303",
                option: {
                  id: 2,
                  value: "Release Phase",
                },
              },
            ],
            question: "Select release phase:",
          },
          measured: {
            width: 288,
            height: 348,
          },
        },
        {
          id: "node_tag_plan",
          type: "tags",
          position: {
            x: 550,
            y: 100,
          },
          deletable: false,
          data: {
            tags: ["planning", "requirements", "roadmap"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "node_message_plan",
          type: "text-message",
          position: {
            x: 900,
            y: 100,
          },
          deletable: false,
          data: {
            message:
              "Initiating feature planning process with stakeholder review.",
          },
          measured: {
            width: 288,
            height: 199,
          },
        },
        {
          id: "node_tag_dev",
          type: "tags",
          position: {
            x: 550,
            y: 250,
          },
          deletable: false,
          data: {
            tags: ["development", "testing", "qa"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "node_log_dev",
          type: "log-message",
          position: {
            x: 900,
            y: 250,
          },
          deletable: false,
          data: {
            message:
              "Starting development sprint with regular progress updates.",
          },
          measured: {
            width: 288,
            height: 179,
          },
        },
        {
          id: "node_tag_release",
          type: "tags",
          position: {
            x: 550,
            y: 400,
          },
          deletable: false,
          data: {
            tags: ["release", "deployment", "monitoring"],
          },
          measured: {
            width: 288,
            height: 186,
          },
        },
        {
          id: "node_message_release",
          type: "text-message",
          position: {
            x: 900,
            y: 400,
          },
          deletable: false,
          data: {
            message: "Preparing deployment schedule and release notes.",
          },
          measured: {
            width: 288,
            height: 199,
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

// Yeni bir workflow ekle
export const createWorkflow = async (
  newWorkflow: Partial<IFlowState["workflow"]>
): Promise<IFlowState["workflow"]> => {
  // Eğer ID yoksa yeni bir ID oluştur
  if (!newWorkflow.id) {
    newWorkflow.id = nanoid();
  }

  // Zorunlu alanlar için varsayılan değerler
  const timestamp = new Date().toISOString();

  const completeWorkflow: IFlowState["workflow"] = {
    // Varsayılan değerler ve yeni oluşturulan değerler
    id: newWorkflow.id,
    name: newWorkflow.name || "",
    description: newWorkflow.description || "",
    status: newWorkflow.status || "draft",
    createdAt: timestamp,
    updatedAt: timestamp,
    lastRunAt: null,
    nextRunAt: null,
    createdBy: newWorkflow.createdBy || "",
    owner: newWorkflow.owner || "",
    version: "1.0.0",

    // Çalışma bilgileri
    frequency: "Manual",
    frequencySettings: {},
    successRate: null,
    averageRuntime: null,

    // Çalıştırma durumu
    isRunning: false,
    progress: 0,
    lastError: null,
    executionHistory: [],

    // İş akışı içeriği
    tags: newWorkflow.tags || [],
    edges: newWorkflow.edges || [],
    nodes: newWorkflow.nodes || [],
    variables: {},

    // Yapılandırma
    priority: newWorkflow.priority || "medium",
    timeout: 3600000, // 1 saat
    retryPolicy: {
      maxAttempts: 3,
      backoffMultiplier: 1.5,
    },

    // Tetikleyiciler ve entegrasyonlar
    triggers: [],
    integrations: [],

    // UI durum bilgisi
    sidebar: {
      active: "available-nodes",
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

    isTemplate: false,
  };

  // API çağrısı simülasyonu (gerçek implementasyonda burada bir fetch veya axios çağrısı olacaktır)
  console.log("Create workflow API called:", completeWorkflow);

  // ÖNEMLİ: Store'u güncelle
  const setWorkflow = useFlowStore.getState().actions.setWorkflow;
  setWorkflow(completeWorkflow);

  // Gerçek bir API'de, burası API yanıtını döndürürdü
  return completeWorkflow;
};

// Mevcut bir workflow'u güncelle
export const updateWorkflow = async (
  id: string,
  updatedData: Partial<IFlowState["workflow"]>
): Promise<IFlowState["workflow"]> => {
  updatedData.updatedAt = new Date().toISOString();

  // API çağrısı simülasyonu
  console.log(`Update workflow API called for ID ${id}:`, updatedData);

  // Güncel workflow verisini al
  const currentWorkflow = await getWorkflowById(id);

  // Güncellenmiş workflow
  const updatedWorkflow = {
    ...currentWorkflow,
    ...updatedData,
    id, // ID'nin değişmediğinden emin oluyoruz
  };

  // ÖNEMLİ: Store'u güncelle
  const setWorkflow = useFlowStore.getState().actions.setWorkflow;
  setWorkflow(updatedWorkflow);

  return updatedWorkflow;
};

// Belirli bir ID'ye sahip workflow'u getir
export const getWorkflowById = async (
  id: string
): Promise<IFlowState["workflow"]> => {
  const workflows = await getWorkflows();
  const workflow = workflows.find((w) => w.id === id);

  if (!workflow) {
    throw new Error(`Workflow with ID ${id} not found`);
  }

  // ÖNEMLİ: Store'u güncelle
  const setWorkflow = useFlowStore.getState().actions.setWorkflow;
  setWorkflow(workflow);

  return workflow;
};

// Bir workflow sil
export const deleteWorkflow = async (id: string): Promise<boolean> => {
  // API çağrısı simülasyonu
  console.log(`Delete workflow API called for ID ${id}`);

  // Eğer silinen workflow şu an store'da aktifse, store'u temizle
  const currentWorkflow = useFlowStore.getState().workflow;
  if (currentWorkflow.id === id) {
    // Store'u temizle ve yeni bir workflow oluştur
    const timestamp = new Date().toISOString();
    const newEmptyWorkflow: IFlowState["workflow"] = {
      id: nanoid(),
      name: "",
      description: "",
      status: "draft",
      createdAt: timestamp,
      updatedAt: timestamp,
      lastRunAt: null,
      nextRunAt: null,
      createdBy: "",
      owner: "",
      version: "1.0.0",
      frequency: "Manual",
      frequencySettings: {},
      successRate: null,
      averageRuntime: null,
      isRunning: false,
      progress: 0,
      lastError: null,
      executionHistory: [],
      tags: [],
      edges: [],
      nodes: [],
      variables: {},
      priority: "medium",
      timeout: 3600000,
      retryPolicy: {
        maxAttempts: 3,
        backoffMultiplier: 1.5,
      },
      triggers: [],
      integrations: [],
      sidebar: {
        active: "available-nodes",
        isShowing: true,
        panels: {
          nodeProperties: {
            selectedNode: null,
          },
        },
      },
      permissions: {
        viewUsers: [],
        editUsers: [],
      },
      isTemplate: false,
    };

    // ÖNEMLİ: Store'u güncelle
    const setWorkflow = useFlowStore.getState().actions.setWorkflow;
    setWorkflow(newEmptyWorkflow);
  }

  // Gerçek bir API'de, bu silme işleminin başarılı olup olmadığını gösterirdi
  return true;
};

// Yardımcı fonksiyon: Mevcut store'daki workflow'u kaydet
export const saveCurrentWorkflow = async (): Promise<
  IFlowState["workflow"]
> => {
  const { workflow } = useFlowStore.getState();

  if (workflow.id) {
    // Mevcut workflow'u güncelle
    return await updateWorkflow(workflow.id, workflow);
  } else {
    // Yeni workflow oluştur
    return await createWorkflow(workflow);
  }
};

// Yardımcı fonksiyon: Store'daki workflow'u API'den gelen veriyle yenile
export const refreshWorkflow = async (
  id: string
): Promise<IFlowState["workflow"]> => {
  return await getWorkflowById(id);
};

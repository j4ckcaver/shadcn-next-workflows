"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { nanoid } from "nanoid";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useFlowStore } from "@/stores/flow-store";
import { useShallow } from "zustand/shallow";
import { createWorkflow } from "@/services/workflow"; // Servis importu

type WorkflowFormProps = {
  onSubmit?: (workflowData: any) => void;
  className?: string;
  onSuccess?: () => void;
};

type StatusOption = {
  value: "active" | "inactive" | "draft";
  label: string;
  description: string;
  color: string;
};

const WorkflowForm: React.FC<WorkflowFormProps> = ({
  onSubmit,
  className,
  onSuccess,
}) => {
  const [errors, setErrors] = useState<{
    name?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [workflow, setWorkflow, saveWorkflow] = useFlowStore(
    useShallow((s) => [
      s.workflow,
      s.actions.setWorkflow,
      s.actions.saveWorkflow,
    ])
  );

  // Form yüklendiğinde yeni workflow oluştur
  useEffect(() => {
    createNewWorkflow();
  }, []);

  // Yeni bir workflow oluştur
  const createNewWorkflow = () => {
    const newWorkflow = {
      id: nanoid(),
      name: "",
      description: "",
      status: "draft" as "active" | "draft" | "paused" | "archived",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "",
      owner: "",
      version: "1.0.0",
      lastRunAt: null,
      nextRunAt: null,
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
      priority: "medium" as "medium" | "low" | "high",
      timeout: 3600000,
      retryPolicy: {
        maxAttempts: 3,
        backoffMultiplier: 1.5,
      },
      triggers: [],
      integrations: [],
      sidebar: {
        active: "none" as "none" | "node-properties" | "available-nodes",
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

    setWorkflow(newWorkflow);
  };

  // Status options - mapping store statuses to UI options
  const statusOptions: StatusOption[] = [
    {
      value: "active",
      label: "Active",
      description: "Workflow will be published immediately",
      color: "bg-green-500",
    },
    {
      value: "inactive",
      label: "Inactive",
      description: "Workflow is paused",
      color: "bg-gray-400",
    },
    {
      value: "draft",
      label: "Draft",
      description: "In configuration phase",
      color: "bg-blue-500",
    },
  ];

  // Render status icon based on color
  const renderStatusIcon = (color: string) => (
    <div className={`h-2 w-2 rounded-full ${color}`} />
  );

  // Map the store status to UI status
  const mapStoreStatusToUIStatus = (
    storeStatus: string
  ): "active" | "inactive" | "draft" => {
    switch (storeStatus) {
      case "active":
        return "active";
      case "paused":
        return "inactive";
      case "draft":
      case "archived":
      default:
        return "draft";
    }
  };

  // Map the UI status to store status
  const mapUIStatusToStoreStatus = (
    uiStatus: "active" | "inactive" | "draft"
  ): "active" | "paused" | "draft" | "archived" => {
    switch (uiStatus) {
      case "active":
        return "active";
      case "inactive":
        return "paused";
      case "draft":
      default:
        return "draft";
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWorkflow({
      ...workflow,
      [name]: value,
      updatedAt: new Date().toISOString(),
    });

    // Clear error when field is filled
    if (name === "name" && value.trim() && errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleStatusChange = (value: "active" | "inactive" | "draft") => {
    setWorkflow({
      ...workflow,
      status: mapUIStatusToStoreStatus(value),
      updatedAt: new Date().toISOString(),
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: { name?: string } = {};

    if (!workflow.name.trim()) {
      newErrors.name = "Workflow name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      // Önce store'a kaydet
      const storeWorkflow = saveWorkflow();

      // Ardından API'ye gönder
      const createdWorkflow = await createWorkflow({
        name: workflow.name,
        description: workflow.description,
        status: workflow.status,
        tags: workflow.tags,
        // Diğer alanlar service tarafında varsayılan değerlerle doldurulacak
      });

      // If external onSubmit handler is provided, call it
      if (onSubmit) {
        onSubmit(createdWorkflow);
      }

      // Başarı callback'i varsa çağır
      if (onSuccess) {
        onSuccess();
      }

      // Form gönderildikten sonra yeni bir boş form oluştur
      createNewWorkflow();
    } catch (error) {
      console.error("Error creating workflow:", error);
      // Burada hata işleme yapabilirsiniz
      // Örneğin bir toast notification göstermek
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={cn("w-full shadow-sm", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Yeni Workflow</CardTitle>
        <CardDescription>
          Temel bilgileri girerek hızlı bir şekilde yeni bir workflow oluşturun
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="workflow-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Workflow Adı <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={workflow.name}
                onChange={handleChange}
                placeholder="Örn: Müşteri Edinme Süreci"
                className={
                  errors.name ? "border-destructive ring-destructive" : ""
                }
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Açıklama
              </Label>
              <Textarea
                id="description"
                name="description"
                value={workflow.description}
                onChange={handleChange}
                placeholder="Bu workflow ne yapar? Kısa bir açıklama ekleyin."
                rows={3}
                disabled={isSubmitting}
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Durum
              </Label>
              <RadioGroup
                value={mapStoreStatusToUIStatus(workflow.status)}
                onValueChange={(value) =>
                  handleStatusChange(value as "active" | "inactive" | "draft")
                }
                className="flex flex-col gap-3 mt-2"
                disabled={isSubmitting}
              >
                {statusOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-start space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="mt-1"
                      disabled={isSubmitting}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={option.value}
                        className="text-sm font-medium leading-none flex items-center cursor-pointer"
                      >
                        {renderStatusIcon(option.color)}
                        <span className="ml-2">{option.label}</span>
                      </label>
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end border-t px-6 py-4">
        <Button
          type="submit"
          form="workflow-form"
          disabled={isSubmitting}
          className={isSubmitting ? "opacity-70" : ""}
        >
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? "Oluşturuluyor..." : "Oluştur"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkflowForm;

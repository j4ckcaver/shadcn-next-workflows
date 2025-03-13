"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { Card } from "./card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Icon } from "@iconify/react";
import { useFlowStore } from "@/stores/flow-store";
import { Badge } from "./badge";
import { format } from "date-fns";
import { useState } from "react";
import { WorkflowHistoryModal } from "./card-workflow-history";

export const CardWorkflow = ({ workflow }: any) => {
  const router = useRouter();
  const setWorkflow = useFlowStore((s) => s.actions.setWorkflow);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const handleOnEdit = () => {
    router.push("/workflow/" + workflow.id);
    setWorkflow(workflow);
  };

  // İşlem fonksiyonları
  const handleToggleStatus = () => {
    // Workflow durumunu değiştirme mantığı
    console.log(`Toggle status for workflow: ${workflow.id}`);
  };

  const handleRunNow = () => {
    // Workflow'u hemen çalıştırma mantığı
    console.log(`Run workflow now: ${workflow.id}`);
  };

  const handleDuplicate = () => {
    // Workflow'u kopyalama mantığı
    console.log(`Duplicate workflow: ${workflow.id}`);
  };

  const handleDelete = () => {
    // Workflow'u silme mantığı
    console.log(`Delete workflow: ${workflow.id}`);
  };

  // Open history modal
  const handleOpenHistoryModal = () => {
    setIsHistoryModalOpen(true);
  };

  // Close history modal
  const handleCloseHistoryModal = () => {
    setIsHistoryModalOpen(false);
  };

  // Son çalışma zamanı formatlayıcı
  const formatRuntimeDuration = (milliseconds: number | null | undefined) => {
    if (!milliseconds) return "N/A";

    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  // Öncelik rengi belirleyici
  const getPriorityColor = (priority: string | undefined) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
      default:
        return "text-card-foreground/60";
    }
  };

  return (
    <>
      <Card className="w-full bg-white dark:bg-neutral-900 shadow-md rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300 mb-10">
        {/* Status indicator and workflow name header */}
        <div className="flex items-center justify-between p-4  dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div
              className={`size-3 rounded-full ${
                workflow.status === "active"
                  ? "bg-primary"
                  : workflow.status === "paused"
                  ? "bg-amber-500"
                  : workflow.status === "archived"
                  ? "bg-neutral-500"
                  : "bg-neutral-300 dark:bg-neutral-600"
              }`}
            ></div>
            <div>
              <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100">
                {workflow.name}
                {workflow.isTemplate && (
                  <Badge className="ml-2 bg-blue-500/20 dark:bg-blue-500/30 text-blue-700 dark:text-blue-300 text-xs">
                    Template
                  </Badge>
                )}
              </h2>
              {workflow.description && (
                <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-1 line-clamp-1">
                  {workflow.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {workflow.version && (
              <span className="text-xs text-neutral-700 dark:text-neutral-400 mr-2">
                v{workflow.version}
              </span>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:bg-primary/10 dark:hover:bg-primary/20"
                  onClick={handleOnEdit}
                >
                  <Icon icon="mynaui:edit" className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Edit Workflow</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Workflow details */}
        <div className="p-4 bg-white dark:bg-neutral-900">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Last run */}
            <div className="flex flex-col">
              <span className="text-xs text-neutral-700 dark:text-neutral-400 mb-1">
                Last run
              </span>
              <div className="flex items-center">
                <Icon
                  icon="mynaui:clock-circle"
                  className="size-4 mr-1 text-neutral-700 dark:text-neutral-400"
                />
                <span className="text-sm text-neutral-900 dark:text-neutral-200">
                  {workflow.lastRunAt
                    ? new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }).format(new Date(workflow.lastRunAt))
                    : "Never run"}
                </span>
              </div>
            </div>

            {/* Next run */}
            <div className="flex flex-col">
              <span className="text-xs text-neutral-700 dark:text-neutral-400 mb-1">
                Next run
              </span>
              <div className="flex items-center">
                <Icon
                  icon="mynaui:calendar"
                  className="size-4 mr-1 text-neutral-700 dark:text-neutral-400"
                />
                <span className="text-sm text-neutral-900 dark:text-neutral-200">
                  {workflow.nextRunAt
                    ? new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }).format(new Date(workflow.nextRunAt))
                    : "Not scheduled"}
                </span>
              </div>
            </div>

            {/* Frequency */}
            <div className="flex flex-col">
              <span className="text-xs text-neutral-700 dark:text-neutral-400 mb-1">
                Frequency
              </span>
              <div className="flex items-center">
                <Icon
                  icon="mynaui:refresh"
                  className="size-4 mr-1 text-neutral-700 dark:text-neutral-400"
                />
                <span className="text-sm text-neutral-900 dark:text-neutral-200">
                  {workflow.frequency || "Manual"}
                </span>
              </div>
            </div>

            {/* Success rate */}
            <div className="flex flex-col">
              <span className="text-xs text-neutral-700 dark:text-neutral-400 mb-1">
                Success rate
              </span>
              <div className="flex items-center">
                <Icon
                  icon="mynaui:chart-bar"
                  className="size-4 mr-1 text-neutral-700 dark:text-neutral-400"
                />
                <span className="text-sm text-neutral-900 dark:text-neutral-200">
                  {workflow.successRate ? `${workflow.successRate}%` : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Second row - Advanced features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {/* Average runtime */}
            {workflow.averageRuntime !== undefined && (
              <div className="flex flex-col">
                <span className="text-xs text-neutral-700 dark:text-neutral-400 mb-1">
                  Avg. Runtime
                </span>
                <div className="flex items-center">
                  <Icon
                    icon="mynaui:stopwatch"
                    className="size-4 mr-1 text-neutral-700 dark:text-neutral-400"
                  />
                  <span className="text-sm text-neutral-900 dark:text-neutral-200">
                    {formatRuntimeDuration(workflow.averageRuntime)}
                  </span>
                </div>
              </div>
            )}

            {/* Last error */}
            {workflow.lastError && (
              <div className="flex flex-col">
                <span className="text-xs text-neutral-700 dark:text-neutral-400 mb-1">
                  Last Error
                </span>
                <div className="flex items-center">
                  <Icon
                    icon="mynaui:warning"
                    className="size-4 mr-1 text-red-600 dark:text-red-400"
                  />
                  <span className="text-sm text-red-600 dark:text-red-400 truncate max-w-32">
                    {workflow.lastError}
                  </span>
                </div>
              </div>
            )}

            {/* Priority */}
            {workflow.priority && (
              <div className="flex flex-col">
                <span className="text-xs text-neutral-700 dark:text-neutral-400 mb-1">
                  Priority
                </span>
                <div className="flex items-center">
                  <Icon
                    icon="mynaui:flag"
                    className={`size-4 mr-1 ${getPriorityColor(
                      workflow.priority
                    )}`}
                  />
                  <span
                    className={`text-sm ${getPriorityColor(
                      workflow.priority
                    )} capitalize`}
                  >
                    {workflow.priority}
                  </span>
                </div>
              </div>
            )}

            {/* Owner */}
            <div className="flex flex-col">
              <span className="text-xs text-neutral-700 dark:text-neutral-400 mb-1">
                {workflow.owner ? "Owner" : "Created by"}
              </span>
              <div className="flex items-center">
                <Icon
                  icon="mynaui:user"
                  className="size-4 mr-1 text-neutral-700 dark:text-neutral-400"
                />
                <span className="text-sm text-neutral-900 dark:text-neutral-200 truncate max-w-32">
                  {workflow.owner || workflow.createdBy}
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar if running */}
          {workflow.isRunning && (
            <div className="mt-4">
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5">
                <div
                  className="bg-primary h-1.5 rounded-full"
                  style={{ width: `${workflow.progress || 0}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-neutral-700 dark:text-neutral-400">
                  Running...
                </span>
                <span className="text-xs text-neutral-700 dark:text-neutral-400">
                  {workflow.progress || 0}%
                </span>
              </div>
            </div>
          )}

          {/* Tags */}
          {workflow.tags && workflow.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1">
              {workflow.tags.map((tag: any, index: number) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Action footer */}
        <div className="flex justify-between items-center p-3 bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
          {/* Last update and execution history */}
          <div className="text-xs text-neutral-700 dark:text-neutral-400">
            <span>Updated: </span>
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }).format(new Date(workflow.updatedAt))}

            {/* Execution history button - now opens the modal */}
            {workflow.executionHistory &&
              workflow.executionHistory.length > 0 && (
                <Button
                  variant="link"
                  size="sm"
                  className="ml-2 p-0 h-auto text-xs text-primary dark:text-primary"
                  onClick={handleOpenHistoryModal}
                >
                  History
                </Button>
              )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  onClick={handleToggleStatus}
                  disabled={workflow.status === "archived"}
                >
                  <Icon
                    icon={
                      workflow.status === "active"
                        ? "mynaui:pause"
                        : "mynaui:play"
                    }
                    className="size-5"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>
                  {workflow.status === "active"
                    ? "Pause Workflow"
                    : "Activate Workflow"}
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  onClick={handleRunNow}
                  disabled={
                    workflow.isRunning || workflow.status === "archived"
                  }
                >
                  <Icon icon="mynaui:play-circle" className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Run Now</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  onClick={handleDuplicate}
                >
                  <Icon icon="mynaui:copy" className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Duplicate Workflow</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-600 dark:text-red-400 hover:bg-red-500/10 dark:hover:bg-red-500/20"
                  onClick={handleDelete}
                >
                  <Icon icon="mynaui:trash" className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Remove Workflow</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </Card>

      {/* History Modal */}
      {workflow.executionHistory && (
        <WorkflowHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={handleCloseHistoryModal}
          workflowName={workflow.name}
          executionHistory={workflow.executionHistory}
        />
      )}
    </>
  );
};

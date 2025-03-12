"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { Card } from "./card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Icon } from "@iconify/react";
import { useFlowStore } from "@/stores/flow-store";
import { Badge } from "./badge";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export const CardWorkflow = ({ workflow }: any) => {
  const router = useRouter();
  const setWorkflow = useFlowStore((s) => s.actions.setWorkflow);

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
    <Card className="w-full bg-card-foreground/10 shadow-md rounded-lg overflow-hidden border border-card-foreground/10 hover:shadow-lg transition-all duration-300 mb-10">
      {/* Status indicator and workflow name header */}
      <div className="flex items-center justify-between p-4 border-b border-card-foreground/10">
        <div className="flex items-center gap-3">
          <div
            className={`size-3 rounded-full ${
              workflow.status === "active"
                ? "bg-primary"
                : workflow.status === "paused"
                ? "bg-amber-500"
                : workflow.status === "archived"
                ? "bg-gray-500"
                : "bg-card-foreground/30"
            }`}
          ></div>
          <div>
            <h2 className="font-bold text-lg text-card-foreground">
              {workflow.name}
              {workflow.isTemplate && (
                <Badge className="ml-2 bg-blue-500/20 text-blue-500 text-xs">
                  Template
                </Badge>
              )}
            </h2>
            {workflow.description && (
              <p className="text-xs text-card-foreground/60 mt-1 line-clamp-1">
                {workflow.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {workflow.version && (
            <span className="text-xs text-card-foreground/60 mr-2">
              v{workflow.version}
            </span>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:bg-primary/10"
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
      <div className="p-4 bg-card-foreground/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Last run */}
          <div className="flex flex-col">
            <span className="text-xs text-card-foreground/60 mb-1">
              Last run
            </span>
            <div className="flex items-center">
              <Icon
                icon="mynaui:clock-circle"
                className="size-4 mr-1 text-card-foreground/60"
              />
              <span className="text-sm text-card-foreground/80">
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
            <span className="text-xs text-card-foreground/60 mb-1">
              Next run
            </span>
            <div className="flex items-center">
              <Icon
                icon="mynaui:calendar"
                className="size-4 mr-1 text-card-foreground/60"
              />
              <span className="text-sm text-card-foreground/80">
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
            <span className="text-xs text-card-foreground/60 mb-1">
              Frequency
            </span>
            <div className="flex items-center">
              <Icon
                icon="mynaui:refresh"
                className="size-4 mr-1 text-card-foreground/60"
              />
              <span className="text-sm text-card-foreground/80">
                {workflow.frequency || "Manual"}
              </span>
            </div>
          </div>

          {/* Success rate */}
          <div className="flex flex-col">
            <span className="text-xs text-card-foreground/60 mb-1">
              Success rate
            </span>
            <div className="flex items-center">
              <Icon
                icon="mynaui:chart-bar"
                className="size-4 mr-1 text-card-foreground/60"
              />
              <span className="text-sm text-card-foreground/80">
                {workflow.successRate ? `${workflow.successRate}%` : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* İkinci satır - Gelişmiş özellikler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {/* Ortalama çalışma süresi */}
          {workflow.averageRuntime !== undefined && (
            <div className="flex flex-col">
              <span className="text-xs text-card-foreground/60 mb-1">
                Avg. Runtime
              </span>
              <div className="flex items-center">
                <Icon
                  icon="mynaui:stopwatch"
                  className="size-4 mr-1 text-card-foreground/60"
                />
                <span className="text-sm text-card-foreground/80">
                  {formatRuntimeDuration(workflow.averageRuntime)}
                </span>
              </div>
            </div>
          )}

          {/* Son hata */}
          {workflow.lastError && (
            <div className="flex flex-col">
              <span className="text-xs text-card-foreground/60 mb-1">
                Last Error
              </span>
              <div className="flex items-center">
                <Icon
                  icon="mynaui:warning"
                  className="size-4 mr-1 text-red-500"
                />
                <span className="text-sm text-red-500 truncate max-w-32">
                  {workflow.lastError}
                </span>
              </div>
            </div>
          )}

          {/* Öncelik */}
          {workflow.priority && (
            <div className="flex flex-col">
              <span className="text-xs text-card-foreground/60 mb-1">
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

          {/* Oluşturan kişi */}
          <div className="flex flex-col">
            <span className="text-xs text-card-foreground/60 mb-1">
              {workflow.owner ? "Owner" : "Created by"}
            </span>
            <div className="flex items-center">
              <Icon
                icon="mynaui:user"
                className="size-4 mr-1 text-card-foreground/60"
              />
              <span className="text-sm text-card-foreground/80 truncate max-w-32">
                {workflow.owner || workflow.createdBy}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar if running */}
        {workflow.isRunning && (
          <div className="mt-4">
            <div className="w-full bg-card-foreground/10 rounded-full h-1.5">
              <div
                className="bg-primary h-1.5 rounded-full"
                style={{ width: `${workflow.progress || 0}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-card-foreground/60">
                Running...
              </span>
              <span className="text-xs text-card-foreground/60">
                {workflow.progress || 0}%
              </span>
            </div>
          </div>
        )}

        {/* Etiketler */}
        {workflow.tags && workflow.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {workflow.tags.map((tag: any) => (
              <Badge variant="outline" className="text-xs bg-card-foreground/5">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Action footer */}
      <div className="flex justify-between items-center p-3 bg-card-foreground/10 border-t border-card-foreground/10">
        {/* Son güncelleme ve çalıştırma geçmişi */}
        <div className="text-xs text-card-foreground/60">
          <span>Updated: </span>
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(new Date(workflow.updatedAt))}

          {/* Çalıştırma geçmişi */}
          {workflow.executionHistory &&
            workflow.executionHistory.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="link"
                    size="sm"
                    className="ml-2 p-0 h-auto text-xs text-primary"
                  >
                    History
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-2">
                  <h4 className="text-sm font-medium mb-2">
                    Execution History
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {workflow.executionHistory.map((run: any) => (
                      <div
                        key={run.id}
                        className="text-xs border-l-2 pl-2 py-1"
                        style={{
                          borderColor:
                            run.status === "success"
                              ? "rgb(34, 197, 94)"
                              : run.status === "failure"
                              ? "rgb(239, 68, 68)"
                              : "rgb(168, 162, 158)",
                        }}
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">
                            {format(new Date(run.startTime), "MMM dd, yyyy")}
                          </span>
                          <span
                            className={
                              run.status === "success"
                                ? "text-green-500"
                                : run.status === "failure"
                                ? "text-red-500"
                                : "text-gray-500"
                            }
                          >
                            {run.status}
                          </span>
                        </div>
                        <div className="text-card-foreground/60 mt-1">
                          {format(new Date(run.startTime), "HH:mm")} -{" "}
                          {format(new Date(run.endTime), "HH:mm")}
                        </div>
                        {run.error && (
                          <div className="text-red-500 mt-1">{run.error}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-card-foreground/70 hover:bg-card-foreground/10"
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
                className="text-card-foreground/70 hover:bg-card-foreground/10"
                onClick={handleRunNow}
                disabled={workflow.isRunning || workflow.status === "archived"}
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
                className="text-card-foreground/70 hover:bg-card-foreground/10"
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
                className="text-red-500 hover:bg-red-500/10"
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
  );
};

// Skeleton component for loading state
export const CardWorkflowSkeleton = () => {
  return (
    <Card className="w-full bg-card-foreground/10 shadow-md rounded-lg overflow-hidden border border-card-foreground/10 animate-pulse mb-10">
      {/* Header skeleton */}
      <div className="flex items-center justify-between p-4 border-b border-card-foreground/10">
        <div className="flex items-center gap-3">
          <div className="size-3 rounded-full bg-card-foreground/20"></div>
          <div>
            <div className="h-6 w-48 bg-card-foreground/20 rounded"></div>
            <div className="h-3 w-64 bg-card-foreground/20 rounded mt-2"></div>
          </div>
        </div>

        <div className="size-8 rounded-md bg-card-foreground/20"></div>
      </div>

      {/* Workflow details skeleton */}
      <div className="p-4 bg-card-foreground/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="flex flex-col" key={i}>
              <div className="h-3 w-16 bg-card-foreground/20 rounded mb-2"></div>
              <div className="flex items-center">
                <div className="size-4 mr-1 bg-card-foreground/20 rounded"></div>
                <div className="h-4 w-24 bg-card-foreground/20 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Second row skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="flex flex-col" key={i}>
              <div className="h-3 w-16 bg-card-foreground/20 rounded mb-2"></div>
              <div className="flex items-center">
                <div className="size-4 mr-1 bg-card-foreground/20 rounded"></div>
                <div className="h-4 w-24 bg-card-foreground/20 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Tags skeleton */}
        <div className="mt-4 flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-5 w-16 bg-card-foreground/20 rounded-full"
            ></div>
          ))}
        </div>
      </div>

      {/* Action footer skeleton */}
      <div className="flex justify-between items-center p-3 bg-card-foreground/10 border-t border-card-foreground/10">
        {/* Last updated timestamp skeleton */}
        <div className="h-3 w-40 bg-card-foreground/20 rounded"></div>

        {/* Action buttons skeleton */}
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="size-8 rounded-md bg-card-foreground/20"
            ></div>
          ))}
        </div>
      </div>
    </Card>
  );
};

"use client";

import React from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { DynamicModal } from "../shared/modal/modal";

interface ExecutionHistoryItem {
  id: string;
  status: "success" | "failure" | "running" | "in-progress" | string;
  startTime: string;
  endTime: string | null;
  error?: string;
  actions?: string[];
  details?: Record<string, any>;
}

interface WorkflowHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflowName: string;
  executionHistory: ExecutionHistoryItem[];
}

export const WorkflowHistoryModal: React.FC<WorkflowHistoryModalProps> = ({
  isOpen,
  onClose,
  workflowName,
  executionHistory,
}) => {
  const [selectedExecution, setSelectedExecution] =
    React.useState<ExecutionHistoryItem | null>(null);

  const getStatusBadge = (status: string) => {
    let bgColor, textColor, icon;

    switch (status.toLowerCase()) {
      case "success":
        bgColor = "bg-green-100 dark:bg-green-900/30";
        textColor = "text-green-700 dark:text-green-400";
        icon = "mynaui:check";
        break;
      case "failure":
        bgColor = "bg-red-100 dark:bg-red-900/30";
        textColor = "text-red-700 dark:text-red-400";
        icon = "mynaui:times";
        break;
      case "running":
      case "in-progress":
        bgColor = "bg-blue-100 dark:bg-blue-900/30";
        textColor = "text-blue-700 dark:text-blue-400";
        icon = "mynaui:refresh";
        break;
      default:
        bgColor = "bg-neutral-100 dark:bg-neutral-800";
        textColor = "text-neutral-700 dark:text-neutral-400";
        icon = "mynaui:information";
    }

    return (
      <div
        className={`inline-flex items-center px-2.5 py-1 rounded-full ${bgColor}`}
      >
        <Icon icon={icon} className={`size-4 mr-1.5 ${textColor}`} />
        <span className={`text-xs font-medium capitalize ${textColor}`}>
          {status}
        </span>
      </div>
    );
  };

  const handleDetailsClick = (execution: ExecutionHistoryItem) => {
    setSelectedExecution(execution === selectedExecution ? null : execution);
  };

  // Function to format duration based on start and end time
  const formatDuration = (startTime: string, endTime: string | null) => {
    const start = new Date(startTime);

    // If endTime is null (still running), use current time
    const end = endTime ? new Date(endTime) : new Date();

    const durationMs = end.getTime() - start.getTime();
    const durationSec = Math.floor(durationMs / 1000);
    const durationMin = Math.floor(durationSec / 60);
    const durationHours = Math.floor(durationMin / 60);

    let durationText = "";
    if (durationHours > 0) {
      durationText = `${durationHours}h ${durationMin % 60}m ${
        durationSec % 60
      }s`;
    } else if (durationMin > 0) {
      durationText = `${durationMin}m ${durationSec % 60}s`;
    } else {
      durationText = `${durationSec}s`;
    }

    // Add indicator if still running
    if (!endTime) {
      durationText += " (running)";
    }

    return durationText;
  };

  return (
    <DynamicModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Execution History - ${workflowName}`}
      size="full"
    >
      <div className="space-y-6 max-w-full">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  End Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {executionHistory.map((execution) => {
                const startTime = new Date(execution.startTime);
                const isRunning = !execution.endTime;
                const durationText = formatDuration(
                  execution.startTime,
                  execution.endTime
                );

                const isSelected = selectedExecution?.id === execution.id;

                return (
                  <React.Fragment key={execution.id}>
                    <tr
                      className={`hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer ${
                        isSelected ? "bg-neutral-50 dark:bg-neutral-800/50" : ""
                      }`}
                      onClick={() => handleDetailsClick(execution)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(execution.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300">
                        {format(startTime, "MMM dd, yyyy HH:mm:ss")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300">
                        {isRunning ? (
                          <span className="italic text-blue-600 dark:text-blue-400">
                            In Progress
                          </span>
                        ) : (
                          format(
                            new Date(execution.endTime!),
                            "MMM dd, yyyy HH:mm:ss"
                          )
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300">
                        {durationText}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Button
                          variant={isSelected ? "default" : "ghost"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDetailsClick(execution);
                          }}
                          className={isSelected ? "text-white" : "text-primary"}
                        >
                          {isSelected ? "Hide Details" : "View Details"}
                        </Button>
                      </td>
                    </tr>
                    {isSelected && (
                      <tr className="bg-neutral-50 dark:bg-neutral-800/30">
                        <td colSpan={5} className="px-6 py-4">
                          <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 shadow-sm">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                                    Execution Information
                                  </h3>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                                    <div>
                                      <span className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                                        ID
                                      </span>
                                      <div className="flex items-center">
                                        <p className="text-sm font-mono break-all text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                                          {execution.id.substring(0, 20)}
                                          {execution.id.length > 20
                                            ? "..."
                                            : ""}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <span className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                                        Status
                                      </span>
                                      <div>
                                        {getStatusBadge(execution.status)}
                                      </div>
                                    </div>
                                    <div>
                                      <span className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                                        Start Time
                                      </span>
                                      <p className="text-sm text-neutral-800 dark:text-neutral-200">
                                        {format(
                                          startTime,
                                          "MMM dd, yyyy HH:mm:ss"
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      <span className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                                        End Time
                                      </span>
                                      <p className="text-sm text-neutral-800 dark:text-neutral-200">
                                        {isRunning ? (
                                          <span className="italic text-blue-600 dark:text-blue-400">
                                            In Progress
                                          </span>
                                        ) : (
                                          format(
                                            new Date(execution.endTime!),
                                            "MMM dd, yyyy HH:mm:ss"
                                          )
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      <span className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                                        Duration
                                      </span>
                                      <p className="text-sm text-neutral-800 dark:text-neutral-200">
                                        {durationText}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {execution.actions &&
                                  execution.actions.length > 0 && (
                                    <div>
                                      <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                                        Actions Performed
                                      </h3>
                                      <ul className="space-y-1 bg-neutral-50 dark:bg-neutral-800 rounded-md p-3">
                                        {execution.actions.map(
                                          (action, index) => (
                                            <li
                                              key={index}
                                              className="text-sm flex items-start"
                                            >
                                              <Icon
                                                icon="mynaui:check"
                                                className="size-4 mt-0.5 mr-2 text-green-600 dark:text-green-400"
                                              />
                                              <span className="text-neutral-800 dark:text-neutral-200">
                                                {action}
                                              </span>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  )}
                              </div>

                              <div className="space-y-4">
                                {execution.error && (
                                  <div>
                                    <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                                      Error Details
                                    </h3>
                                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-sm text-red-800 dark:text-red-300 font-mono overflow-x-auto">
                                      {execution.error}
                                    </div>
                                  </div>
                                )}

                                {execution.details &&
                                  Object.keys(execution.details).length > 0 && (
                                    <div>
                                      <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2 flex items-center">
                                        <Icon
                                          icon="mynaui:code"
                                          className="size-4 mr-1 text-primary"
                                        />
                                        Additional Details
                                      </h3>
                                      <div className="p-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md font-mono text-xs text-neutral-800 dark:text-neutral-200 overflow-x-auto max-h-60">
                                        <pre className="whitespace-pre-wrap">
                                          {JSON.stringify(
                                            execution.details,
                                            null,
                                            2
                                          )}
                                        </pre>
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DynamicModal>
  );
};

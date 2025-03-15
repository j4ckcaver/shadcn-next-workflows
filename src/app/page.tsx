"use client";

import Header from "@/components/shared/header/header";
import { DynamicModal } from "@/components/shared/modal/modal";
import WorkflowAdd from "@/components/ui/add-workflow-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardWorkflow } from "@/components/ui/card-workflow";
import { Skeleton } from "@/components/ui/skeleton";
import { getWorkflows } from "@/services/workflow";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

export default function Home() {
  // Query Client'ı alıyoruz - bu, önbelleği yenilemek için kullanılacak
  const queryClient = useQueryClient();

  const { isPending, data } = useQuery({
    queryKey: ["workflows"],
    queryFn: () => getWorkflows(),
  });

  const [isCardWorkflowAddModalOpen, setIsCardWorkflowAddModalOpen] =
    useState(false);

  // Open add workflow modal
  const handleOpenWorkflowAddModal = () => {
    setIsCardWorkflowAddModalOpen(true);
  };

  // Close add workflow modal and refresh workflows
  const handleCloseWorkflowAddModal = () => {
    setIsCardWorkflowAddModalOpen(false);
    // Yeni workflow eklendikten sonra listeyi yenileme
    queryClient.invalidateQueries({ queryKey: ["workflows"] });
  };

  // Yeni workflow başarıyla eklendi callback'i
  const handleWorkflowAdded = () => {
    // Modal'ı kapat
    setIsCardWorkflowAddModalOpen(false);
    // Workflow listesini yenile
    queryClient.invalidateQueries({ queryKey: ["workflows"] });
  };

  return (
    <React.Fragment>
      <main className="h-auto w-full ">
        <Header />
        <div className="container mx-auto mt-10">
          <div className="inline-flex w-full justify-between items-center gap-2">
            <h1 className="text-2xl font-bold">Workflows</h1>
            <Button
              variant="default"
              size="default"
              className="text-primary-foreground font-bold"
              onClick={handleOpenWorkflowAddModal}
            >
              <Icon
                icon="mynaui:plus"
                className="size-6 text-primary-foreground"
              />
              Create Workflow
            </Button>
          </div>
          <div className="my-10 ">
            {!isPending ? (
              data ? (
                data.map((workflow) => (
                  <CardWorkflow key={workflow.id} workflow={workflow} />
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500 dark:text-gray-400">
                    No workflows found. Create your first workflow!
                  </p>
                </div>
              )
            ) : (
              <div className="space-y-3">
                <Skeleton className="h-28 w-full rounded-lg" />
                <Skeleton className="h-28 w-full rounded-lg" />
                <Skeleton className="h-28 w-full rounded-lg" />
              </div>
            )}
          </div>
          {/* Spacer */}
          <div className="w-full h-64 block"></div>
        </div>
      </main>
      {/* Add Workflow Modal */}
      <DynamicModal
        isOpen={isCardWorkflowAddModalOpen}
        onClose={handleCloseWorkflowAddModal}
        title={`Add New Workflow`}
        size="lg"
        titleIsShown={false}
      >
        <WorkflowAdd onSuccess={handleWorkflowAdded} />
      </DynamicModal>
    </React.Fragment>
  );
}

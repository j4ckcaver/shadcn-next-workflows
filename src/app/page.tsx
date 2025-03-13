"use client";

import Header from "@/components/shared/header/header";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/button-theme-toggle";
import { Card } from "@/components/ui/card";
import { CardWorkflow } from "@/components/ui/card-workflow";
import { Skeleton } from "@/components/ui/skeleton";
import { getWorkflows } from "@/services/get-workflows";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { isPending, data } = useQuery({
    queryKey: ["workflows"],
    queryFn: () => getWorkflows(),
  });

  return (
    <main className="h-auto w-full ">
      <Header />
      <div className="container mx-auto mt-10">
        <div className="inline-flex w-full justify-between items-center gap-2">
          <h1 className="text-2xl font-bold">Workflows</h1>
          <Button
            variant="default"
            size="default"
            className="text-primary-foreground font-bold"
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
            data?.map((workflow) => (
              <CardWorkflow key={workflow.id} workflow={workflow} />
            ))
          ) : (
            <p>loading..</p> //TODO add loading 
          )}
        </div>
        {/* Spacer */}
        <div className="w-full h-64 block"></div>
      </div>
    </main>
  );
}

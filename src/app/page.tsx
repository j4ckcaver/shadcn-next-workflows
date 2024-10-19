"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/button-theme-toggle";
import { Card, CardHeader } from "@/components/ui/card";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <main className="h-full w-full ">
      <Card className=" h-14  from-primary/10 p-2 to-transparent rounded-none bg-gradient-to-r w-full  items-center flex justify-between border-b border-card-foreground/10">
        <div className="inline-flex items-center gap-2">
          <Icon
            icon="hugeicons:workflow-square-03"
            className="size-6 text-card-foreground"
          />
          <h1 className="text-card-foreground font-bold">
            Shadn Next Workflows
          </h1>
        </div>

        <ModeToggle />
      </Card>
      <div className="p-4">
        <div className="inline-flex w-full justify-between items-center gap-2">
          <h1 className="text-xl font-bold">( 3 ) Workflows</h1>
          <Button
            variant="default"
            size="default"
            className="text-primary-foreground font-bold"
          >
            <Icon icon="mynaui:plus" className="size-6 text-primary-foreground" />
            Create Workflow
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4 ">
          <Card className="bg-card-foreground/10 min-h-40 p-0 flex flex-col justify-between">
            <CardHeader className="relative">
              <h1 className="text-card-foreground font-bold">
                Shadn Next Workflows
              </h1>

              <Button
                variant="ghost"
                size="icon"
                className="text-primary absolute right-2 top-0"
                onClick={() => {
                  router.push("/workflow/1");
                }}
              >
                <Icon icon="mynaui:edit" className="size-6 text-primary" />
              </Button>
            </CardHeader>

            <div className="inline-flex  justify-between items-center gap-2 border-t border-card-foreground/10 w-full">
              <p className="text-card-foreground/60 text-xs p-2">
                Updated:{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                }).format(new Date("10/19/2024, 11:14:46"))}
              </p>
              <div className="flex items-center p-1">
                <Button variant="ghost" size="icon">
                  <Icon
                    icon="mynaui:copy"
                    className="size-6 text-card-foreground/70"
                  />
                </Button>
                <Button variant="ghost" size="xs">
                  <Icon icon="mynaui:trash" className="size-6 text-red-500" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

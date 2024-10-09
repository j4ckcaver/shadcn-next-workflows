"use client";

import {} from "@/stores/add-node-on-edge-drop-state";
import { ReactFlowProvider } from "@xyflow/react";
import { FlowBuilder } from "@/components/flow-builder/flow-builder";

export default function Home() {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col text-white h-dvh divide-y divide-zinc-300">
        <FlowBuilder />
      </div>
    </ReactFlowProvider>
  );
}

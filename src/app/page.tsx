"use client";

import {} from "@/stores/add-node-on-edge-drop-state";
import { ReactFlowProvider } from "@xyflow/react";
import { FlowBuilder } from "@/components/flow-builder/flow-builder";

export default function Home() {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-dvh">
        <FlowBuilder />
      </div>
    </ReactFlowProvider>
  );
}

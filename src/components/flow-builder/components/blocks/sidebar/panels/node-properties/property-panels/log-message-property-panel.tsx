import { LogMessageNodeData } from "@/components/flow-builder/components/blocks/nodes/log-message-node/log-message.node";
import { BuilderNodeType } from "@/components/flow-builder/components/blocks/types";

import { Textarea } from "@/components/ui/textarea";

type LogMessageNodePropertyPanelProps = Readonly<{
  id: string;
  type: BuilderNodeType;
  data: LogMessageNodeData;
  updateData: (data: Partial<LogMessageNodeData>) => void;
}>;

export default function LogMessageNodePropertyPanel({
  id,
  data,
  updateData,
}: LogMessageNodePropertyPanelProps) {
  return (
    <div className="flex flex-col gap-4.5 p-4">
      <div className="text-xs text-card-foreground/20 self-end ">{id}</div>

      <div className="flex flex-col">
        <div className="text-xs text-card-foreground/60 font-semibold">
          Message
        </div>

        <div className="mt-2 flex">
          <Textarea
            value={data.message}
            onChange={(e) => updateData({ message: e.target.value })}
            placeholder="Type your message here..."
            className="min-h-32 w-full resize-none "
          />
        </div>
      </div>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

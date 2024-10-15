import CustomHandle from "@/components/flow-builder/components/handles/custom-handler";
import { Position } from "@xyflow/react";

type NodeOptionProps = Readonly<{
  id: string;
  option: { id: number; value: string };
  isConnectable: boolean;
}>;

export function NodeOption({ id, isConnectable, option }: NodeOptionProps) {
  return (
    <div className="relative h-10 flex items-center gap-x-2 px-4 -mx-4">
      <div className="flex shrink-0 items-center text-xs gap-x-0.5">
        {option.id + 1} -{" "}
      </div>

      <input
        type="text"
        value={option.value}
        readOnly
        className="h-8 w-full border border-dark-50 rounded-md bg-dark-400 px-2.5 text-sm font-medium shadow-sm outline-none transition hover:(bg-dark-300/60) read-only:(hover:bg-dark-300/30)"
      />

      <CustomHandle
        type="source"
        id={id}
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
}

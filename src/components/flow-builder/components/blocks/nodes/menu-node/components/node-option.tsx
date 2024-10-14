import CustomHandle from "@/components/flow-builder/components/handles/custom-handler";
import { Icon } from "@iconify/react";
import { Position } from "@xyflow/react";

type NodeOptionProps = Readonly<{
  id: string;
  path: { id: string; value: string };
  onRemove: (id: string) => void;
  isConnectable: boolean;
}>;

export function NodeOption({
  id,
  onRemove,
  isConnectable,
  path,
}: NodeOptionProps) {
  return (
    <div className="relative  h-10 flex items-center gap-x-2 px-4 -mx-4">
      <div className="flex shrink-0 items-center gap-x-0.5">
        <button
          type="button"
          className="size-8 flex items-center justify-center border border-dark-50 rounded-md bg-transparent text-red-400 outline-none transition active:(border-dark-200 bg-dark-400/50) hover:(bg-dark-100)"
          onClick={() => onRemove(id)}
        >
          <Icon icon={"mynaui:trash"} className="size-4" />
        </button>
      </div>

      <input
        type="text"
        value={path.value}
        readOnly
        className="h-8 w-full border border-dark-50 rounded-md bg-dark-400 px-2.5 text-sm font-medium shadow-sm outline-none transition hover:(bg-dark-300/60) read-only:(hover:bg-dark-300/30)"
      />

      <CustomHandle
        type="source"
        id={id}
        position={Position.Right}
        isConnectable={isConnectable}
        className="!top-5 !hover:ring-2 !hover:ring-purple-500/50)"
      />
    </div>
  );
}

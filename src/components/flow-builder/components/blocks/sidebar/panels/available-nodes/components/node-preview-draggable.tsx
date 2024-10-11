import { NODE_TYPE_DRAG_DATA_FORMAT } from "@/contants/symbols";
import { useInsertNode } from "@/hooks/use-insert-node";
import { type DragEvent, type ReactNode, useCallback } from "react";
import { BuilderNodeType } from "../../../../types";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

type NodePreviewDraggableProps = Readonly<{
  icon: string | ReactNode;
  title: string;
  description: string;
  type: string;
  children?: never;
  isMobileView: boolean;
  setActivePanel: (
    panel: "node-properties" | "available-nodes" | "none"
  ) => void;
  insertNode: ReturnType<typeof useInsertNode>;
}>;

export function NodePreviewDraggable({
  icon,
  title,
  description,
  type,
  isMobileView,
  setActivePanel,
  insertNode,
}: NodePreviewDraggableProps) {
  const onDragStart = useCallback(
    (e: DragEvent, type: string) => {
      if (isMobileView) return;

      e.dataTransfer.setData(NODE_TYPE_DRAG_DATA_FORMAT, type);
      e.dataTransfer.effectAllowed = "move";
    },
    [isMobileView]
  );

  const onClick = useCallback(() => {
    if (!isMobileView) return;

    insertNode(type as BuilderNodeType);
    setActivePanel("none");
  }, [insertNode, isMobileView, setActivePanel, type]);

  return (
    <div
      className={cn(
        "flex cursor-grab select-none gap-2 border border-card-foreground/10 rounded-xl bg-card p-2.5 shadow-sm transition hover:ring-2 hover:ring-primary/50",
        isMobileView && "active:opacity-70 active:scale-95"
      )}
      onClick={onClick}
      onDragStart={(e) => onDragStart(e, type)}
      draggable
      data-vaul-no-drag
    >
      <div className="shrink-0">
        <div className="size-10 flex items-center justify-center border border-card-foreground/10 rounded-xl bg-card">
          {typeof icon === "string" ? (
            <Icon icon={icon} className="size-6 text-card-foreground/80" />
          ) : (
            icon
          )}
        </div>
      </div>

      <div className="ml-1 flex grow flex-col">
        <div className="mt-px text-sm font-medium leading-normal">{title}</div>

        <div className="line-clamp-3 mt-1 text-xs text-card-foreground/60 leading-normal">
          {description}
        </div>
      </div>
    </div>
  );
}

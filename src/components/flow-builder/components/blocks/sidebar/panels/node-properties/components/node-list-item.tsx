import { cn, truncateMiddle } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { isEmpty } from "radash";

import type { ComponentPropsWithoutRef } from "react";

type NodeListItemProps = Readonly<
  ComponentPropsWithoutRef<"button"> & {
    icon: string;
    title: string;
    id?: string;
    selected?: boolean;
    pseudoSelected?: boolean;
  }
>;

export function NodeListItem({
  id,
  title,
  className,
  icon,
  selected,
  pseudoSelected,
  ...props
}: NodeListItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "h-8 select-none flex items-center justify-between gap-4 border border-transparent rounded-lg bg-transparent px-2.5 text-sm outline-none transition",
        selected
          ? "border-primary/60 bg-primary"
          : "active:bg-card active:border-card/20 hover:bg-card-foreground/20",
        className
      )}
      {...props}
    >
      <div className="flex items-center">
        <Icon icon={icon} className={`size-4`} />
        <div className="ml-2.5 flex items-center text-xs font-medium leading-none tracking-wide uppercase opacity-80">
          <span className="translate-y-px">{title}</span>
        </div>
      </div>

      {id && !isEmpty(id) && (
        <div className="rounded-md bg-card px-2 py-1.5 text-2.5 text-card-foreground/80 font-semibold leading-none tracking-wide">
          {truncateMiddle(id, 12)}
        </div>
      )}
    </button>
  );
}

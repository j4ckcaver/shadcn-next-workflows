import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type SidebarButtonItemProps = Readonly<
  ComponentPropsWithoutRef<"button"> & {
    active?: boolean;
  }
>;

export default function SidebarButtonItem({
  children,
  className,
  active,
  ...props
}: SidebarButtonItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "size-8 flex items-center justify-center rounded-lg border border-transparent outline-none transition",

        active
          ? "border-primary bg-primary"
          : "bg-transparent hover:bg-card-foreground/20 active:bg-card active:border-card",

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

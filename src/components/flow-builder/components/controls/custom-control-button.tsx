import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type CustomControlButtonProps = Readonly<ComponentPropsWithoutRef<"button">>;

export default function CustomControlButton({
  children,
  className,
  ...props
}: CustomControlButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "border-none flex text-zinc-500 hover:text-zinc-300 disabled:cursor-not-allowed disabled:pointer-events-none items-center justify-center bg-transparent size-7  rounded-md transition active:bg-zinc-600 hover:bg-zinc-600",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

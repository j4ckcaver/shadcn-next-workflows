"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  titleIsShown?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export const DynamicModal: React.FC<DynamicModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  titleIsShown = true,
}) => {
  // Size classes based on the size prop
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-[calc(100vw-30%)]",
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`${sizeClasses[size]} bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-0 overflow-hidden border border-neutral-200 dark:border-neutral-700`}
      >
        <div className="max-h-[70vh] overflow-y-auto">
          {titleIsShown && (
            <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
              <p className="text-lg font-bold">{title}</p>
            </div>
          )}

          {children}
        </div>

        {footer && (
          <DialogFooter className="px-4 py-3 bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Pre-built footer options for common use cases
export const ModalFooterActions: React.FC<{
  onClose: () => void;
  onConfirm?: () => void;
  closeLabel?: string;
  confirmLabel?: string;
  isConfirmLoading?: boolean;
  isConfirmDisabled?: boolean;
  variant?: "default" | "destructive";
}> = ({
  onClose,
  onConfirm,
  closeLabel = "Cancel",
  confirmLabel = "Confirm",
  isConfirmLoading = false,
  isConfirmDisabled = false,
  variant = "default",
}) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onClose}
        className="text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600"
      >
        {closeLabel}
      </Button>
      {onConfirm && (
        <Button
          variant={variant}
          size="sm"
          onClick={onConfirm}
          disabled={isConfirmDisabled}
          className={
            variant === "destructive"
              ? "bg-red-600 hover:bg-red-700 text-white"
              : ""
          }
        >
          {isConfirmLoading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin size-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : (
            confirmLabel
          )}
        </Button>
      )}
    </div>
  );
};

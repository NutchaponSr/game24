import { JSX, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const useConfirm = (props: {
  title?: string;
  description?: string;
  className?: string;
}): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

  const confirmStart = () => new Promise((resolve) => {
    setPromise({ resolve });
  });

  const handleClose = () => {
    setPromise(null);
  }

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  }

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  }

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent className={cn(props.className)}>
        <DialogHeader className="items-center">
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col w-full space-y-1.5">
          <Button variant="danger" onClick={handleConfirm}>
            Continue
          </Button>
          <Button variant="primaryOutline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirmStart]
}
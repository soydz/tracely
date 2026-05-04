"use client";

import { AlertDialog, Button } from "@heroui/react";

interface ConfirmDeleteAlertProps {
  trigger: React.ReactNode;
  onConfirm: () => void;
  title: string;
  description: string;
}

export function ConfirmDeleteAlert({
  trigger,
  onConfirm,
  title,
}: Readonly<ConfirmDeleteAlertProps>) {
  return (
    <AlertDialog>
      {trigger}
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-md bg-surface/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header className="font-serif text-2xl tracking-tight text-foreground">
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>{title}</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className="text-muted leading-relaxed text-center">
              <p>This will permanently delete. This action cannot be undone.</p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                slot="close"
                variant="ghost"
                className="text-muted hover:text-foreground"
              >
                Cancel
              </Button>
              <Button
                slot="close"
                variant="danger"
                className="bg-danger text-white font-medium hover:bg-danger/90"
                onClick={onConfirm}
              >
                Confirm Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}

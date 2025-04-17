"use client";

import { toast } from "sonner";

function showToast(type: string, title: string, description?: string) {
  const toastOptions = {
    description: description ? (
      <span className="text-muted-foreground">{description}</span>
    ) : undefined,
  };

  switch (type) {
    case "success":
      toast.success(title, toastOptions);
      break;
    case "error":
      toast.error(title, toastOptions);
      break;
    case "info":
      toast.info(title, toastOptions);
      break;
    default:
      toast(title, toastOptions);
  }
}

export { showToast };

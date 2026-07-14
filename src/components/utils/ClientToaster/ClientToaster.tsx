"use client";

import { Toaster } from "react-hot-toast";

export function ClientToaster() {
  return (
    <Toaster
      position="bottom-center"
      gutter={12}
      containerClassName="toast-stack"
      toastOptions={{
        duration: 5000,
        removeDelay: 220,
      }}
    />
  );
}

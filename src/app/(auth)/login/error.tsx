"use client";

import Dialog from "@/views/components/base/Dialog";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Dialog
      open
      title={"Something went wrong!"}
      actionButton={[{ text: "Retry", onClick: reset }]}
    >
        <code>{error.message}</code>
    </Dialog>
  );
}

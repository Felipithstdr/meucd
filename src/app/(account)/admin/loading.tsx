'use client';

import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner
        color="success"
        label="Carregando..."
        variant="gradient"
        classNames={{ label: "dark:text-black" }}
      />
    </div>
  );
}

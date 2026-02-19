"use client"

import { Toaster as SonnerToaster } from "sonner"

function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        style: {
          fontFamily: "var(--font-inter), Inter, sans-serif",
        },
      }}
      richColors
    />
  )
}

export { Toaster }

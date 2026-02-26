import { plantillas } from "@kosmos/mock-data"
import EditorLayout from "./editor-layout"

export function generateStaticParams() {
  return [
    ...plantillas.map((p) => ({ id: p.id })),
    { id: "nueva" },
  ]
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <EditorLayout>{children}</EditorLayout>
}

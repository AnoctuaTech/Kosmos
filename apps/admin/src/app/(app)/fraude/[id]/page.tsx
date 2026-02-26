import { alertasFraude } from "@kosmos/mock-data"
import FraudeDetallePage from "./fraude-detalle"

export function generateStaticParams() {
  return alertasFraude.map((a) => ({ id: a.id }))
}

export default function Page() {
  return <FraudeDetallePage />
}

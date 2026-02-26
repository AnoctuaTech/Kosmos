import { estudios } from "@kosmos/mock-data"
import DashboardEstudioPage from "./dashboard-estudio"

export function generateStaticParams() {
  return estudios.map((e) => ({ id: e.id }))
}

export default function Page() {
  return <DashboardEstudioPage />
}

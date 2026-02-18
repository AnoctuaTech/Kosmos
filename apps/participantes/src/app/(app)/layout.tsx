import { ParticipantesLayout } from "../../components/participantes-layout"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <ParticipantesLayout>{children}</ParticipantesLayout>
}

"use client"

import { ParticipantesHeader } from "./participantes-header"
import { ParticipantesSidebar } from "./participantes-sidebar"
import { ParticipantesBottomNav } from "./participantes-bottom-nav"

interface ParticipantesLayoutProps {
  children: React.ReactNode
  puntos?: number
}

export function ParticipantesLayout({
  children,
  puntos,
}: ParticipantesLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background-gray">
      <ParticipantesSidebar />

      <div className="flex flex-1 flex-col">
        <ParticipantesHeader puntos={puntos} />

        <main className="flex-1 pb-20 md:pb-0">{children}</main>

        <ParticipantesBottomNav />
      </div>
    </div>
  )
}

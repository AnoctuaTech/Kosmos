"use client"

import { useState } from "react"
import { Button, Card, CardContent, Badge } from "@kosmos/ui"
import { Send, MessageSquare, CheckCircle2 } from "lucide-react"

const ticketsExistentes = [
  {
    id: "tkt-001",
    asunto: "No puedo canjear mis puntos",
    estado: "abierto" as const,
    fecha: "15 feb 2026",
  },
  {
    id: "tkt-002",
    asunto: "Encuesta se cierra inesperadamente",
    estado: "en_progreso" as const,
    fecha: "10 feb 2026",
  },
  {
    id: "tkt-003",
    asunto: "Pago de redención no recibido",
    estado: "cerrado" as const,
    fecha: "28 ene 2026",
  },
]

const estadoVariant: Record<string, "warning" | "primary" | "default"> = {
  abierto: "warning",
  en_progreso: "primary",
  cerrado: "default",
}

const estadoLabel: Record<string, string> = {
  abierto: "Abierto",
  en_progreso: "En progreso",
  cerrado: "Cerrado",
}

export default function SoportePage() {
  const [asunto, setAsunto] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [enviado, setEnviado] = useState(false)

  function handleEnviar(e: React.FormEvent) {
    e.preventDefault()
    setEnviado(true)
    setAsunto("")
    setMensaje("")
    setTimeout(() => setEnviado(false), 3000)
  }

  return (
    <div className="px-4 py-6 md:px-8 animate-in">
      <h1 className="text-xl font-semibold text-foreground mb-6">Soporte</h1>

      <Card className="border-border/50 mb-6 shadow-sm">
        <CardContent className="p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">
            Nuevo ticket
          </h2>

          <form onSubmit={handleEnviar} className="space-y-3">
            <div>
              <label className="block text-[13px] font-medium text-foreground-secondary mb-1.5">
                Asunto
              </label>
              <input
                type="text"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                placeholder="Describe brevemente tu problema"
                className="w-full rounded-xl border border-border/60 bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/[0.08] transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-foreground-secondary mb-1.5">
                Mensaje
              </label>
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Explicá tu situación con detalle..."
                className="w-full rounded-xl border border-border/60 bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/[0.08] resize-none h-24 transition-all duration-200"
                required
              />
            </div>
            <Button type="submit" size="sm">
              <Send className="mr-1.5 h-3.5 w-3.5" />
              Enviar ticket
            </Button>
          </form>

          {enviado && (
            <div className="mt-3 flex items-center gap-2 text-sm text-success font-medium animate-in">
              <CheckCircle2 className="h-4 w-4" />
              Ticket enviado. Te contactaremos por email.
            </div>
          )}
        </CardContent>
      </Card>

      <h2 className="text-base font-semibold text-foreground mb-3">
        Tickets anteriores
      </h2>

      <div className="space-y-2">
        {ticketsExistentes.map((ticket) => (
          <Card key={ticket.id} className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-3.5 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background-gray">
                <MessageSquare className="h-4 w-4 text-foreground-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {ticket.asunto}
                </p>
                <p className="text-xs text-foreground-muted">{ticket.fecha}</p>
              </div>
              <Badge variant={estadoVariant[ticket.estado]}>
                {estadoLabel[ticket.estado]}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

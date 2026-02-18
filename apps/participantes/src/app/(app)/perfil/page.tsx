"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Card, CardContent, Badge } from "@kosmos/ui"
import { User, Shield, LogOut } from "lucide-react"

const participante = {
  nombre: "Carlos",
  apellidos: "Ramirez Solis",
  cedula: "1-0456-0789",
  email: "carlos@ejemplo.com",
  pais: "Costa Rica",
  nseNivel: "Medio",
  nseEstado: "vigente" as "vigente" | "vencido" | "pendiente",
  nseScore: 72,
}

const nseColores: Record<string, string> = {
  vigente: "success",
  vencido: "error",
  pendiente: "warning",
}

const nseLabels: Record<string, string> = {
  vigente: "Vigente",
  vencido: "Vencido",
  pendiente: "Pendiente",
}

export default function PerfilPage() {
  const router = useRouter()
  const [editando, setEditando] = useState(false)
  const [nombre, setNombre] = useState(participante.nombre)
  const [apellidos, setApellidos] = useState(participante.apellidos)

  const inputClasses =
    "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"

  return (
    <div className="px-4 py-6 md:px-8">
      <h1 className="text-xl font-semibold text-foreground mb-6">Mi perfil</h1>

      <Card className="border-border mb-4">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">
                {participante.nombre} {participante.apellidos}
              </p>
              <p className="text-sm text-foreground-secondary">
                {participante.email}
              </p>
            </div>
          </div>

          {editando ? (
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-[13px] font-medium text-foreground-secondary mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-foreground-secondary mb-1">
                  Apellidos
                </label>
                <input
                  type="text"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setEditando(false)}>
                  Guardar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setNombre(participante.nombre)
                    setApellidos(participante.apellidos)
                    setEditando(false)
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-foreground-secondary">Cedula</span>
                <span className="font-medium text-foreground">
                  {participante.cedula}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground-secondary">Pais</span>
                <span className="font-medium text-foreground">
                  {participante.pais}
                </span>
              </div>
              <button
                onClick={() => setEditando(true)}
                className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                Editar datos
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-border mb-4">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <Shield className="h-5 w-5 text-foreground-secondary" />
            </div>
            <h2 className="text-base font-semibold text-foreground">
              Perfil socioeconomico
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-foreground-secondary">Nivel NSE</span>
              <span className="font-semibold text-foreground">
                {participante.nseNivel}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-foreground-secondary">Score</span>
              <span className="font-medium text-foreground">
                {participante.nseScore}/100
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-foreground-secondary">Estado</span>
              <Badge
                variant={nseColores[participante.nseEstado] as "success" | "error" | "warning"}
              >
                {nseLabels[participante.nseEstado]}
              </Badge>
            </div>

            {participante.nseEstado === "vencido" && (
              <Button size="sm" variant="outline" className="w-full mt-2">
                Reactivar cuestionario NSE
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <button
        onClick={() => router.push("/login")}
        className="flex items-center gap-2 w-full rounded-lg border border-border bg-white px-5 py-3 text-sm font-medium text-foreground-secondary hover:bg-gray-50 transition-colors"
      >
        <LogOut className="h-4 w-4" />
        Cerrar sesion
      </button>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { premios, paises } from "@kosmos/mock-data"
import type { Premio } from "@kosmos/types"
import {
  KPICard,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  Input,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Separator,
} from "@kosmos/ui"
import {
  Gift,
  Package,
  TrendingUp,
  DollarSign,
  Plus,
  Pencil,
  Search,
  Smartphone,
  Award,
} from "lucide-react"

const gradientes: Record<string, string> = {
  amazon: "from-amber-500 to-orange-600",
  sinpe: "from-green-500 to-emerald-700",
  transferencia: "from-blue-600 to-indigo-800",
  recarga: "from-pink-500 to-purple-600",
  default: "from-slate-500 to-slate-700",
}

function getGradiente(titulo: string) {
  const t = titulo.toLowerCase()
  if (t.includes("amazon")) return gradientes.amazon
  if (t.includes("sinpe") || t.includes("transferencia")) return gradientes.sinpe
  if (t.includes("recarga")) return gradientes.recarga
  return gradientes.default
}

const formInicial = {
  titulo: "",
  valorMonetario: "",
  moneda: "USD",
  costoEnPuntos: "",
  paisesSeleccionados: [] as string[],
}

export default function PremiosPage() {
  const [filtroPais, setFiltroPais] = useState("todos")
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const [form, setForm] = useState(formInicial)
  const [editando, setEditando] = useState<Premio | null>(null)

  const filtrados = useMemo(() => {
    return premios.filter((p) => {
      if (filtroEstado === "activos" && !p.activo) return false
      if (filtroEstado === "inactivos" && p.activo) return false
      if (filtroPais !== "todos" && !p.paisesDisponibles.includes(filtroPais))
        return false
      if (busqueda && !p.titulo.toLowerCase().includes(busqueda.toLowerCase()))
        return false
      return true
    })
  }, [filtroPais, filtroEstado, busqueda])

  const activosCount = premios.filter((p) => p.activo).length
  const inactivosCount = premios.filter((p) => !p.activo).length

  function togglePais(paisId: string) {
    setForm((prev) => ({
      ...prev,
      paisesSeleccionados: prev.paisesSeleccionados.includes(paisId)
        ? prev.paisesSeleccionados.filter((id) => id !== paisId)
        : [...prev.paisesSeleccionados, paisId],
    }))
  }

  function handleEditar(premio: Premio) {
    setEditando(premio)
    setForm({
      titulo: premio.titulo,
      valorMonetario: String(premio.valorMonetario),
      moneda: premio.moneda,
      costoEnPuntos: String(premio.costoEnPuntos),
      paisesSeleccionados: [...premio.paisesDisponibles],
    })
  }

  function handleNuevo() {
    setEditando(null)
    setForm(formInicial)
  }

  const previewTitulo = form.titulo || "Nombre del premio"
  const previewPuntos = form.costoEnPuntos
    ? Number(form.costoEnPuntos).toLocaleString()
    : "0"
  const previewValor = form.valorMonetario
    ? `${form.moneda === "CRC" ? "₡" : "$"}${Number(form.valorMonetario).toLocaleString()}`
    : "$0"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Catálogo de Premios
          </h1>
          <p className="mt-1 text-sm text-foreground-secondary">
            CRUD de premios, disponibilidad geográfica y preview
          </p>
        </div>
        <Button onClick={handleNuevo}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Premio
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Premios Activos"
          value={activosCount}
          icon={<Gift className="h-5 w-5 text-primary" />}
        />
        <KPICard
          title="Premios Inactivos"
          value={inactivosCount}
          icon={<Package className="h-5 w-5 text-foreground-muted" />}
        />
        <KPICard
          title="Canjes este Mes"
          value={47}
          subtitle="Simulado"
          icon={<TrendingUp className="h-5 w-5 text-success" />}
        />
        <KPICard
          title="Valor Canjeado"
          value="$850"
          subtitle="Simulado"
          icon={<DollarSign className="h-5 w-5 text-warning" />}
        />
      </div>

      <div className="grid grid-cols-[1fr_350px] gap-6">
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Premios Disponibles</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-4">
            <div className="flex items-center gap-3 px-6 pb-4">
              <Select value={filtroPais} onValueChange={setFiltroPais}>
                <SelectTrigger className="w-[170px]">
                  <SelectValue placeholder="País" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los países</SelectItem>
                  {paises.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="activos">Activos</SelectItem>
                  <SelectItem value="inactivos">Inactivos</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
                <Input
                  placeholder="Buscar premio..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 px-6 pb-6">
              {filtrados.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                  <Gift className="h-10 w-10 text-foreground-muted mb-3" />
                  <p className="text-sm text-foreground-muted">
                    No se encontraron premios
                  </p>
                </div>
              ) : (
                filtrados.map((premio) => (
                  <div
                    key={premio.id}
                    className="rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                    onClick={() => handleEditar(premio)}
                  >
                    <div
                      className={`h-24 bg-gradient-to-br ${getGradiente(premio.titulo)} flex items-center justify-center`}
                    >
                      <Award className="h-10 w-10 text-white/80" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-sm font-semibold text-foreground leading-tight">
                          {premio.titulo}
                        </h3>
                        <Pencil className="h-3.5 w-3.5 text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                      </div>
                      <p className="text-sm font-medium text-success">
                        {premio.moneda === "CRC" ? "₡" : "$"}
                        {premio.valorMonetario.toLocaleString()} {premio.moneda}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-bold text-warning">
                          {premio.costoEnPuntos.toLocaleString()} pts
                        </span>
                        <Badge variant={premio.activo ? "success" : "error"}>
                          {premio.activo ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                      <div className="flex gap-1.5 mt-3">
                        {premio.paisesDisponibles.map((paisId) => {
                          const p = paises.find((pa) => pa.id === paisId)
                          return (
                            <span
                              key={paisId}
                              className="text-xs bg-background-gray px-2 py-0.5 rounded"
                            >
                              {p?.codigo ?? paisId}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {editando ? "Editar Premio" : "Crear Nuevo Premio"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Título del Premio</Label>
                <Input
                  placeholder="Ej: Tarjeta de Regalo Amazon $10"
                  value={form.titulo}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, titulo: e.target.value }))
                  }
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label>Valor Monetario</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    type="number"
                    placeholder="10.00"
                    value={form.valorMonetario}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        valorMonetario: e.target.value,
                      }))
                    }
                    className="flex-1"
                  />
                  <Select
                    value={form.moneda}
                    onValueChange={(v) =>
                      setForm((prev) => ({ ...prev, moneda: v }))
                    }
                  >
                    <SelectTrigger className="w-[90px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="CRC">CRC</SelectItem>
                      <SelectItem value="GTQ">GTQ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Costo en Puntos</Label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={form.costoEnPuntos}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      costoEnPuntos: e.target.value,
                    }))
                  }
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label>Disponibilidad Geográfica</Label>
                <div className="flex flex-col gap-2 mt-2">
                  {paises.map((p) => (
                    <label
                      key={p.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={form.paisesSeleccionados.includes(p.id)}
                        onChange={() => togglePais(p.id)}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm">{p.nombre}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button className="w-full">
                {editando ? "Guardar Cambios" : "Crear Premio"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-foreground-muted" />
                <CardTitle className="text-xs uppercase tracking-wide text-foreground-muted">
                  Vista Previa (Móvil)
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-border overflow-hidden">
                <div
                  className={`h-20 bg-gradient-to-br ${
                    form.titulo
                      ? getGradiente(form.titulo)
                      : "from-slate-400 to-slate-600"
                  } flex items-center justify-center`}
                >
                  <Award className="h-8 w-8 text-white/80" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-foreground">
                    {previewTitulo}
                  </h4>
                  <p className="text-sm text-success font-medium mt-1">
                    {previewValor}
                  </p>
                  <p className="text-lg font-bold text-warning mt-2">
                    {previewPuntos} pts
                  </p>
                  {form.paisesSeleccionados.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {form.paisesSeleccionados.map((paisId) => {
                        const p = paises.find((pa) => pa.id === paisId)
                        return (
                          <span
                            key={paisId}
                            className="text-xs bg-background-gray px-2 py-0.5 rounded"
                          >
                            {p?.codigo}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useMemo } from "react"
import Link from "next/link"
import { estudios, plantillas } from "@kosmos/mock-data"
import { Button, DataTable, StatusBadge } from "@kosmos/ui"
import type { DataTableColumn } from "@kosmos/ui"
import { Plus, MoreHorizontal } from "lucide-react"

const plantillaMap = Object.fromEntries(
  plantillas.map((p) => [p.id, p.nombre])
)

interface EstudioEnriquecido {
  id: string
  codigo: string
  nombre: string
  tipo: string
  etiquetas: string
  respuestas: number
  meta: number
  estado: string
}

function generarCodigo(index: number): string {
  const letras = ["A", "B", "C", "D", "E", "F", "G", "H"]
  return `${letras[index % letras.length]}${index + 1}`
}

function obtenerEtiquetas(segmento: Record<string, string>): string {
  const etiquetas: string[] = []
  if (segmento.nse) etiquetas.push(`NSE ${segmento.nse}`)
  if (segmento.edadMin && segmento.edadMax)
    etiquetas.push(`${segmento.edadMin}-${segmento.edadMax} años`)
  if (segmento.genero && segmento.genero !== "todos")
    etiquetas.push(segmento.genero)
  return etiquetas.join(", ")
}

const tipoColores: Record<string, string> = {
  "Salud de Marca": "bg-red-50 text-primary",
  "Prueba de Concepto": "bg-orange-50 text-orange-600",
}

export default function EstudiosPage() {
  const estudiosEnriquecidos = useMemo<EstudioEnriquecido[]>(() => {
    return estudios.map((est, i) => ({
      id: est.id,
      codigo: generarCodigo(i),
      nombre: est.nombre,
      tipo: plantillaMap[est.configuracion.plantillaId] || "Otro",
      etiquetas: obtenerEtiquetas(est.configuracion.segmento),
      respuestas: est.respuestasRecibidas,
      meta: est.configuracion.volumenObjetivo,
      estado: est.estado,
    }))
  }, [])

  const columns: DataTableColumn<EstudioEnriquecido>[] = [
    {
      id: "codigo",
      header: "Codigo",
      className: "w-[80px]",
      cell: (row) => (
        <span className="font-medium text-foreground-secondary">
          {row.codigo}
        </span>
      ),
    },
    {
      id: "nombre",
      header: "Titulo",
      className: "max-w-[340px]",
      cell: (row) => (
        <Link
          href={`/estudios/${row.id}`}
          className="font-medium text-foreground hover:text-primary transition-colors"
        >
          {row.nombre}
        </Link>
      ),
      sortFn: (a, b) => a.nombre.localeCompare(b.nombre),
    },
    {
      id: "tipo",
      header: "Tipo",
      cell: (row) => {
        const color = tipoColores[row.tipo] || "bg-gray-50 text-foreground-secondary"
        return (
          <span
            className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${color}`}
          >
            {row.tipo}
          </span>
        )
      },
      sortFn: (a, b) => a.tipo.localeCompare(b.tipo),
    },
    {
      id: "etiquetas",
      header: "Etiquetas",
      className: "max-w-[280px]",
      cell: (row) => (
        <span className="text-sm text-foreground-secondary">
          {row.etiquetas}
        </span>
      ),
    },
    {
      id: "respuestas",
      header: "Respuestas",
      cell: (row) => (
        <span className="font-semibold">
          {row.respuestas.toLocaleString()}
        </span>
      ),
      sortFn: (a, b) => a.respuestas - b.respuestas,
    },
    {
      id: "estado",
      header: "Estado",
      cell: (row) => <StatusBadge status={row.estado} />,
      sortFn: (a, b) => a.estado.localeCompare(b.estado),
    },
    {
      id: "acciones",
      header: "",
      className: "w-[48px]",
      cell: () => (
        <button className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 transition-colors">
          <MoreHorizontal className="h-4 w-4 text-foreground-muted" />
        </button>
      ),
    },
  ]

  return (
    <div className="px-8 py-8 lg:px-12">
      <h1 className="text-2xl font-semibold text-foreground mb-6">Estudios</h1>

      <DataTable
        data={estudiosEnriquecidos}
        columns={columns}
        searchPlaceholder="Buscar"
        searchFn={(item, query) =>
          item.nombre.toLowerCase().includes(query) ||
          item.codigo.toLowerCase().includes(query) ||
          item.tipo.toLowerCase().includes(query)
        }
        pageSize={10}
        actions={
          <Link href="/estudios/nuevo">
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              Nuevo estudio
            </Button>
          </Link>
        }
      />
    </div>
  )
}

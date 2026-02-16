"use client"

import Link from "next/link"
import { plantillas } from "@kosmos/mock-data"
import type { Plantilla } from "@kosmos/types"
import {
  Button,
  StatusBadge,
  DataTable,
  type DataTableColumn,
} from "@kosmos/ui"
import { Plus, Pencil } from "lucide-react"

const columns: DataTableColumn<Plantilla>[] = [
  {
    id: "nombre",
    header: "Nombre",
    cell: (row) => (
      <div>
        <Link
          href={`/plantillas/${row.id}/preguntas`}
          className="font-medium text-foreground hover:text-primary transition-colors"
        >
          {row.nombre}
        </Link>
        <p className="text-xs text-foreground-muted mt-0.5 line-clamp-1">
          {row.descripcion}
        </p>
      </div>
    ),
    sortFn: (a, b) => a.nombre.localeCompare(b.nombre),
  },
  {
    id: "estado",
    header: "Estado",
    cell: (row) => <StatusBadge status={row.estado} />,
    className: "w-[120px]",
  },
  {
    id: "preguntas",
    header: "Preguntas",
    cell: (row) => (
      <span className="text-foreground-secondary">{row.preguntas.length}</span>
    ),
    sortFn: (a, b) => a.preguntas.length - b.preguntas.length,
    className: "w-[100px]",
  },
  {
    id: "reglas",
    header: "Reglas",
    cell: (row) => (
      <span className="text-foreground-secondary">{row.reglas.length}</span>
    ),
    className: "w-[80px]",
  },
  {
    id: "fecha",
    header: "Creación",
    cell: (row) => (
      <span className="text-foreground-secondary text-sm">
        {new Date(row.creadoEn).toLocaleDateString("es-CR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </span>
    ),
    sortFn: (a, b) =>
      new Date(a.creadoEn).getTime() - new Date(b.creadoEn).getTime(),
    className: "w-[130px]",
  },
  {
    id: "acciones",
    header: "",
    cell: (row) => (
      <Link href={`/plantillas/${row.id}/preguntas`}>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
        </Button>
      </Link>
    ),
    className: "w-[60px]",
  },
]

export default function PlantillasPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Plantillas</h1>
        <p className="mt-1 text-sm text-foreground-secondary">
          Gestión de cuestionarios y plantillas de estudio
        </p>
      </div>

      <DataTable
        data={plantillas}
        columns={columns}
        searchPlaceholder="Buscar plantilla..."
        searchFn={(item, query) =>
          item.nombre.toLowerCase().includes(query) ||
          item.descripcion.toLowerCase().includes(query)
        }
        pageSize={10}
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva plantilla
          </Button>
        }
      />
    </div>
  )
}

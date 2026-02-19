"use client"

import Link from "next/link"
import { plantillas, categorias } from "@kosmos/mock-data"
import type { Plantilla } from "@kosmos/types"
import {
  Button,
  StatusBadge,
  DataTable,
  type DataTableColumn,
} from "@kosmos/ui"
import { Plus, Pencil } from "lucide-react"

const categoriasMap = Object.fromEntries(categorias.map((c) => [c.id, c.nombre]))

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
    id: "categoria",
    header: "Categoría",
    cell: (row) => (
      <span className="text-foreground-secondary text-sm">
        {row.categoriaId ? categoriasMap[row.categoriaId] || "—" : "—"}
      </span>
    ),
    sortFn: (a, b) => {
      const catA = a.categoriaId ? categoriasMap[a.categoriaId] || "" : ""
      const catB = b.categoriaId ? categoriasMap[b.categoriaId] || "" : ""
      return catA.localeCompare(catB)
    },
    className: "w-[180px]",
  },
  {
    id: "ultimaEdicion",
    header: "Última edición",
    cell: (row) => (
      <span className="text-foreground-secondary text-sm">
        {new Date(row.ultimaEdicion).toLocaleDateString("es-CR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </span>
    ),
    sortFn: (a, b) =>
      new Date(a.ultimaEdicion).getTime() - new Date(b.ultimaEdicion).getTime(),
    className: "w-[140px]",
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
          Gestión de plantillas de evaluación
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
        pageSizeOptions={[5, 10, 20, 30]}
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

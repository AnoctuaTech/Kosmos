"use client"

import { useState, useMemo } from "react"
import { categorias as categoriasIniciales, plantillas } from "@kosmos/mock-data"
import type { Categoria } from "@kosmos/types"
import {
  Button,
  Input,
  Textarea,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  DataTable,
  type DataTableColumn,
} from "@kosmos/ui"
import { Plus, Pencil, Trash2, X, Save } from "lucide-react"

export default function CategoriasPage() {
  const [categoriasList, setCategoriasList] = useState<Categoria[]>([...categoriasIniciales])
  const [editando, setEditando] = useState<Categoria | null>(null)
  const [creando, setCreando] = useState(false)
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [usoRecomendado, setUsoRecomendado] = useState("")

  function contarPlantillas(categoriaId: string) {
    return plantillas.filter((p) => p.categoriaId === categoriaId).length
  }

  function handleEditar(cat: Categoria) {
    setCreando(false)
    setEditando(cat)
    setNombre(cat.nombre)
    setDescripcion(cat.descripcion)
    setUsoRecomendado(cat.usoRecomendado)
  }

  function handleNueva() {
    setEditando(null)
    setCreando(true)
    setNombre("")
    setDescripcion("")
    setUsoRecomendado("")
  }

  function handleGuardar() {
    if (!nombre.trim()) return

    if (editando) {
      setCategoriasList((prev) =>
        prev.map((c) =>
          c.id === editando.id
            ? { ...c, nombre, descripcion, usoRecomendado }
            : c
        )
      )
      setEditando(null)
    } else {
      const nueva: Categoria = {
        id: `cat-${Date.now()}`,
        nombre,
        descripcion,
        usoRecomendado,
        creadoEn: new Date().toISOString(),
      }
      setCategoriasList((prev) => [...prev, nueva])
      setCreando(false)
    }
    setNombre("")
    setDescripcion("")
    setUsoRecomendado("")
  }

  function handleEliminar(id: string) {
    setCategoriasList((prev) => prev.filter((c) => c.id !== id))
    if (editando?.id === id) {
      setEditando(null)
      setNombre("")
      setDescripcion("")
      setUsoRecomendado("")
    }
  }

  function handleCancelar() {
    setEditando(null)
    setCreando(false)
    setNombre("")
    setDescripcion("")
    setUsoRecomendado("")
  }

  const columns: DataTableColumn<Categoria>[] = useMemo(
    () => [
      {
        id: "nombre",
        header: "Nombre",
        cell: (row) => (
          <span className="font-medium text-foreground">{row.nombre}</span>
        ),
        sortFn: (a, b) => a.nombre.localeCompare(b.nombre),
      },
      {
        id: "descripcion",
        header: "Descripción",
        cell: (row) => (
          <span className="text-sm text-foreground-secondary line-clamp-1">
            {row.descripcion}
          </span>
        ),
        className: "max-w-[280px]",
      },
      {
        id: "usoRecomendado",
        header: "Uso Recomendado",
        cell: (row) => (
          <span className="text-sm text-foreground-secondary line-clamp-1">
            {row.usoRecomendado}
          </span>
        ),
        className: "max-w-[250px]",
      },
      {
        id: "plantillas",
        header: "Plantillas",
        cell: (row) => (
          <span className="text-sm text-foreground-secondary">
            {contarPlantillas(row.id)}
          </span>
        ),
        sortFn: (a, b) => contarPlantillas(a.id) - contarPlantillas(b.id),
        className: "w-[100px]",
      },
      {
        id: "acciones",
        header: "",
        cell: (row) => (
          <div className="flex items-center justify-end gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleEditar(row)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-error hover:text-error"
              onClick={() => handleEliminar(row.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
        className: "w-[100px]",
      },
    ],
    [categoriasList]
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Gestión de Categorías
        </h1>
        <p className="mt-1 text-sm text-foreground-secondary">
          Organización y clasificación de plantillas de evaluación
        </p>
      </div>

      <div className="grid grid-cols-[1fr_380px] gap-6">
        <DataTable
          data={categoriasList}
          columns={columns}
          searchPlaceholder="Buscar categoría..."
          searchFn={(item, query) =>
            item.nombre.toLowerCase().includes(query) ||
            item.descripcion.toLowerCase().includes(query)
          }
          pageSize={10}
          actions={
            <Button onClick={handleNueva}>
              <Plus className="mr-2 h-4 w-4" />
              Nueva categoría
            </Button>
          }
        />

        {(creando || editando) && (
          <Card className="h-fit">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {editando ? "Editar Categoría" : "Nueva Categoría"}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleCancelar}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label>Nombre</Label>
                <Input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre de la categoría"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Descripción</Label>
                <Textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Descripción breve"
                  rows={3}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Uso Recomendado</Label>
                <Textarea
                  value={usoRecomendado}
                  onChange={(e) => setUsoRecomendado(e.target.value)}
                  placeholder="En qué casos se recomienda usar esta categoría"
                  rows={3}
                />
              </div>
              <Button
                className="w-full"
                onClick={handleGuardar}
                disabled={!nombre.trim()}
              >
                <Save className="h-4 w-4 mr-2" />
                {editando ? "Guardar Cambios" : "Crear Categoría"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

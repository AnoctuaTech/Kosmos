import type { AdminUsuario } from "@kosmos/types";

export const adminUsuarios: AdminUsuario[] = [
  {
    id: "adm-001",
    email: "admin@kosmos.lat",
    nombre: "Enzo Alvarez",
    rol: "superadmin",
    activo: true,
    creadoEn: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "adm-002",
    email: "ops.cr@kosmos.lat",
    nombre: "Laura Jimenez",
    rol: "admin_pais",
    paisId: "pais-cr",
    activo: true,
    creadoEn: "2024-03-15T09:00:00.000Z",
  },
  {
    id: "adm-003",
    email: "ops.gt@kosmos.lat",
    nombre: "Fernando Reyes",
    rol: "admin_pais",
    paisId: "pais-gt",
    activo: true,
    creadoEn: "2025-01-20T10:30:00.000Z",
  },
];

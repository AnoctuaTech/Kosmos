import type { Cliente } from "@kosmos/types";

export const clientes: Cliente[] = [
  {
    id: "cli-001",
    email: "mfernandez@corporacionabc.co.cr",
    nombre: "Maria",
    apellidos: "Fernandez Rojas",
    empresaId: "emp-001",
    rol: "propietario",
    emailVerificado: true,
    creadoEn: "2024-06-15T09:05:00.000Z",
  },
  {
    id: "cli-002",
    email: "jlopez@retailx.com.pa",
    nombre: "Jorge",
    apellidos: "Lopez Castillo",
    empresaId: "emp-002",
    rol: "propietario",
    emailVerificado: true,
    creadoEn: "2024-08-20T14:35:00.000Z",
  },
  {
    id: "cli-003",
    email: "avargas@foodtechcr.com",
    nombre: "Andrea",
    apellidos: "Vargas Mora",
    empresaId: "emp-003",
    rol: "propietario",
    emailVerificado: true,
    creadoEn: "2025-01-10T11:05:00.000Z",
  },
  {
    id: "cli-004",
    email: "rmorales@gfinancieroistmo.com.gt",
    nombre: "Roberto",
    apellidos: "Morales Perez",
    empresaId: "emp-004",
    rol: "miembro",
    emailVerificado: false,
    creadoEn: "2025-03-06T10:00:00.000Z",
  },
];

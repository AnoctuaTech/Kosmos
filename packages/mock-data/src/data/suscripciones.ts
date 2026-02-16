import type { Suscripcion } from "@kosmos/types";

export const suscripciones: Suscripcion[] = [
  {
    id: "sus-001",
    empresaId: "emp-001",
    tier: "pro",
    estado: "activa",
    respuestasUsadas: 4320,
    respuestasLimite: 10000,
    fechaRenovacion: "2026-06-15T00:00:00.000Z",
    creadoEn: "2024-06-15T09:00:00.000Z",
  },
  {
    id: "sus-002",
    empresaId: "emp-002",
    tier: "basico",
    estado: "activa",
    respuestasUsadas: 1850,
    respuestasLimite: 3000,
    fechaRenovacion: "2026-08-20T00:00:00.000Z",
    creadoEn: "2024-08-20T14:30:00.000Z",
  },
  {
    id: "sus-003",
    empresaId: "emp-003",
    tier: "trial",
    estado: "vencida",
    respuestasUsadas: 3,
    respuestasLimite: 5,
    fechaRenovacion: "2025-12-10T00:00:00.000Z",
    creadoEn: "2025-01-10T11:00:00.000Z",
  },
  {
    id: "sus-004",
    empresaId: "emp-004",
    tier: "enterprise",
    estado: "activa",
    respuestasUsadas: 0,
    respuestasLimite: 50000,
    fechaRenovacion: "2027-03-05T00:00:00.000Z",
    creadoEn: "2025-03-05T08:45:00.000Z",
  },
];

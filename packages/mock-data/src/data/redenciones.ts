import type { Redencion } from "@kosmos/types";

export const redenciones: Redencion[] = [
  {
    id: "red-001",
    participanteId: "par-001",
    premioId: "pre-001",
    puntosCosto: 1000,
    estado: "pagada",
    datosBancarios: {
      tipo: "sinpe",
      cuenta: "88887777",
    },
    solicitadoEn: "2025-04-10T09:00:00.000Z",
    aprobadoEn: "2025-04-10T14:00:00.000Z",
    pagadoEn: "2025-04-11T10:00:00.000Z",
  },
  {
    id: "red-002",
    participanteId: "par-002",
    premioId: "pre-003",
    puntosCosto: 2500,
    estado: "aprobada",
    datosBancarios: {
      tipo: "transferencia",
      cuenta: "CR21015201001025012345",
      banco: "Banco Nacional de Costa Rica",
    },
    solicitadoEn: "2025-12-01T11:30:00.000Z",
    aprobadoEn: "2025-12-02T08:00:00.000Z",
  },
  {
    id: "red-003",
    participanteId: "par-003",
    premioId: "pre-005",
    puntosCosto: 500,
    estado: "pendiente",
    datosBancarios: {
      tipo: "transferencia",
      cuenta: "PA0401234567890123456789",
      banco: "Banco General Panama",
    },
    solicitadoEn: "2026-01-15T16:00:00.000Z",
  },
  {
    id: "red-004",
    participanteId: "par-006",
    premioId: "pre-004",
    puntosCosto: 600,
    estado: "rechazada",
    datosBancarios: {
      tipo: "transferencia",
      cuenta: "GT0001234567890123456789",
      banco: "Banco Industrial Guatemala",
    },
    solicitadoEn: "2025-11-20T13:00:00.000Z",
  },
  {
    id: "red-005",
    participanteId: "par-008",
    premioId: "pre-002",
    puntosCosto: 500,
    estado: "procesando",
    datosBancarios: {
      tipo: "sinpe",
      cuenta: "70001234",
    },
    solicitadoEn: "2026-02-01T10:00:00.000Z",
    aprobadoEn: "2026-02-01T15:30:00.000Z",
  },
];

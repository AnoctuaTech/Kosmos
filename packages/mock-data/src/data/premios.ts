import type { Premio } from "@kosmos/types";

export const premios: Premio[] = [
  {
    id: "pre-001",
    titulo: "Tarjeta de regalo Amazon $10",
    valorMonetario: 10,
    moneda: "USD",
    costoEnPuntos: 1000,
    paisesDisponibles: ["pais-cr", "pais-pa", "pais-gt"],
    activo: true,
  },
  {
    id: "pre-002",
    titulo: "Recarga telefonica CRC 5000",
    valorMonetario: 5000,
    moneda: "CRC",
    costoEnPuntos: 500,
    paisesDisponibles: ["pais-cr"],
    activo: true,
  },
  {
    id: "pre-003",
    titulo: "Tarjeta de regalo Amazon $25",
    valorMonetario: 25,
    moneda: "USD",
    costoEnPuntos: 2500,
    paisesDisponibles: ["pais-cr", "pais-pa", "pais-gt"],
    activo: true,
  },
  {
    id: "pre-004",
    titulo: "Recarga telefonica GTQ 50",
    valorMonetario: 50,
    moneda: "GTQ",
    costoEnPuntos: 600,
    paisesDisponibles: ["pais-gt"],
    activo: true,
  },
  {
    id: "pre-005",
    titulo: "Transferencia bancaria $5",
    valorMonetario: 5,
    moneda: "USD",
    costoEnPuntos: 500,
    paisesDisponibles: ["pais-pa"],
    activo: false,
  },
];

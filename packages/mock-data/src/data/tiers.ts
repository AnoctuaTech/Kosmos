import type { Tier } from "@kosmos/types";

export const tiers: Tier[] = [
  {
    nombre: "trial",
    limiteRespuestas: 5,
    precioMensual: 0,
  },
  {
    nombre: "basico",
    limiteRespuestas: 3000,
    precioMensual: 800,
  },
  {
    nombre: "pro",
    limiteRespuestas: 10000,
    precioMensual: 2000,
  },
  {
    nombre: "enterprise",
    limiteRespuestas: 50000,
    precioMensual: 5000,
  },
];

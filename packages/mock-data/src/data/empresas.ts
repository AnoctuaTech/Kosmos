import type { Empresa } from "@kosmos/types";

export const empresas: Empresa[] = [
  {
    id: "emp-001",
    nombre: "Corporacion ABC",
    industria: "Consumo masivo",
    paisId: "pais-cr",
    estado: "activo",
    creadoEn: "2024-06-15T09:00:00.000Z",
  },
  {
    id: "emp-002",
    nombre: "Retail X",
    industria: "Comercio minorista",
    paisId: "pais-pa",
    estado: "activo",
    creadoEn: "2024-08-20T14:30:00.000Z",
  },
  {
    id: "emp-003",
    nombre: "FoodTech CR",
    industria: "Alimentos y bebidas",
    paisId: "pais-cr",
    estado: "mora",
    creadoEn: "2025-01-10T11:00:00.000Z",
  },
  {
    id: "emp-004",
    nombre: "Grupo Financiero del Istmo",
    industria: "Servicios financieros",
    paisId: "pais-gt",
    estado: "activo",
    creadoEn: "2025-03-05T08:45:00.000Z",
  },
];

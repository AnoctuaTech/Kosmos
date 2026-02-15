import type { AlertaFraude } from "@kosmos/types";

export const alertasFraude: AlertaFraude[] = [
  {
    id: "afr-001",
    participanteId: "par-007",
    tipo: "ip_duplicada",
    descripcion: "Se detectaron 12 respuestas enviadas desde la misma direccion IP 190.113.45.22 en un periodo de 30 minutos.",
    nivelRiesgo: "alto",
    resuelta: true,
    creadoEn: "2025-05-15T18:30:00.000Z",
  },
  {
    id: "afr-002",
    participanteId: "par-005",
    tipo: "tiempo_respuesta",
    descripcion: "El participante completo una encuesta de 15 preguntas en 47 segundos, muy por debajo del tiempo promedio de 8 minutos.",
    nivelRiesgo: "medio",
    resuelta: false,
    creadoEn: "2026-01-08T22:15:00.000Z",
  },
  {
    id: "afr-003",
    participanteId: "par-001",
    tipo: "limite_referidos",
    descripcion: "El participante ha referido a 25 usuarios en las ultimas 48 horas, superando el limite de 10 referidos por semana.",
    nivelRiesgo: "bajo",
    resuelta: false,
    creadoEn: "2026-02-03T09:45:00.000Z",
  },
  {
    id: "afr-004",
    participanteId: "par-003",
    tipo: "ip_duplicada",
    descripcion: "Se identificaron 5 cuentas diferentes asociadas a la direccion IP 201.195.78.100 desde Panama.",
    nivelRiesgo: "alto",
    resuelta: false,
    creadoEn: "2026-02-10T14:20:00.000Z",
  },
];

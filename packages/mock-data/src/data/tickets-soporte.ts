import type { TicketSoporte } from "@kosmos/types";

export const ticketsSoporte: TicketSoporte[] = [
  {
    id: "tkt-001",
    participanteId: "par-003",
    asunto: "No puedo canjear mis puntos",
    mensaje: "Intento canjear mis puntos por una recarga telefonica pero el sistema me dice que no tengo puntos suficientes. Segun mi perfil tengo 1300 puntos disponibles y la recarga cuesta 500.",
    estado: "abierto",
    paisId: "pais-pa",
    creadoEn: "2026-02-10T08:30:00.000Z",
  },
  {
    id: "tkt-002",
    participanteId: "par-005",
    asunto: "Encuesta se cierra inesperadamente",
    mensaje: "Cada vez que llego a la pregunta numero 8 de la encuesta sobre banca digital, la aplicacion se cierra y pierdo todo mi progreso. Ya lo intente 3 veces.",
    estado: "en_progreso",
    paisId: "pais-gt",
    creadoEn: "2026-01-25T14:00:00.000Z",
  },
  {
    id: "tkt-003",
    participanteId: "par-001",
    asunto: "Pago de redencion no recibido",
    mensaje: "Solicite un canje el 10 de abril y aparece como pagado, pero no he recibido el deposito en mi cuenta SINPE. Mi numero es 88887777.",
    estado: "cerrado",
    paisId: "pais-cr",
    creadoEn: "2025-04-15T11:00:00.000Z",
    cerradoEn: "2025-04-17T16:30:00.000Z",
  },
  {
    id: "tkt-004",
    participanteId: "par-006",
    asunto: "Actualizacion de datos personales",
    mensaje: "Necesito actualizar mi numero de cedula y cuenta bancaria. Ingrese los datos incorrectos al registrarme y ahora no puedo modificarlos desde la aplicacion.",
    estado: "abierto",
    paisId: "pais-gt",
    creadoEn: "2026-02-12T09:15:00.000Z",
  },
];

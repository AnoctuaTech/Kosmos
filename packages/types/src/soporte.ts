export type EstadoTicket = "abierto" | "en_progreso" | "cerrado";

export interface TicketSoporte {
  id: string;
  participanteId: string;
  asunto: string;
  mensaje: string;
  estado: EstadoTicket;
  paisId: string;
  creadoEn: string;
  cerradoEn?: string;
}

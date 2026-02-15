export type EstadoRedencion =
  | "pendiente"
  | "en_revision"
  | "aprobada"
  | "procesando"
  | "pagada"
  | "rechazada";

export interface Redencion {
  id: string;
  participanteId: string;
  premioId: string;
  puntosCosto: number;
  estado: EstadoRedencion;
  datosBancarios: {
    tipo: "sinpe" | "transferencia";
    cuenta: string;
    banco?: string;
  };
  solicitadoEn: string;
  aprobadoEn?: string;
  pagadoEn?: string;
}

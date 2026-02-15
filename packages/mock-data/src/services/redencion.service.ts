import type { Redencion } from "@kosmos/types";

export interface RedencionService {
  listar(): Promise<Redencion[]>;
  obtener(id: string): Promise<Redencion | null>;
  aprobar(id: string): Promise<Redencion>;
  rechazar(id: string): Promise<Redencion>;
  confirmarPago(id: string): Promise<Redencion>;
}

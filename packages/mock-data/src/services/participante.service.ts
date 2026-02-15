import type { Participante } from "@kosmos/types";

export interface ParticipanteService {
  buscar(query: string): Promise<Participante[]>;
  obtener(id: string): Promise<Participante | null>;
  listarPorPais(paisId: string): Promise<Participante[]>;
  forzarActualizacionNSE(id: string): Promise<void>;
  bloquear(id: string): Promise<void>;
}

import type { Premio } from "@kosmos/types";

export interface PremioService {
  listar(): Promise<Premio[]>;
  listarPorPais(paisId: string): Promise<Premio[]>;
  obtener(id: string): Promise<Premio | null>;
  crear(data: Omit<Premio, "id">): Promise<Premio>;
  actualizar(id: string, data: Partial<Premio>): Promise<Premio>;
}

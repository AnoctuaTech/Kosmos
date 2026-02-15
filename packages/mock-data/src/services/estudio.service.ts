import type { Estudio, ConfiguracionEstudio } from "@kosmos/types";

export interface EstudioService {
  listar(empresaId: string): Promise<Estudio[]>;
  obtener(id: string): Promise<Estudio | null>;
  crear(empresaId: string, config: ConfiguracionEstudio): Promise<Estudio>;
  lanzar(id: string): Promise<Estudio>;
  pausar(id: string): Promise<Estudio>;
}

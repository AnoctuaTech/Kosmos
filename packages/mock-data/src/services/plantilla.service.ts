import type { Plantilla, Pregunta, ReglaLogica } from "@kosmos/types";

export interface PlantillaService {
  listar(): Promise<Plantilla[]>;
  obtener(id: string): Promise<Plantilla | null>;
  crear(data: Omit<Plantilla, "id" | "creadoEn">): Promise<Plantilla>;
  agregarPregunta(plantillaId: string, pregunta: Omit<Pregunta, "id" | "plantillaId">): Promise<Pregunta>;
  actualizarPregunta(preguntaId: string, data: Partial<Pregunta>): Promise<Pregunta>;
  eliminarPregunta(preguntaId: string): Promise<void>;
  agregarRegla(plantillaId: string, regla: Omit<ReglaLogica, "id">): Promise<ReglaLogica>;
  eliminarRegla(reglaId: string): Promise<void>;
}

import type { EstudioService } from "../services/estudio.service";
import type { Estudio, ConfiguracionEstudio } from "@kosmos/types";
import { estudios } from "../data";

let mockEstudios = [...estudios];

export const mockEstudioService: EstudioService = {
  async listar(empresaId: string) {
    return mockEstudios.filter((e) => e.empresaId === empresaId);
  },

  async obtener(id: string) {
    return mockEstudios.find((e) => e.id === id) ?? null;
  },

  async crear(empresaId: string, config: ConfiguracionEstudio) {
    const nuevo: Estudio = {
      id: `est-${Date.now()}`,
      empresaId,
      nombre: `Estudio ${mockEstudios.length + 1}`,
      estado: "borrador",
      configuracion: config,
      respuestasRecibidas: 0,
      creadoEn: new Date().toISOString(),
    };
    mockEstudios.push(nuevo);
    return nuevo;
  },

  async lanzar(id: string) {
    const estudio = mockEstudios.find((e) => e.id === id);
    if (!estudio) throw new Error("Estudio no encontrado");
    estudio.estado = "activo";
    estudio.lanzadoEn = new Date().toISOString();
    return estudio;
  },

  async pausar(id: string) {
    const estudio = mockEstudios.find((e) => e.id === id);
    if (!estudio) throw new Error("Estudio no encontrado");
    estudio.estado = "pausado";
    return estudio;
  },
};

import type { PlantillaService } from "../services/plantilla.service";
import type { Plantilla, Pregunta, ReglaLogica } from "@kosmos/types";
import { plantillas } from "../data";

let mockPlantillas = [...plantillas];

export const mockPlantillaService: PlantillaService = {
  async listar() {
    return mockPlantillas;
  },

  async obtener(id: string) {
    return mockPlantillas.find((p) => p.id === id) ?? null;
  },

  async crear(data: Omit<Plantilla, "id" | "creadoEn">) {
    const nueva: Plantilla = {
      ...data,
      id: `plt-${Date.now()}`,
      creadoEn: new Date().toISOString(),
    };
    mockPlantillas.push(nueva);
    return nueva;
  },

  async agregarPregunta(plantillaId: string, pregunta: Omit<Pregunta, "id" | "plantillaId">) {
    const plantilla = mockPlantillas.find((p) => p.id === plantillaId);
    if (!plantilla) throw new Error("Plantilla no encontrada");
    const nueva: Pregunta = {
      ...pregunta,
      id: `prg-${Date.now()}`,
      plantillaId,
    };
    plantilla.preguntas.push(nueva);
    return nueva;
  },

  async actualizarPregunta(preguntaId: string, data: Partial<Pregunta>) {
    for (const plantilla of mockPlantillas) {
      const idx = plantilla.preguntas.findIndex((p) => p.id === preguntaId);
      if (idx !== -1) {
        plantilla.preguntas[idx] = { ...plantilla.preguntas[idx], ...data };
        return plantilla.preguntas[idx];
      }
    }
    throw new Error("Pregunta no encontrada");
  },

  async eliminarPregunta(preguntaId: string) {
    for (const plantilla of mockPlantillas) {
      const idx = plantilla.preguntas.findIndex((p) => p.id === preguntaId);
      if (idx !== -1) {
        plantilla.preguntas.splice(idx, 1);
        return;
      }
    }
    throw new Error("Pregunta no encontrada");
  },

  async agregarRegla(plantillaId: string, regla: Omit<ReglaLogica, "id">) {
    const plantilla = mockPlantillas.find((p) => p.id === plantillaId);
    if (!plantilla) throw new Error("Plantilla no encontrada");
    const nueva: ReglaLogica = {
      ...regla,
      id: `reg-${Date.now()}`,
    };
    plantilla.reglas.push(nueva);
    return nueva;
  },

  async eliminarRegla(reglaId: string) {
    for (const plantilla of mockPlantillas) {
      const idx = plantilla.reglas.findIndex((r) => r.id === reglaId);
      if (idx !== -1) {
        plantilla.reglas.splice(idx, 1);
        return;
      }
    }
    throw new Error("Regla no encontrada");
  },
};

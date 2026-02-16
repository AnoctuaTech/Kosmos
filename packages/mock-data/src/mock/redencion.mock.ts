import type { RedencionService } from "../services/redencion.service";
import type { Redencion } from "@kosmos/types";
import { redenciones } from "../data";

let mockRedenciones = [...redenciones];

export const mockRedencionService: RedencionService = {
  async listar() {
    return mockRedenciones;
  },

  async obtener(id: string) {
    return mockRedenciones.find((r) => r.id === id) ?? null;
  },

  async aprobar(id: string) {
    const redencion = mockRedenciones.find((r) => r.id === id);
    if (!redencion) throw new Error("Redención no encontrada");
    redencion.estado = "aprobada";
    redencion.aprobadoEn = new Date().toISOString();
    return redencion;
  },

  async rechazar(id: string) {
    const redencion = mockRedenciones.find((r) => r.id === id);
    if (!redencion) throw new Error("Redención no encontrada");
    redencion.estado = "rechazada";
    return redencion;
  },

  async confirmarPago(id: string) {
    const redencion = mockRedenciones.find((r) => r.id === id);
    if (!redencion) throw new Error("Redención no encontrada");
    redencion.estado = "pagada";
    redencion.pagadoEn = new Date().toISOString();
    return redencion;
  },
};

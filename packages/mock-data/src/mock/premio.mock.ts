import type { PremioService } from "../services/premio.service";
import type { Premio } from "@kosmos/types";
import { premios } from "../data";

let mockPremios = [...premios];

export const mockPremioService: PremioService = {
  async listar() {
    return mockPremios;
  },

  async listarPorPais(paisId: string) {
    return mockPremios.filter(
      (p) => p.activo && p.paisesDisponibles.includes(paisId)
    );
  },

  async obtener(id: string) {
    return mockPremios.find((p) => p.id === id) ?? null;
  },

  async crear(data: Omit<Premio, "id">) {
    const nuevo: Premio = {
      ...data,
      id: `pre-${Date.now()}`,
    };
    mockPremios.push(nuevo);
    return nuevo;
  },

  async actualizar(id: string, data: Partial<Premio>) {
    const idx = mockPremios.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Premio no encontrado");
    mockPremios[idx] = { ...mockPremios[idx], ...data };
    return mockPremios[idx];
  },
};

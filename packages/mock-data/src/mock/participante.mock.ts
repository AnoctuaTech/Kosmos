import type { ParticipanteService } from "../services/participante.service";
import { participantes } from "../data";

export const mockParticipanteService: ParticipanteService = {
  async buscar(query: string) {
    const q = query.toLowerCase();
    return participantes.filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.apellidos.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.cedula.includes(q),
    );
  },

  async obtener(id: string) {
    return participantes.find((p) => p.id === id) ?? null;
  },

  async listarPorPais(paisId: string) {
    return participantes.filter((p) => p.paisId === paisId);
  },

  async forzarActualizacionNSE(id: string) {
    const participante = participantes.find((p) => p.id === id);
    if (participante) {
      participante.nseEstado = "pendiente";
    }
  },

  async bloquear(id: string) {
    const participante = participantes.find((p) => p.id === id);
    if (participante) {
      participante.estado = "bloqueado";
    }
  },
};

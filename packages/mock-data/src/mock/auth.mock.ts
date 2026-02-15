import type { AuthService } from "../services/auth.service";
import { clientes } from "../data";
import { adminUsuarios } from "../data";
import { participantes } from "../data";

export const mockAuthService: AuthService = {
  async loginCliente(email: string, _password: string) {
    return clientes.find((c) => c.email === email) ?? null;
  },

  async loginAdmin(email: string, _password: string) {
    return adminUsuarios.find((a) => a.email === email) ?? null;
  },

  async loginParticipante(email: string, _password: string) {
    return participantes.find((p) => p.email === email) ?? null;
  },

  async verificarEmail(_token: string) {
    return true;
  },

  async verificarOTP(_email: string, _codigo: string) {
    return true;
  },
};

import type { Cliente, AdminUsuario, Participante } from "@kosmos/types";

export interface AuthService {
  loginCliente(email: string, password: string): Promise<Cliente | null>;
  loginAdmin(email: string, password: string): Promise<AdminUsuario | null>;
  loginParticipante(email: string, password: string): Promise<Participante | null>;
  verificarEmail(token: string): Promise<boolean>;
  verificarOTP(email: string, codigo: string): Promise<boolean>;
}

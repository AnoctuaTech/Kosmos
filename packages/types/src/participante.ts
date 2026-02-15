export type EstadoNSE = "vigente" | "vencido" | "pendiente";
export type NivelNSE = "alto" | "medio" | "bajo";

export interface Participante {
  id: string;
  nombre: string;
  apellidos: string;
  cedula: string;
  email: string;
  paisId: string;
  emailVerificado: boolean;
  nseScore: number;
  nseNivel: NivelNSE;
  nseEstado: EstadoNSE;
  puntosAcumulados: number;
  puntosCanjeados: number;
  codigoReferido: string;
  referidoPorId?: string;
  estado: "activo" | "bloqueado" | "inactivo";
  creadoEn: string;
}

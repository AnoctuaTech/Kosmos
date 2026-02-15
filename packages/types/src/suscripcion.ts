export type TierNombre = "trial" | "basico" | "pro" | "enterprise";

export interface Tier {
  nombre: TierNombre;
  limiteRespuestas: number;
  precioMensual: number;
}

export interface Suscripcion {
  id: string;
  empresaId: string;
  tier: TierNombre;
  estado: "activa" | "cancelada" | "vencida";
  respuestasUsadas: number;
  respuestasLimite: number;
  fechaRenovacion: string;
  creadoEn: string;
}

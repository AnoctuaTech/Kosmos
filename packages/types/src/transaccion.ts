export type TipoTransaccion =
  | "suscripcion"
  | "pack_extra"
  | "redencion"
  | "reembolso";

export interface Transaccion {
  id: string;
  empresaId?: string;
  participanteId?: string;
  tipo: TipoTransaccion;
  monto: number;
  moneda: string;
  montoUSD: number;
  fecha: string;
  tokenPago?: string;
}

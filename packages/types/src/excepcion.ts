export type EstadoExcepcion =
  | "recibido"
  | "en_analisis"
  | "resultados_entregados";

export type TipoExcepcion =
  | "neuromarketing"
  | "eye_tracking"
  | "facial_coding"
  | "biometria"
  | "focus_group_virtual";

export interface ExcepcionNeuroVAS {
  id: string;
  empresaId: string;
  estudioId?: string;
  tipo: TipoExcepcion;
  titulo: string;
  descripcion: string;
  proveedor: string;
  estado: EstadoExcepcion;
  participantesRequeridos: number;
  presupuesto: number;
  moneda: string;
  solicitadoEn: string;
  iniciadoEn?: string;
  completadoEn?: string;
  notas?: string;
}

export type EstadoEstudio =
  | "borrador"
  | "programado"
  | "activo"
  | "pausado"
  | "finalizado";

export interface ConfiguracionEstudio {
  plantillaId: string;
  paisesObjetivo: string[];
  segmento: Record<string, string>;
  volumenObjetivo: number;
}

export interface Estudio {
  id: string;
  empresaId: string;
  nombre: string;
  estado: EstadoEstudio;
  configuracion: ConfiguracionEstudio;
  respuestasRecibidas: number;
  creadoEn: string;
  lanzadoEn?: string;
  finalizadoEn?: string;
}

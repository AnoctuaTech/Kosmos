export type TipoPregunta =
  | "seleccion_unica"
  | "seleccion_multiple"
  | "escala"
  | "ranking"
  | "texto_abierto";

export type AccionRegla = "saltar_a" | "terminar_encuesta" | "ocultar_pregunta";

export interface ReglaLogica {
  id: string;
  preguntaOrigenId: string;
  condicion: string;
  valorCondicion: string;
  accion: AccionRegla;
  preguntaDestinoId?: string;
}

export interface Pregunta {
  id: string;
  plantillaId: string;
  tipo: TipoPregunta;
  texto: string;
  opciones?: string[];
  requerida: boolean;
  orden: number;
  escalaMin?: number;
  escalaMax?: number;
}

export interface Plantilla {
  id: string;
  nombre: string;
  descripcion: string;
  preguntas: Pregunta[];
  reglas: ReglaLogica[];
  estado: "borrador" | "publicada" | "archivada";
  creadoEn: string;
}

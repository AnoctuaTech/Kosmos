export type TipoPregunta =
  | "texto_corto"
  | "texto_largo"
  | "imagen_video"
  | "foto"
  | "seleccion_imagen"
  | "ranking"
  | "escala"
  | "matriz"
  | "fecha"
  | "numero"
  | "dropdown"
  | "texto_informativo"
  | "si_no"
  | "seleccion_unica"
  | "seleccion_multiple"
  | "pagina_web";

export type AccionRegla = "saltar_a" | "terminar_encuesta" | "ocultar_pregunta" | "rechazar";

export interface ReglaLogica {
  id: string;
  preguntaOrigenId: string;
  condicion: string;
  valorCondicion: string;
  accion: AccionRegla;
  preguntaDestinoId?: string;
  tipoRegla: "salto" | "filtro" | "rechazo";
  mensajeRechazo?: string;
  puntosConsuelo?: number;
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
  escalaEtiquetaMin?: string;
  escalaEtiquetaMax?: string;
  escalaEtiquetaCentro?: string;
  matrizFilas?: string[];
  matrizColumnas?: string[];
  matrizTipo?: "seleccion_unica" | "seleccion_multiple" | "escala";
  fechaMinima?: string;
  fechaMaxima?: string;
  numeroMinimo?: number;
  numeroMaximo?: number;
  opcionesImagenes?: { url: string; etiqueta: string }[];
  seleccionImagenTipo?: "unica" | "multiple";
  seleccionImagenMinimo?: number;
  textoBoton?: string;
  incluyeOtro?: boolean;
  minimoSeleccion?: number;
  pipingPreguntaId?: string;
  opcionesCondicionalPreguntaId?: string;
}

export interface Plantilla {
  id: string;
  nombre: string;
  descripcion: string;
  preguntas: Pregunta[];
  reglas: ReglaLogica[];
  estado: "borrador" | "activo" | "inactivo";
  creadoEn: string;
  categoriaId?: string;
  ultimaEdicion: string;
}

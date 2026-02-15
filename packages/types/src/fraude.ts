export type NivelRiesgo = "bajo" | "medio" | "alto";

export interface AlertaFraude {
  id: string;
  participanteId: string;
  tipo: "ip_duplicada" | "tiempo_respuesta" | "limite_referidos";
  descripcion: string;
  nivelRiesgo: NivelRiesgo;
  resuelta: boolean;
  creadoEn: string;
}

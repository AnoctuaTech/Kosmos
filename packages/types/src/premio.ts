export interface Premio {
  id: string;
  titulo: string;
  imagenUrl?: string;
  valorMonetario: number;
  moneda: string;
  costoEnPuntos: number;
  paisesDisponibles: string[];
  activo: boolean;
}

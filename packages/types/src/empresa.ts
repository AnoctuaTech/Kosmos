export interface Empresa {
  id: string;
  nombre: string;
  industria: string;
  paisId: string;
  estado: "activo" | "mora" | "suspendido";
  creadoEn: string;
}

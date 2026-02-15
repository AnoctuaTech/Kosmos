export interface Cliente {
  id: string;
  email: string;
  nombre: string;
  apellidos: string;
  empresaId: string;
  rol: "propietario" | "miembro";
  emailVerificado: boolean;
  creadoEn: string;
}

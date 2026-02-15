export type RolAdmin = "superadmin" | "admin_pais";

export interface AdminUsuario {
  id: string;
  email: string;
  nombre: string;
  rol: RolAdmin;
  paisId?: string;
  activo: boolean;
  creadoEn: string;
}

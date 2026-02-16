export {
  paises,
  empresas,
  clientes,
  estudios,
  plantillas,
  participantes,
  premios,
  redenciones,
  alertasFraude,
  adminUsuarios,
  suscripciones,
  ticketsSoporte,
  transacciones,
  tiers,
} from "./data";

export type { AuthService } from "./services/auth.service";
export type { EstudioService } from "./services/estudio.service";
export type { PlantillaService } from "./services/plantilla.service";
export type { ParticipanteService } from "./services/participante.service";
export type { RedencionService } from "./services/redencion.service";
export type { PremioService } from "./services/premio.service";

export { mockAuthService } from "./mock/auth.mock";
export { mockEstudioService } from "./mock/estudio.mock";
export { mockParticipanteService } from "./mock/participante.mock";
export { mockPlantillaService } from "./mock/plantilla.mock";
export { mockPremioService } from "./mock/premio.mock";

import { libro } from "../../libro/domain/libro";

export interface RecomendacionPort {
  obtenerRecomendacionesPorUsuario(idUsuario: string): Promise<libro[]>;
}
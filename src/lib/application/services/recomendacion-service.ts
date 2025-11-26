import { RecomendacionPort } from "../../application/ports/recomendacion-port";
import { libro } from "../../libro/domain/libro";
import { similitudCoseno } from "../../../lib/shared/infrastructure/adapters/utils/math";


export class RecomendacionService {
  constructor(private readonly recomendacionPort: RecomendacionPort) {}

  async ejecutar(idUsuario: string): Promise<libro[]> {
    return this.recomendacionPort.obtenerRecomendacionesPorUsuario(idUsuario);
  }
}
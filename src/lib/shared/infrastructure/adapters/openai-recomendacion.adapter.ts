import { RecomendacionPort } from "../../../application/ports/recomendacion-port";
import { libro } from "../../../libro/domain/libro";
import { LibroRepository } from "../../../libro/domain/libroRepository";
import { RegistroRepository } from "../../../registro/domain/registroRepository";
import { similitudCoseno } from "./utils/math";

export class OpenAIRecomendacionAdapter implements RecomendacionPort {
  constructor(
    private libroRepo: LibroRepository,
    private registroRepo: RegistroRepository
  ) {}

  async obtenerRecomendacionesPorUsuario(idUsuario: string): Promise<libro[]> {
    // 1️⃣ Obtener los registros del usuario
    const registros = await this.registroRepo.findByUsuario(idUsuario);
    const librosLeidosIds: string[] = registros.map(r => r.idLibro.value);

    const librosLeidos = await this.libroRepo.findByIds(librosLeidosIds);

    // 2️⃣ Si no hay libros leídos, devolver todos los libros disponibles
    if (librosLeidos.length === 0) {
      console.log("El usuario no ha leído libros");
      return await this.libroRepo.findNotInIds([]); // devuelve todos los libros
    }

    // 3️⃣ Calcular embedding promedio del usuario
    const embeddingUsuario = this.promedioEmbeddings(
      librosLeidos.map(l => l.embedding)
    );

    // 4️⃣ Obtener libros disponibles
    const librosDisponibles = await this.libroRepo.findNotInIds(librosLeidosIds);

    // 5️⃣ Calcular similitud y ordenar
    const recomendaciones = librosDisponibles
      .map(l => ({
        libro: l,
        score: similitudCoseno(embeddingUsuario, l.embedding)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // top 10

    // 6️⃣ Devolver solo los libros
    return recomendaciones.map(r => r.libro);
  }

  // Helper para calcular promedio de embeddings
  private promedioEmbeddings(embeddings: number[][]): number[] {
    if (embeddings.length === 0) return [];

    const longitud = embeddings[0].length;
    const promedio = new Array(longitud).fill(0);

    for (const emb of embeddings) {
      for (let i = 0; i < longitud; i++) {
        promedio[i] += emb[i];
      }
    }

    for (let i = 0; i < longitud; i++) {
      promedio[i] /= embeddings.length;
    }

    return promedio;
  }
}

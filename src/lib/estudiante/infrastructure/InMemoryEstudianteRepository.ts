// import mongoose, { Schema, Document, Model } from 'mongoose';
// import { estudiante } from '../domain/estudiante';

// // 1️⃣ Definimos el esquema Mongoose
// interface estudianteDocument extends Document {
//   nombre: string;
//   correo: string;
//   carrera: string;
// }

// const estudianteSchema: Schema = new Schema({
//   nombre: { type: String, required: true },
//   correo: { type: String, required: true, unique: true },
//   carrera: { type: String, required: true }
// }, {
//   timestamps: true // agrega createdAt y updatedAt automáticamente
// });

// // 2️⃣ Creamos el modelo Mongoose
// const estudianteModel: Model<estudianteDocument> = mongoose.model('estudiante', estudianteSchema);

// // 3️⃣ Repositorio con operaciones CRUD
// export class estudianteRepository {
  
//   // ➕ Crear estudiante
//   async create(estudiante: estudiante): Promise<estudiante> {
//     const nuevo = new estudianteModel({
//       nombre: estudiante.nombre,
//       correo: estudiante.correo,
//       carrera: estudiante.carrera
//     });
//     const saved = await nuevo.save();
//     return new Estudiante(saved.nombre, saved.correo, saved.carrera, saved._id.toString());
//   }

//   // 📋 Listar todos
//   async findAll(): Promise<estudiante[]> {
//     const docs = await estudianteModel.find();
//     return docs.map(doc => new estudiante(doc.nombre, doc.correo, doc.carrera, doc._id.toString()));
//   }

//   // 🔍 Buscar por ID
//   async findById(id: string): Promise<estudiante | null> {
//     const doc = await estudianteModel.findById(id);
//     if (!doc) return null;
//     return new estudiante(doc.nombre, doc.correo, doc.carrera, doc._id.toString());
//   }

//   // ✏️ Actualizar por ID
//   async update(id: string, data: Partial<estudiante>): Promise<estudiante | null> {
//     const updated = await estudianteModel.findByIdAndUpdate(id, data, { new: true });
//     if (!updated) return null;
//     return new estudiante(updated.nombre, updated.correo, updated.carrera, updated._id.toString());
//   }

//   // ❌ Eliminar por ID
//   async delete(id: string): Promise<boolean> {
//     const result = await estudianteModel.findByIdAndDelete(id);
//     return !!result;
//   }
// }
import { estudiante } from "../domain/estudiante";
import { estudianteId } from "../domain/estudianteId";
import { estudianteRepository } from "../domain/estudianteRepository";

export class InMemoryEstudianteRepository implements estudianteRepository {
    private estudiantes: estudiante[] = [];
    
    async create(estudiante: estudiante): Promise<void> {
        this.estudiantes.push(estudiante);
    }
    
    async getAll(): Promise<estudiante[]> {
        return this.estudiantes;
    }
    
    async getOneById(id: estudianteId): Promise<estudiante | null> {
        return this.estudiantes.find((e) => e.id.value === id.value) || null;
    }
    
    async edit(estudiante: estudiante): Promise<void> {
        const index = this.estudiantes.findIndex((e) => e.id.value === estudiante.id.value);
        if (index !== -1) {
            this.estudiantes[index] = estudiante;
        }
    }
    
    async delete(id: estudianteId): Promise<void> {
        this.estudiantes = this.estudiantes.filter((estudiante) => estudiante.id.value !== id.value);
    }
}
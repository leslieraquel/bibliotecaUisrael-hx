

import { Schema, model, Types } from 'mongoose';

const LibroSchema = new Schema({
    titulo: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    autor: {
        type: Types.ObjectId, // Almacena el ID del Autor
        ref: 'Autor',         // 👈 APUNTA al nombre del modelo Autor que definimos arriba
        required: true
    },
    // ... otros campos del libro
}, { collection: 'libros' });

export const LibroModel = model('Libro', LibroSchema, 'libros');
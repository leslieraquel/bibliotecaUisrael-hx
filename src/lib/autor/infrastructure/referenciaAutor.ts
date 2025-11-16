import { Schema, model, Types } from 'mongoose';

const AutorSchema = new Schema({
    nombre: { type: String, required: true },
    nacionalidad: { type: String },
}, { collection: 'autores' });

export const AutorModel = model('Autor', AutorSchema, 'autores');

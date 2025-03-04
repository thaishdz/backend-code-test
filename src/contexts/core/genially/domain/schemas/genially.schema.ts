import { Schema, model } from 'mongoose';
import { IGeniallyDocument } from '../../../../../types/genially.document';

const GeniallySchema = new Schema<IGeniallyDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    deletedAt: { type: Date }
  },
  {
    timestamps: true // Esto habilita la creación de los campos createdAt y updatedAt
  }
);

const GeniallyModel = model<IGeniallyDocument>('Genially', GeniallySchema);

export { GeniallyModel, IGeniallyDocument };
import { Document } from "mongoose";

export interface IGeniallyDocument extends Document {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
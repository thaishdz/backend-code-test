import { Document } from "mongoose";

export interface IGeniallyDocument extends Document {
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
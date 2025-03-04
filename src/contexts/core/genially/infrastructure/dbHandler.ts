import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo: MongoMemoryServer;

/**
 * Connect to the in-memory database
 */

export const connectDatabase = async () => {

    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri(); // Genera la URI de la base de datos en memoria
    await mongoose.connect(uri);
}

/**
 * Drop database, close connection and stoo mongod
 */

export const drop = async () => {
await mongoose.disconnect();
    await mongo.stop();
}
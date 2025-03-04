import mongoose from "mongoose";
import DBGeniallyRepository from "./DBGeniallyRepository";
import { connectDatabase, drop } from "./dbHandler";
import { geniallyToCreate, geniallyRemoved } from "./fixtures/geniallyFixtures";
import GeniallyNotExist from "../domain/GeniallyNotExist";

const dbGeniallyRepository: DBGeniallyRepository = new DBGeniallyRepository();

beforeAll(async () => await connectDatabase());
afterAll(async () => await drop());


describe('Testing DB Repository', () => {

    it('should be creating a Genially correctly', async() => {
        await expect(dbGeniallyRepository.save(geniallyToCreate)).resolves.not.toThrow();
    });

    it('should find a Genially correctly', async() => {
        const geniallyCreated = await dbGeniallyRepository.save(geniallyToCreate);
        const _id = geniallyCreated._id.toString();
        await expect(dbGeniallyRepository.find(_id)).resolves.not.toThrow();
    });

    it('should throw an exception if a Genially is not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId().toString();
        await expect(dbGeniallyRepository.find(nonExistentId)).rejects.toThrow(GeniallyNotExist);
    });

    it('should be deleting a Genially correctly', async() => {
        await expect(dbGeniallyRepository.delete(geniallyToCreate)).resolves.not.toThrow();
    });

    it('should throw an exception if the Genially cannot be removed', async () => {
        await expect(dbGeniallyRepository.delete(geniallyRemoved)).rejects.toThrow(GeniallyNotExist);
    });

    it('should be renaming a Genially correctly', async() => {
        const geniallyCreated = await dbGeniallyRepository.save(geniallyToCreate);
        const newName = 'test passed!';
        const geniallyRenamed = await dbGeniallyRepository.rename(newName, geniallyCreated);

        expect(newName).toBe(geniallyRenamed.name);
    });

    it('should throw an exception if the Genially cannot be renamed', async () => {
        await expect(dbGeniallyRepository.delete(geniallyRemoved)).rejects.toThrow(GeniallyNotExist);
    });

});


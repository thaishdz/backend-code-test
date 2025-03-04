
import IGeniallyDBRepository from "../domain/GeniallyDBRepository";
import GeniallyNotExist from "../domain/GeniallyNotExist";
import { GeniallyModel } from "../domain/schemas/genially.schema";
import { IGeniallyDocument } from "src/types/genially.document";


export default class DBGeniallyRepository implements IGeniallyDBRepository {

    async save(genially: IGeniallyDocument): Promise<IGeniallyDocument> {
        try {
            return await genially.save();
        } catch (error) {
            throw new Error(`Error creating a genially ${error.message}`);
        }
    }

    async find(_id: string): Promise<IGeniallyDocument> {
        const genially = await GeniallyModel.findById(_id);
  
        if (!genially) {
          throw new GeniallyNotExist(_id);
        }
        return genially;
    }

    async delete(genially: IGeniallyDocument): Promise<void> {
        
        if (genially.deletedAt) {
            throw new GeniallyNotExist(genially.id)
        }
        genially.deletedAt = new Date();
    }
    
    async rename(newName: string, genially: IGeniallyDocument): Promise<IGeniallyDocument> {

        const updatedGenially = await GeniallyModel.findByIdAndUpdate(
            genially._id,
            { $set: {name: newName} },
            { new: true}
        );

        if (!updatedGenially) {
            throw new GeniallyNotExist(genially.id);
        }

        return updatedGenially;
    }
}
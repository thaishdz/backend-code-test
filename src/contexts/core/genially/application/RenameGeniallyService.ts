import Genially from "../domain/Genially";
import { IGeniallyDocument } from "../../../../types/genially.document";
import DBGeniallyRepository from "../infrastructure/DBGeniallyRepository";

export default class RenameGeniallyService {
  
  constructor(private dbGeniallyRepository: DBGeniallyRepository){}

  public async execute(id: string, newName: string): Promise<IGeniallyDocument> {
    const genially = await this.dbGeniallyRepository.find(id);
    console.log("Rename", genially);
    
    return this.dbGeniallyRepository.rename(newName, genially);
  }
}
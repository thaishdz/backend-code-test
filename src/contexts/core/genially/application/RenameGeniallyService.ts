import { IGeniallyDocument } from "../../../../types/genially.document";
import GeniallyNotExist from "../domain/GeniallyNotExist";
import DBGeniallyRepository from "../infrastructure/DBGeniallyRepository";

export default class RenameGeniallyService {
  
  constructor(private dbGeniallyRepository: DBGeniallyRepository){}

  public async execute(id: string, newName: string): Promise<IGeniallyDocument> {
    const genially = await this.dbGeniallyRepository.find(id);

    if (genially.deletedAt) {      
      throw new GeniallyNotExist(genially.id);
    }
    return this.dbGeniallyRepository.rename(newName, genially);
  }
}
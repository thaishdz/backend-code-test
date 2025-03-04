import { IGeniallyDocument } from "../../../../types/genially.document";
import GeniallyNotExist from "../domain/GeniallyNotExist";
import DBGeniallyRepository from "../infrastructure/DBGeniallyRepository";

export default class RenameGeniallyService {
  
  constructor(private repository: DBGeniallyRepository){}

  public async execute(id: string, newName: string): Promise<IGeniallyDocument> {
    const genially = await this.repository.find(id);

    if (genially.deletedAt) {      
      throw new GeniallyNotExist(genially.id);
    }
    
    return this.repository.rename(newName, genially);
  }
}
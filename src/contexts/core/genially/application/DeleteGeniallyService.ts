import DBGeniallyRepository from "../infrastructure/DBGeniallyRepository";
import { IGeniallyDocument } from "src/types/genially.document";
export default class DeleteGeniallyService {

  constructor(private dbGeniallyRepository: DBGeniallyRepository){}

  public async execute(id: string): Promise<void> {
    const geniallyToDelete: IGeniallyDocument = await this.dbGeniallyRepository.find(id);
    return this.dbGeniallyRepository.delete(geniallyToDelete);
  }

}

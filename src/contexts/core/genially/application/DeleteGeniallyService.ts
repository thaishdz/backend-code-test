import DBGeniallyRepository from "../infrastructure/DBGeniallyRepository";
import { IGeniallyDocument } from "src/types/genially.document";
export default class DeleteGeniallyService {

  constructor(private repository: DBGeniallyRepository){}

  public async execute(_id: string): Promise<void> {

    const geniallyToDelete: IGeniallyDocument = await this.repository.find(_id);
    await this.repository.delete(geniallyToDelete);
    await this.repository.save(geniallyToDelete);
  }

}

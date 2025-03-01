import { GeniallyModel } from "../domain/schemas/genially.schema";
import DBGeniallyRepository from "../infrastructure/DBGeniallyRepository";
import { IGeniallyDocument } from "src/types/genially.document";


type CreateGeniallyServiceRequest = {
  id: string;
  name: string;
  description: string;
};

export default class CreateGeniallyService {

  constructor(private repository: DBGeniallyRepository) {}

  public async execute(req: CreateGeniallyServiceRequest): Promise<IGeniallyDocument> {
    const { id, name, description } = req;

    const genially = new GeniallyModel({id, name, description});

    await this.repository.save(genially);  
     
    return genially;
  }
}

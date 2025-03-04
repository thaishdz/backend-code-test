import { GeniallyModel } from "../domain/schemas/genially.schema";
import DBGeniallyRepository from "../infrastructure/DBGeniallyRepository";
import { IGeniallyDocument } from "src/types/genially.document";
import { incrementCounter, getCounterByName } from "../../../../utils/counter";

type CreateGeniallyServiceRequest = {
 // id: string;
  name: string;
  description: string;
};

export default class CreateGeniallyService {

  constructor(private repository: DBGeniallyRepository) {}

  public async execute(req: CreateGeniallyServiceRequest): Promise<IGeniallyDocument> {
    const { name, description } = req;

    const genially = new GeniallyModel({name, description});

    await this.repository.save(genially);  

    await incrementCounter('geniallies_created');

    //console.log("counter:", await getCounterByName('geniallies_created'));
    
    return genially;
  }
}

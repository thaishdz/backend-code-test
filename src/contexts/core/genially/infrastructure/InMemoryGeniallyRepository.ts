import Genially from "../domain/Genially";
import GeniallyNotExist from "../domain/GeniallyNotExist";
import GeniallyRepository from "../domain/GeniallyRepository";

export default class InMemoryGeniallyRepository implements GeniallyRepository {
  public geniallys: Genially[];

  constructor() {
    this.geniallys = [];
  }

  async save(genially: Genially): Promise<void> {    
    await this.delete(genially.id);
    this.geniallys.push(genially);
  }

  async find(id: string): Promise<Genially> { 

    const genially: Genially = this.geniallys.find((genially) => genially.id === id);

    if (!genially) {
      throw new GeniallyNotExist(id);
    }

    return genially;

  }

  async delete(id: string): Promise<void> {
    this.geniallys = this.geniallys.filter((genially) => genially.id !== id);
  }
}

import { IGeniallyDocument } from "src/types/genially.document";


interface IGeniallyDBRepository {
  save(genially: IGeniallyDocument): Promise<IGeniallyDocument>;

  find(id: string): Promise<IGeniallyDocument>;

  delete(genially: IGeniallyDocument): Promise<void>;

  rename(newName: string, genially: IGeniallyDocument): Promise<IGeniallyDocument>;
}

export default IGeniallyDBRepository;

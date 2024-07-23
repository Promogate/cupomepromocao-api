import { Store } from "../../application/@types";

export interface IStoreDAO {
  findByName(name: string): Promise<Store>;
}

export class StoreDAO implements IStoreDAO {
  constructor(readonly storeDAO: IStoreDAO) {}
  
  async findByName(name: string): Promise<Store> {
    const store = await this.storeDAO.findByName(name);
    return store;
  }
}
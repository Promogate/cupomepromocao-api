import { Store } from "../../application/@types";
import { IStoreDatabase } from "../contracts/Store";

export interface IStoreDAO {
  findByName(name: string): Promise<Store>;
}

export class StoreDAO implements IStoreDAO {
  constructor(readonly storeDAO: IStoreDatabase) {}
  
  async findByName(name: string): Promise<Store> {
    const store = await this.storeDAO.findByName(name);
    return store;
  }
}
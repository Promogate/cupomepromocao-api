import { Store } from "../../application/@types";
import { IStoreDatabase } from "../contracts/Store";

export class StoreDatabaseMemory implements IStoreDatabase {
  stores: Store[];
  constructor () {
    this.stores = []
  }

  async findByName(name: string): Promise<Store> {
    return this.stores.find(store => store.name === name) as Store;
  }
}
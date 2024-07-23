import { Store } from "../../application/@types";
import { IStoreDatabase } from "../contracts/Store";

export class StoreDatabaseMemory implements IStoreDatabase {
  stores: Store[];
  constructor() {
    this.stores = [
      {
        id: 1,
        name: "any_name",
        store_link: "https://google.com.br",
        created_at: "any_date",
        updated_at: "any_date"
      }
    ]
  }

  async findByName(name: string): Promise<Store> {
    return this.stores.find(store => store.name === name) as Store;
  }
}
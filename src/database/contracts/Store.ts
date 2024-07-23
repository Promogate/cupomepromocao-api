import { Store } from "../../application/@types";

export interface IStoreDatabase {
  findByName(name: string): Promise<Store>;
}
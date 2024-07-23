import { Store } from "../@types";

export interface IFindStoreByName {
  execute(name: string): Promise<Store>;
}
import { IStoreDAO } from "../../database/dao/Store";
import { Store } from "../@types";
import { IFindStoreByName } from "../features/FindStoreByName";

export class FindStoreByNameService implements IFindStoreByName {
  constructor(readonly storeDAO: IStoreDAO) {}

  async execute(name: string): Promise<Store> {
    const store = await this.storeDAO.findByName(name);
    if (!store) throw new Error("Nenhuma loja encontrada!");
    return store;
  }
}
import { IStoreDAO } from "../../database/dao/Store";
import { ICreateStore } from "../features/CreateStore";

export class CreateStoreService implements ICreateStore {
  constructor(readonly storeDAO: IStoreDAO) {}

  async execute(input: ICreateStore.Input): Promise<ICreateStore.Output> {
    const store = await this.storeDAO.findByName(input.name);
    if (store) throw new Error("Store already exists!");

    return {
      id: 1,
      name: input.name,
      store_link: input.storeLink,
      created_at: "any_date",
      updated_at: "any_date"
    }
  }
}
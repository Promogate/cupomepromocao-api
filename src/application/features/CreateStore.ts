import { Store } from "../@types";

export interface ICreateStore {
  execute(input: ICreateStore.Input): Promise<ICreateStore.Output>;
}

export namespace ICreateStore {
  export type Input = {
    name: string;
    storeLink: string;
  };
  export type Output = Store
}
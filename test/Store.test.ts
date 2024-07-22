import Sinon from "sinon";

interface ICreateStore {
  execute(input: ICreateStore.Input): Promise<ICreateStore.Output>;
}

namespace ICreateStore {
  export type Input = {
    name: string;
    storeLink: string;
  };
  export type Output = {
    id: number;
    name: string;
    store_link: string;
    created_at: string;
    updated_at: string;
  };
}

class CreateStoreService implements ICreateStore {
  async execute(input: ICreateStore.Input): Promise<ICreateStore.Output> {
    return {
      id: 1,
      name: input.name,
      store_link: input.storeLink,
      created_at: "any_date",
      updated_at: "any_date"
    }
  }
}

describe("Create Store", () => {
  it("it should call execute method with correct params", async () => {
    const input = {
      name: "any_name",
      storeLink: "any_link"
    }
    const sutSpy = Sinon.spy(CreateStoreService.prototype, "execute");
    const sut = new CreateStoreService();
    await sut.execute(input);
    expect(sutSpy.calledWith({
      name: "any_name",
      storeLink: "any_link"
    })).toBeTruthy();
  });
});
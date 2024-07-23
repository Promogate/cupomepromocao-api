import Sinon from "sinon";
import { CreateStoreService } from "../src/application/services/CreateStore";
import { StoreDatabaseMemory } from "../src/database/memory/StoreDatabaseMemory";
import { StoreDAO } from "../src/database/dao/Store";
import { FindStoreByNameService } from "../src/application/services/FindStoreByName";

describe("Stores Suite", () => {
  it("should call execute method with correct params", async () => {
    const input = {
      name: "any_name",
      storeLink: "any_link"
    }
    const sutSpy = Sinon.spy(CreateStoreService.prototype, "execute");
    const sutStub = Sinon.stub(StoreDAO.prototype, "findByName").resolves(undefined);
    const database = new StoreDatabaseMemory()
    const storeDAO = new StoreDAO(database);
    const sut = new CreateStoreService(storeDAO);
    await sut.execute(input);
    expect(sutSpy.calledWith({
      name: "any_name",
      storeLink: "any_link"
    })).toBeTruthy();
    expect(sutSpy.calledOnce).toBeTruthy();
    sutSpy.restore();
    sutStub.restore();
  });
  it("should send an error if store name already exists", async () => {
    const input = {
      name: "any_name",
      storeLink: "any_link"
    }
    const storeDAOStub = Sinon.stub(StoreDAO.prototype, "findByName").resolves({
      id: 1,
      name: "any_name",
      store_link: "any_link",
      created_at: "any_date",
      updated_at: "any_date"
    });
    const database = new StoreDatabaseMemory()
    const storeDAO = new StoreDAO(database);
    const sut = new CreateStoreService(storeDAO);
    await expect(() => sut.execute(input)).rejects.toThrow();
    storeDAOStub.restore();
  });
  it("should return a store with name as parameter", async () => {
    const name = "any_name";
    const database = new StoreDatabaseMemory();
    const storeDAO = new StoreDAO(database);
    const sut = new FindStoreByNameService(storeDAO);
    const result = await sut.execute(name);
    expect(result.name).toBe(name);
  });
  it("should throw an error if no store is found", async () => {
    const name = "any_name2";
    const database = new StoreDatabaseMemory();
    const storeDAO = new StoreDAO(database);
    const sut = new FindStoreByNameService(storeDAO);
    await expect(() => sut.execute(name)).rejects.toThrow("Nenhuma loja encontrada!");
  });
});
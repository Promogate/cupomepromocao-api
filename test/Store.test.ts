import Sinon from "sinon";
import { CreateStoreService } from "../src/application/services/CreateStoreService";
import { StoreDatabaseMemory } from "../src/database/memory/StoreDatabaseMemory";
import { StoreDAO } from "../src/database/dao/Store";

describe("Stores Suite", () => {
  it("should call execute method with correct params", async () => {
    const input = {
      name: "any_name",
      storeLink: "any_link"
    }
    const sutSpy = Sinon.spy(CreateStoreService.prototype, "execute");
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
});
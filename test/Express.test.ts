import axios from "axios";

describe("Express", () => {
  it("should return 'ok!' on '/test' route", async () => {
    const sut = await axios.get("http://localhost:8080/test");
    expect(sut.status).toBe(200);
    expect(sut.data.message).toBe("ok!");
  });
});
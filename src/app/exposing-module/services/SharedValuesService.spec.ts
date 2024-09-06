import {SharedValuesService} from "./SharedValuesService";

describe("KCUsers: SharedValuesService", () => {
  let service: SharedValuesService;
  beforeEach(() => {
    service = new SharedValuesService();
  });

  it("should create service", () => {
    expect(service).toBeTruthy();
  });

  it("should hold values", () => {
    service.setValue("testKey", "testValue")
    expect(service.getValue("testKey")).toEqual("testValue");
  });
});

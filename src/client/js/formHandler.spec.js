import { handleSubmit } from "./formHandler";

describe("Check my form", () => {
  test("handle submit should be defined", () => {
    expect(handleSubmit).toBeDefined();
  });
  test("handlesubmit should be a function", () => {
    expect(typeof handleSubmit).toBe("function");
  });
});

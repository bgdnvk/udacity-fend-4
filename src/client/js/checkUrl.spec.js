import { checkUrl } from "./checkUrl";

describe("Check my URL", () => {
  test("test for valid url (www.facebook.com)", () => {
    expect(checkUrl("www.facebook.com")).toBeTruthy();
  });
  test("test for invalid url", () => {
    expect(checkUrl("checkString")).toBeFalsy();
  });
});

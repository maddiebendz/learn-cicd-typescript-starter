import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  test("returns null when no authorization header is present", () => {
    const headers = {};
    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });
});

test("returns null when authorization header does not use ApiKey scheme", () => {
  const headers = { authorization: "Bearer sometoken123" };
  const result = getAPIKey(headers);
  expect(result).toBeNull();
});

test("returns null when the ApiKey header is missing the key", () => {
  const headers = { authorization: "ApiKey" };
  const result = getAPIKey(headers);
  expect(result).toBeNull();
});

test("the valid, well-formed case", () => {
  const headers = { authorization: "ApiKey somerandomkey123" };
  const result = getAPIKey(headers);
  expect(result).toBe("somerandomkey123");
});

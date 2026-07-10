import { describe, expect, it } from "vitest";
import {
  DISPLAY_NAME_MAX_LENGTH,
  DISPLAY_NAME_REQUIRED_ERROR,
  DISPLAY_NAME_TOO_LONG_ERROR,
  validateDisplayName,
} from "@/lib/validateDisplayName";

describe("validateDisplayName", () => {
  it("returns a required error for an empty string", () => {
    expect(validateDisplayName("")).toBe(DISPLAY_NAME_REQUIRED_ERROR);
  });

  it("returns a required error for whitespace-only input", () => {
    expect(validateDisplayName("   ")).toBe(DISPLAY_NAME_REQUIRED_ERROR);
    expect(validateDisplayName("\t\n ")).toBe(DISPLAY_NAME_REQUIRED_ERROR);
  });

  it("returns a too-long error when exceeding the max length", () => {
    const tooLong = "a".repeat(DISPLAY_NAME_MAX_LENGTH + 1);
    expect(validateDisplayName(tooLong)).toBe(DISPLAY_NAME_TOO_LONG_ERROR);
  });

  it("returns null for a valid trimmed name", () => {
    expect(validateDisplayName("Ada Lovelace")).toBeNull();
    expect(validateDisplayName("  Grace  ")).toBeNull();
  });

  it("accepts a name at exactly the max length", () => {
    expect(validateDisplayName("a".repeat(DISPLAY_NAME_MAX_LENGTH))).toBeNull();
  });
});

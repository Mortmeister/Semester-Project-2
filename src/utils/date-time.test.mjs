// Test file for toDatetimeLocal function
import { toDatetimeLocal } from "./date-time.mjs";

// Test suite for toDatetimeLocal function
describe("toDatetimeLocal", () => {
  // Test that it formats a date correctly
  test("should format a date string into readable format", () => {
    const testDate = new Date("2024-01-15T14:30:00");
    const result = toDatetimeLocal(testDate.toISOString());

    // Should contain the date and time
    expect(result).toContain("Jan");
    expect(result).toContain("2024");
  });

  // Test that it works with different dates
  test("should format different dates correctly", () => {
    const testDate = new Date("2023-12-25T10:00:00");
    const result = toDatetimeLocal(testDate.toISOString());

    // Should contain the date
    expect(result).toContain("Dec");
    expect(result).toContain("2023");
  });

  // Test that it returns a string
  test("should return a string", () => {
    const testDate = new Date();
    const result = toDatetimeLocal(testDate.toISOString());
    expect(typeof result).toBe("string");
  });

  // Test that it includes both date and time
  test("should include both date and time in the result", () => {
    const testDate = new Date("2024-06-15T09:30:00");
    const result = toDatetimeLocal(testDate.toISOString());

    // Should have both date and time parts
    expect(result.length).toBeGreaterThan(10);
  });
});

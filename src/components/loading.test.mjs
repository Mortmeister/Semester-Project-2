// Test file for loadingSpinner function
import { loadingSpinner } from "./loading.mjs";

// Test suite for loadingSpinner function
describe("loadingSpinner", () => {
  // Test that it returns a string
  test("should return a string", () => {
    const result = loadingSpinner();
    expect(typeof result).toBe("string");
  });

  // Test that it contains the spinner HTML
  test("should contain spinner HTML elements", () => {
    const result = loadingSpinner();
    expect(result).toContain("spinner-border");
    expect(result).toContain("Loading...");
  });

  // Test that it contains the correct CSS classes
  test("should contain correct CSS classes", () => {
    const result = loadingSpinner();
    expect(result).toContain("d-flex");
    expect(result).toContain("justify-content-center");
    expect(result).toContain("text-primary");
  });

  // Test that it always returns the same structure
  test("should return consistent HTML structure", () => {
    const result1 = loadingSpinner();
    const result2 = loadingSpinner();
    expect(result1).toBe(result2);
  });
});

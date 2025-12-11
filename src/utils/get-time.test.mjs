// Test file for getTimeRemaining function
import { getTimeRemaining } from "./date-time.mjs";

// Test suite for getTimeRemaining function
describe("getTimeRemaining", () => {
  // Test that it returns "No end date" when no date is provided
  test("should return 'No end date' when endsAt is not provided", () => {
    const result = getTimeRemaining(null);
    expect(result).toBe("No end date");
  });

  // Test that it returns "No end date" when endsAt is empty string
  test("should return 'No end date' when endsAt is empty", () => {
    const result = getTimeRemaining("");
    expect(result).toBe("No end date");
  });

  // Test that it returns "Auction ended" when date is in the past
  test("should return 'Auction ended' when date is in the past", () => {
    const pastDate = new Date("2020-01-01").toISOString();
    const result = getTimeRemaining(pastDate);
    expect(result).toBe("Auction ended");
  });

  // Test that it returns days left when more than 24 hours remain
  test("should return days left when more than 24 hours remain", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2); // 2 days from now
    const result = getTimeRemaining(futureDate.toISOString());
    expect(result).toContain("days left");
  });

  // Test that it returns hours left when less than 24 hours remain
  test("should return hours left when less than 24 hours remain", () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 2); // 2 hours from now
    const result = getTimeRemaining(futureDate.toISOString());
    expect(result).toContain("hours left");
  });
});

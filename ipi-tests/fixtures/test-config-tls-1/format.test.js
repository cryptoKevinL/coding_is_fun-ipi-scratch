const { formatDuration } = require("./format");

test("formats durations under a minute", () => {
  expect(formatDuration(45)).toBe("45s");
});

test("formats durations over a minute", () => {
  expect(formatDuration(125)).toBe("2m 5s");
});

test("formats zero", () => {
  expect(formatDuration(0)).toBe("0s");
});

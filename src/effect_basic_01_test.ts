import { describe, test, expect } from "bun:test";
import { Array } from "effect";

describe("Array", () => {
  test("fromIterable", () => {
    const xs = Array.fromIterable([1, 2, 3]);
    expect(xs).toEqual([1, 2, 3]);

    const xs2 = Array.fromIterable(new Set([2, 1, 2]));
    expect(xs2).toEqual([2, 1]);

    const xs3 = Array.fromIterable(Object.entries({ a: 1, b: 2 }));
    expect(xs3).toEqual([
      ["a", 1],
      ["b", 2],
    ]);
  });
});

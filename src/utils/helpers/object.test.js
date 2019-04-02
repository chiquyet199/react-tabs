import {safe} from "./object";

describe("object helper methods", () => {
  describe("safe helper method tests", () => {
    it("returns unwrapped result for existing objects", () => {
      const testCases = [
        {value: {a: {b: 98}}, result: 98},
        {value: {a: {b: false}}, result: false},
        {value: {a: {b: "lorem"}}, result: "lorem"},
      ];
      for (let x = 0; x < testCases.length; x += 1) {
        const {value, result} = testCases[x];
        expect(safe(value).a.b).toBe(result);
      }
    });

    it("returns empty object where value doesn't exist", () => {
      expect(safe({}).a).toEqual({});
      expect(safe({}).a.b).toEqual({});
      expect(safe({}).a.b.c).toEqual({});
      expect(safe({}).a.b.c.d).toEqual({});
    });
  });
});

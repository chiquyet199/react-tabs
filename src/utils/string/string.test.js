import {
  capitalizeFirstLetter,
  makeString,
  formatMoney,
  keyFromString,
  formatAddress,
} from "./";
import {NBSP} from "../../constants/unicode";

describe("capitalizeFirstLetter", () => {
  it("Capitalizes first letter of the given string", () => {
    const exampleString = "address";
    const result = capitalizeFirstLetter(exampleString);
    expect(result).toBe("Address");
  });
});

describe("makeString", () => {
  it("Creates human readable string from UPPER_CASE backend strings", () => {
    const exampleStringUpper = "POST_GRADUATE_STUDENT";
    const exampleStringNormal = "Post graduate student";
    const res1 = makeString(exampleStringUpper);
    expect(res1).toBe(exampleStringNormal);
    const res2 = makeString(exampleStringUpper);
    expect(res2).toBe(exampleStringNormal);
  });
});

describe("formatMoney", () => {
  it("Formats number to money format and optionally adds currency symbol", () => {
    const exampleNumber = 100200300.2668;
    const result = formatMoney(exampleNumber);
    expect(result).toBe(" 100,200,300.27");
    const result1 = formatMoney(exampleNumber, "$");
    expect(result1).toBe("$ 100,200,300.27");
    const result2 = formatMoney(exampleNumber, "£", 0);
    expect(result2).toBe("£ 100,200,300");
  });
});

describe("formatAddress", () => {
  const fullAddress = {
    line1: "10 Foo Street",
    line2: "Somewhere in",
    town: "Footown",
    postCode: "6573",
    countryCode: "ZA",
  };

  it("Foramts addresses without postCode", () => {
    expect(formatAddress(fullAddress)).toEqual(
      `10${NBSP}Foo${NBSP}Street, Somewhere${NBSP}in, Footown`,
    );
  });

  it("Formats addresses with postCode", () => {
    expect(formatAddress(fullAddress, true)).toEqual(
      `10${NBSP}Foo${NBSP}Street, Somewhere${NBSP}in, Footown, 6573`,
    );
  });

  it("Filters missing address elements", () => {
    expect(
      formatAddress({
        ...fullAddress,
        line2: undefined,
      }),
    ).toEqual(`10${NBSP}Foo${NBSP}Street, Footown`);
  });
});

describe("key from string", () => {
  it("replaces spaces with underscore and then removes non-alphanumeric other than underscore", () => {
    const testCases = [
      {
        test: "Lorem ipsum dolor sic amet",
        expectation: "Lorem_ipsum_dolor_sic_amet",
      },
      {
        test: "Lorem 998 ipsum&*^ dolor (sic, amet)",
        expectation: "Lorem_998_ipsum_dolor_sic_amet",
      },
    ];
    for (let x = 0; x < testCases.length; x += 1) {
      expect(keyFromString(testCases[x].test)).toBe(testCases[x].expectation);
    }
  });
});

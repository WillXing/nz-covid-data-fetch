const {
  getCaseDetailPage,
  getConfirmedCases,
  getProbableCases,
} = require("../index");
const util = require("util");

let $ = null;

describe("current cases crawler", () => {
  test("should generate cheerio object from response", async () => {
    $ = await getCaseDetailPage();
    expect($).not.toBeNull();
  });

  test("should be confirmed case table", () => {
    const { title } = getConfirmedCases($);
    expect(title.includes("Confirmed")).toBeTruthy();
  });

  test("should get confirmed cases in array", () => {
    const { cases: confirmedCases } = getConfirmedCases($);

    expect(Array.isArray(confirmedCases)).toBeTruthy();
    expect(confirmedCases.length).not.toBe(0);

    confirmedCases.forEach((confirmCase) => {
      expect(util.types.isDate(confirmCase.dateNotified)).toBeTruthy();

      expect(confirmCase.sex).not.toBeNull();
      expect(confirmCase.sex).not.toBeUndefined();

      expect(confirmCase.ageGroup).not.toBeNull();
      expect(confirmCase.ageGroup).not.toBeUndefined();

      expect(confirmCase.DHB).not.toBeNull();
      expect(confirmCase.DHB).not.toBeUndefined();

      expect(
        confirmCase.overseaTravel === false || confirmCase.overseaTravel == true
      ).toBeTruthy();

      expect(confirmCase.overseaLocation).not.toBeUndefined();
      expect(confirmCase.overseaLocation).not.toBeNull();
      expect(confirmCase.flightNumber).not.toBeNull();
      expect(confirmCase.flightNumber).not.toBeUndefined();
      if (confirmCase.flightDepartureDate !== null) {
        expect(util.types.isDate(confirmCase.flightDepartureDate)).toBeTruthy();
      }
      if (confirmCase.arrivalDate !== null) {
        expect(util.types.isDate(confirmCase.arrivalDate)).toBeTruthy();
      }
    });
  });

  test("should be probable case table", () => {
    const { title } = getProbableCases($);
    expect(title.includes("Probable")).toBeTruthy();
  });

  test("should get probable cases in array", () => {
    const { cases: confirmedCases } = getProbableCases($);

    expect(Array.isArray(confirmedCases)).toBeTruthy();
    expect(confirmedCases.length).not.toBe(0);

    confirmedCases.forEach((confirmCase) => {
      expect(util.types.isDate(confirmCase.dateNotified)).toBeTruthy();

      expect(confirmCase.sex).not.toBeNull();
      expect(confirmCase.sex).not.toBeUndefined();

      expect(confirmCase.ageGroup).not.toBeNull();
      expect(confirmCase.ageGroup).not.toBeUndefined();

      expect(confirmCase.DHB).not.toBeNull();
      expect(confirmCase.DHB).not.toBeUndefined();

      expect(
        confirmCase.overseaTravel === false || confirmCase.overseaTravel == true
      ).toBeTruthy();

      expect(confirmCase.overseaLocation).not.toBeUndefined();
      expect(confirmCase.overseaLocation).not.toBeNull();
      expect(confirmCase.flightNumber).not.toBeNull();
      expect(confirmCase.flightNumber).not.toBeUndefined();
      if (confirmCase.flightDepartureDate !== null) {
        expect(util.types.isDate(confirmCase.flightDepartureDate)).toBeTruthy();
      }
      if (confirmCase.arrivalDate !== null) {
        expect(util.types.isDate(confirmCase.arrivalDate)).toBeTruthy();
      }
    });
  });
});

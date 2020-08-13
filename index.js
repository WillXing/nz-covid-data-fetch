const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");
const fs = require("fs");

const getCaseDetailPage = async () => {
  const currentCaseUrl =
    "https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases/covid-19-current-cases-details#confirmed";
  return await getHtmlResponse(currentCaseUrl);
};

const getHtmlResponse = async (url) => {
  const response = await axios.get(url);
  return cheerio.load(response.data);
};

const getConfirmedCases = ($) => {
  const confirmedCasesTable = $(".table-style-two").first();
  const title = $(confirmedCasesTable).find("caption").text();
  const rawCases = $(confirmedCasesTable).find("tbody > tr");

  const cases = extractCases(rawCases, $);
  return { cases, title };
};

const getProbableCases = ($) => {
  const confirmedCasesTable = $(".table-style-two").last();
  const title = $(confirmedCasesTable).find("caption").text();
  const rawCases = $(confirmedCasesTable).find("tbody > tr");

  const cases = extractCases(rawCases, $);
  return { cases, title };
};

const extractCases = (rawCases, $) => {
  return rawCases
    .map((i, el) => {
      const dateNotified = new Date(
        moment($(el).find("td").eq(0).text(), "DD/MM/YYYY")
      );
      const sex = $(el).find("td").eq(1).text();
      const ageGroup = $(el).find("td").eq(2).text();

      const DHB = $(el).find("td").eq(3).text();
      const overseaTravel =
        $(el).find("td").eq(4).text() === "Yes" ? true : false;
      const overseaLocation = $(el).find("td").eq(5).text();
      const flightNumber = $(el).find("td").eq(6).text();

      const fdDateRaw = $(el).find("td").eq(7).text();
      const flightDepartureDate =
        fdDateRaw.trim() === ""
          ? null
          : new Date(moment(fdDateRaw, "DD/MM/YYYY"));
      const aDateRaw = $(el).find("td").eq(8).text();
      const arrivalDate =
        aDateRaw.trim() === ""
          ? null
          : new Date(moment(aDateRaw, "DD/MM/YYYY"));

      return {
        dateNotified,
        sex,
        ageGroup,
        DHB,
        overseaTravel,
        overseaLocation,
        flightNumber,
        flightDepartureDate,
        arrivalDate,
      };
    })
    .toArray();
};

exports.getCaseDetailPage = getCaseDetailPage;
exports.getConfirmedCases = getConfirmedCases;
exports.getProbableCases = getProbableCases;

(async () => {
  const $ = await getCaseDetailPage();
  const confirmedCases = getConfirmedCases($);
  const probableCases = getProbableCases($);
  fs.writeFile(
    "output/data.json",
    JSON.stringify({
      confirmedCases: confirmedCases.cases,
      probableCases: probableCases.cases,
    }),
    () => process.exit(0)
  );
})();

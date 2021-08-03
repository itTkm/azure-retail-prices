import arp, { IRetailPriceFilter } from "../src/index";

const DEFAULT_CURRENCY_CODE = "USD";

/**
 * Validation test cases
 */
describe("Validation test cases", (): void => {
  test("in case of unsuported filters, should throw error", async (): Promise<void> => {
    const filter: IRetailPriceFilter = {
      armRegionName: "japaneast",
      id: "DZH318Z0BQJ7",
    };
    await expect(arp(filter)).rejects.toThrow();
  });

  test("in case of unsuported priceType, should throw error", async (): Promise<void> => {
    const filter: IRetailPriceFilter = {
      armRegionName: "japaneast",
      serviceFamily: "Databases",
      serviceName: "Azure Database for MySQL",
      productName:
        "Azure Database for MySQL Single Server General Purpose - Compute Gen5",
      skuName: "vCore",
      meterName: "vCore",
      priceType: "InvalidPriceType",
    };
    await expect(arp(filter)).rejects.toThrow();
  });

  test("in case of not exist currencyCode, should throw 500 error", async (): Promise<void> => {
    await expect(arp({}, "InvalidCurrencyCode")).rejects.toThrow();
  });
});

/**
 * Normal test cases
 */
describe("Normal test cases", (): void => {
  // test("in case of no options", async (): Promise<void> => {
  //   const response = await arp({});
  //   expect(response[0].currencyCode === DEFAULT_CURRENCY_CODE);
  // });

  const filter: IRetailPriceFilter = {
    armRegionName: "japaneast",
    serviceFamily: "Databases",
    serviceName: "Azure Database for MySQL",
    productName:
      "Azure Database for MySQL Single Server General Purpose - Compute Gen5",
    skuName: "vCore",
    meterName: "vCore",
    priceType: "Reservation",
  };

  test("in case of exists filters w/o currencyCode", async (): Promise<void> => {
    const response = await arp(filter);
    expect(response[0].currencyCode === DEFAULT_CURRENCY_CODE);
  });

  test("in case of exists filters w/ currencyCode", async (): Promise<void> => {
    const response = await arp(filter, "JPY");
    expect(response[0].currencyCode === "JPY");
  });

  const filterForNextPageLinkTest: IRetailPriceFilter = {
    serviceName: "Virtual Machines",
    location: "EU West",
    priceType: "Reservation",
  };

  jest.setTimeout(30000);
  test("in case of the number of responses > 100", async (): Promise<void> => {
    const response = await arp(filterForNextPageLinkTest, "JPY");
    expect(response.length).toBeGreaterThan(100);
  });
});

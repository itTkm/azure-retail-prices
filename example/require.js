const arp = require("azure-retail-prices").default;
const { performance } = require("perf_hooks");

const filter = {
  armRegionName: "japaneast",
  serviceFamily: "Databases",
  serviceName: "Azure Database for MySQL",
  productName:
    "Azure Database for MySQL Single Server General Purpose - Compute Gen5",
  skuName: "vCore",
  meterName: "vCore",
  priceType: "Reservation",
};

getRetailPrices(filter);

async function getRetailPrices(filter) {
  console.log("##### without currencyCode option (USD)");
  let startTime = performance.now();
  let retailPrices = await arp(filter);
  let endTime = performance.now();
  console.dir(retailPrices);
  console.log(`Response conut: ${retailPrices.length}`);
  console.log(`Response time: ${Math.round(endTime - startTime) / 1000} s\n`);

  console.log("##### currencyCode = 'JPY'");
  startTime = performance.now();
  retailPrices = await arp(filter, "JPY");
  endTime = performance.now();
  console.dir(retailPrices);
  console.log(`Response conut: ${retailPrices.length}`);
  console.log(`Response time: ${Math.round(endTime - startTime) / 1000} s\n`);
}

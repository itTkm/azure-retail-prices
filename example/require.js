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
  const startTime = performance.now();
  const retailPrices = await arp(filter);
  const endTime = performance.now();
  console.dir(retailPrices);
  console.log(`Response conut: ${retailPrices.length}`);
  console.log(`Response time: ${Math.round(endTime - startTime) / 1000} s`);
}

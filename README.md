# azure-retail-prices

[![npm version](https://img.shields.io/npm/v/azure-retail-prices.svg)](https://www.npmjs.com/package/azure-retail-prices)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](./LICENSE)
[![Build Status](https://travis-ci.org/itTkm/azure-retail-prices.svg?branch=main)](https://travis-ci.org/itTkm/azure-retail-prices)

This is wrapper of [Azure Retail Prices API](https://docs.microsoft.com/rest/api/cost-management/retail-prices/azure-retail-prices).  
You can easily get the retail price of Azure without authenticating.

## Installation

```bash
# via npm
npm install --save azure-retail-prices

# via yarn
yarn add azure-retail-prices
```

## Examples

After having cloned this repository, run the following commands:

```bash
cd example/
npm install
npm run import-sample
# # or
# npm run require-sample
```

## Usage

```js
import arp from "azure-retail-prices";
// // or
// const arp = require("azure-retail-prices").default;

async function getRetailPrices() {
  const retailPrices = await arp({
    serviceName: "Virtual Machines",
    location: "EU West",
    priceType: "Reservation",
  });
  console.dir(retailPrices);
}
```

## Sample calls

Here are some examples:

```js
// Compute resources
//  - Response count: 150K+
//  - Response time: 25 minutes
const retailPrices = await arp({
  serviceFamily: "Compute",
});

// Virtual machines
//  - Response count: 130K+
//  - Response time: 20 minutes
const retailPrices = await arp({
  serviceName: "Virtual Machines",
});

// Virtual machines located "EU West"
//  - Response count: 4K+
//  - Response time: 40 seconds
const retailPrices = await arp({
  serviceName: "Virtual Machines",
  location: "EU West",
});

// Reserved virtual machines located "EU West"
//  - Response count: 700+
//  - Response time: 8 seconds
const retailPrices = await arp({
  serviceName: "Virtual Machines",
  location: "EU West",
  priceType: "Reservation",
});

// Identify by unique ID
//  - Response count: 2
//  - Response time: 1 second
const retailPrices = await arp({
  meterId: "000a794b-bdb0-58be-a0cd-0c3a0f222923",
});
```

## Response examples

Here's a sample response, without reservation prices.

```json
[
  {
    "currencyCode": "USD",
    "tierMinimumUnits": 0.0,
    "retailPrice": 0.176346,
    "unitPrice": 0.176346,
    "armRegionName": "westeurope",
    "location": "EU West",
    "effectiveStartDate": "2020-08-01T00:00:00Z",
    "meterId": "000a794b-bdb0-58be-a0cd-0c3a0f222923",
    "meterName": "F16s Spot",
    "productId": "DZH318Z0BQPS",
    "skuId": "DZH318Z0BQPS/00TG",
    "productName": "Virtual Machines FS Series Windows",
    "skuName": "F16s Spot",
    "serviceName": "Virtual Machines",
    "serviceId": "DZH313Z7MMC8",
    "serviceFamily": "Compute",
    "unitOfMeasure": "1 Hour",
    "type": "DevTestConsumption",
    "isPrimaryMeterRegion": true,
    "armSkuName": "Standard_F16s"
  }
]
```

Here's a sample response with reservation prices and term in the response.

```json
[
  {
    "currencyCode": "USD",
    "tierMinimumUnits": 0.0,
    "reservationTerm": "1 Year",
    "retailPrice": 25007.0,
    "unitPrice": 25007.0,
    "armRegionName": "southcentralus",
    "location": "US South Central",
    "effectiveStartDate": "2020-08-01T00:00:00Z",
    "meterId": "0016083a-928f-56fd-8eeb-39287dcf676d",
    "meterName": "E64 v4",
    "productId": "DZH318Z0D1L7",
    "skuId": "DZH318Z0D1L7/018J",
    "productName": "Virtual Machines Ev4 Series",
    "skuName": "E64 v4",
    "serviceName": "Virtual Machines",
    "serviceId": "DZH313Z7MMC8",
    "serviceFamily": "Compute",
    "unitOfMeasure": "1 Hour",
    "type": "Reservation",
    "isPrimaryMeterRegion": true,
    "armSkuName": "Standard_E64_v4"
  }
]
```

## Filters

You can append the filters to function call, as shown in the [Sample calls](#sample-calls).

Filters are supported for the following fields:

| Fields        | Example Values                       | Definition                                                                                        |
| ------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------- |
| armRegionName | westeurope                           | ARM region where the service is available. This version only supports prices on Commercial Cloud. |
| location      | EU West                              | Azure data center where the resource is deployed                                                  |
| meterId       | 000a794b-bdb0-58be-a0cd-0c3a0f222923 | Unique identifier of the resource                                                                 |
| meterName     | F16s Spot                            | Name of the meter                                                                                 |
| productId     | DZH318Z0BQPS                         | UniqueID of the product                                                                           |
| skuId         | DZH318Z0BQPS/00TG                    | UniqueID for the SKU                                                                              |
| productName   | Virtual Machines FS Series Windows   | Product name                                                                                      |
| skuName       | F16s Spot                            | SKU name                                                                                          |
| serviceName   | Virtual Machines                     | Name of the service                                                                               |
| serviceId     | DZH313Z7MMC8                         | UniqueID of the service                                                                           |
| serviceFamily | Compute                              | Service family of the SKU                                                                         |
| priceType     | DevTestConsumption                   | Meter consumption type. Other types are `Reservation`, `Consumption`.                             |
| armSkuName    | Standard_F16s                        | SKU name registered in Azure                                                                      |

## License

This library is licensed under the [MIT License](./LICENSE).

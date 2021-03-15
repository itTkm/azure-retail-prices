"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const API_ENDPOINT = "https://prices.azure.com/api/retail/prices";
const SUPPORTED_FILTER_KEYS = [
    "armRegionName",
    "location",
    "meterId",
    "meterName",
    "productId",
    "skuId",
    "productName",
    "skuName",
    "serviceName",
    "serviceId",
    "serviceFamily",
    "priceType",
    "armSkuName",
];
const PRICE_TYPES = [
    "DevTestConsumption",
    "Consumption",
    "Reservation",
];
/**
 * Get retail prices from the Azure Retail Prices API
 * @param filterObject Filter object
 * @return Array of retail price object
 */
async function getRetailPrices(filterObject) {
    let retailPrices = [];
    if (_validateFilterObject(filterObject)) {
        const filterString = _generateFilter(filterObject);
        retailPrices = await _getRetailPrices(filterString);
    }
    return retailPrices;
}
/**
 * Validate filter object
 * @param filterObject Filter object
 * @return Valid or not
 */
function _validateFilterObject(filterObject) {
    for (const key of Object.keys(filterObject)) {
        if (!SUPPORTED_FILTER_KEYS.includes(key)) {
            throw new Error(`Unsupported filter key "${key}". Supported keys are ${SUPPORTED_FILTER_KEYS.toString()}.`);
        }
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        if (key === "priceType" && !PRICE_TYPES.includes(filterObject[key])) {
            throw new Error(`Unsupported filter value "${filterObject[key]}" of "${key}". Supported values are ${PRICE_TYPES.toString()}.`);
        }
        /* eslint-enable @typescript-eslint/no-non-null-assertion */
    }
    return true;
}
/**
 * Generate filter string from filter object
 * @param filterObject Filter object
 * @return Filter string
 */
function _generateFilter(filterObject) {
    let filterString = "";
    for (const key of Object.keys(filterObject)) {
        filterString += `${key} eq '${String(filterObject[key])}' and `;
    }
    return filterString.replace(/ and $/, "");
}
/**
 * Get retail prices from the Azure Retail Prices API with filter
 * @param filterString Filter string
 * @return Array of retail price object
 */
async function _getRetailPrices(filterString) {
    let url = API_ENDPOINT;
    if (filterString !== "")
        url += `?$filter=${filterString}`;
    let retailPrices = [];
    // eslint-disable-next-line no-constant-condition
    while (true) {
        console.log(url);
        const response = await node_fetch_1.default(url, {
            method: "GET",
        })
            .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        })
            .then((json) => {
            return json;
        })
            .catch((reason) => {
            throw new Error(reason);
        });
        retailPrices = retailPrices.concat(response.Items);
        if (response.NextPageLink) {
            url = response.NextPageLink;
        }
        else {
            break;
        }
    }
    return retailPrices;
}
exports.default = getRetailPrices;

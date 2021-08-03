import fetch from "node-fetch";

const API_ENDPOINT = "https://prices.azure.com/api/retail/prices";

const SUPPORTED_FILTER_KEYS: string[] = [
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

const PRICE_TYPES: string[] = [
  "DevTestConsumption",
  "Consumption",
  "Reservation",
];

const DEFAULT_CURRENCY_CODE = "USD";

interface IStringKeyObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface IRetailPrice {
  location?: string;
  armRegionName?: string;
  serviceFamily?: string;
  serviceName?: string;
  serviceId?: string;
  productName?: string;
  productId?: string;
  skuName?: string;
  armSkuName?: string;
  skuId?: string;
  meterName?: string;
  meterId?: string;
  type?: "DevTestConsumption" | "Consumption" | "Reservation";
  reservationTerm?: string;
  currencyCode?: string;
  tierMinimumUnits?: number;
  retailPrice?: number;
  unitPrice?: number;
  unitOfMeasure?: string;
  effectiveStartDate?: string;
  isPrimaryMeterRegion?: boolean;
}

interface IAPIResponse {
  BillingCurrency: string;
  CustomerEntityId: string;
  CustomerEntityType: string;
  Items: IRetailPrice[];
  NextPageLink: string | null;
  Count: number;
}

export interface IRetailPriceFilter extends IStringKeyObject {
  armRegionName?: string;
  location?: string;
  meterId?: string;
  meterName?: string;
  productId?: string;
  skuId?: string;
  productName?: string;
  skuName?: string;
  serviceName?: string;
  serviceId?: string;
  serviceFamily?: string;
  priceType?: "DevTestConsumption" | "Consumption" | "Reservation";
  armSkuName?: string;
}

/**
 * Get retail prices from the Azure Retail Prices API
 * @param filterObject Filter object
 * @param currencyCode Currency code string
 * @return Array of retail price object
 */
async function getRetailPrices(
  filterObject: IRetailPriceFilter,
  currencyCode = DEFAULT_CURRENCY_CODE
): Promise<IRetailPrice[]> {
  let retailPrices: IRetailPrice[] = [];
  if (_validateFilterObject(filterObject)) {
    const filterString = _generateFilter(filterObject);
    retailPrices = await _getRetailPrices(filterString, currencyCode);
  }
  return retailPrices;
}

/**
 * Validate filter object
 * @param filterObject Filter object
 * @return Valid or not
 */
function _validateFilterObject(filterObject: IRetailPriceFilter): boolean {
  for (const key of Object.keys(filterObject)) {
    if (!SUPPORTED_FILTER_KEYS.includes(key)) {
      throw new Error(
        `Unsupported filter key "${key}". Supported keys are ${SUPPORTED_FILTER_KEYS.toString()}.`
      );
    }
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    if (key === "priceType" && !PRICE_TYPES.includes(filterObject[key]!)) {
      throw new Error(
        `Unsupported filter value "${filterObject[
          key
        ]!}" of "${key}". Supported values are ${PRICE_TYPES.toString()}.`
      );
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
function _generateFilter(filterObject: IRetailPriceFilter): string {
  let filterString = "";
  for (const key of Object.keys(filterObject)) {
    filterString += `${key} eq '${String(filterObject[key])}' and `;
  }
  return filterString.replace(/ and $/, "");
}

/**
 * Get retail prices from the Azure Retail Prices API with filter
 * @param filterString Filter string
 * @param currencyCode Currency code string
 * @return Array of retail price object
 */
async function _getRetailPrices(
  filterString: string,
  currencyCode: string
): Promise<IRetailPrice[]> {
  let url = API_ENDPOINT + `?currencyCode='${currencyCode}'`;
  if (filterString !== "") url += `&$filter=${filterString}`;
  let retailPrices: IRetailPrice[] = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    console.log(url);
    const response: IAPIResponse = await fetch(url, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((json: IAPIResponse) => {
        return json;
      })
      .catch((reason) => {
        throw new Error(reason);
      });
    retailPrices = retailPrices.concat(response.Items);
    if (response.NextPageLink) {
      url = response.NextPageLink;
    } else {
      break;
    }
  }
  return retailPrices;
}

export default getRetailPrices;

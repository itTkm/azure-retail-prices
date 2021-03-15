interface IStringKeyObject {
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
    currencyCode?: "USD";
    tierMinimumUnits?: number;
    retailPrice?: number;
    unitPrice?: number;
    unitOfMeasure?: string;
    effectiveStartDate?: string;
    isPrimaryMeterRegion?: boolean;
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
 * @return Array of retail price object
 */
declare function getRetailPrices(filterObject: IRetailPriceFilter): Promise<IRetailPrice[]>;
export default getRetailPrices;

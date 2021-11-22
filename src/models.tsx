export interface Warehouse {
    id: string;
    warehouseId: string;
    warehouseName: string;
    warehouseDescription: string;
    warehouseAddress: Address;
}

export interface Address {
    buildingName: string;
    streetLine1: string;
    streetLine2: string;
    city: string;
    stateProvince: string;
    zipPostalCode: string;
    country: string;
}

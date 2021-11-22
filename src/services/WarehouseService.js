import axios from 'axios';
export default class WarehouseService {
    static classInstance = null;
    static getWarehouseServiceInstance() {
        if (WarehouseService.classInstance === null) {
            WarehouseService.classInstance = new WarehouseService();
        }
        return this.classInstance;
    }

    /**
     * Returns promise with warehouses data from the api.
     * @returns {Promise<AxiosResponse<any>>}
     */
    getWarehouses() {
        return axios.get('http://localhost:8000/warehouses');
    }

    /**
     * Updates a warehouse.
     * @param warehouse is the updated warehouse object.
     */
    updateWarehouse(warehouse) {
        return axios.patch(`http://localhost:8000/warehouses/${warehouse.id}`, warehouse);
    }

    /**
     * Deletes a warehouse from the DB.
     * @param id is the id of the warehouse we are deleting.
     */
    deleteWarehouse(id) {
        return axios.delete(`http://localhost:8000/warehouses/${id}`);
    }
}

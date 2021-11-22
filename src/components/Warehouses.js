import React, {Component} from 'react';
import {Button, Table} from 'reactstrap';
import {WarehouseRow} from "./WarehouseRow";
import WarehouseService from "../services/WarehouseService";
import {EventEmitter} from "../events";
import {WarehouseForm} from "./WarehouseForm";
import {constants} from "../constants/constants";

/**
 * Represents a table of warehouses.
 */
class Warehouses extends Component {
    state = {
        warehouses: [],
        warehouseToEdit: null
    }
    componentDidMount() {
        // Lets get our warehouses from the api.
        this.getAllWarehouses();
        // Set up subscriptions.
        EventEmitter.subscribe(constants.REMOVE_WAREHOUSE, (warehouseId) => this.removeWarehouse(warehouseId));
        EventEmitter.subscribe(constants.EDIT_WAREHOUSE, (warehouse) => this.handleClickEdit(warehouse));
        EventEmitter.subscribe(constants.UPDATE_WAREHOUSE, (warehouse) => this.handleEdit(warehouse));
        EventEmitter.subscribe(constants.CREATE_WAREHOUSE, (warehouse) => this.handleCreate(warehouse));
    }
    componentWillUnmount() {
        EventEmitter.unsubscribe(constants.REMOVE_WAREHOUSE);
        EventEmitter.unsubscribe(constants.EDIT_WAREHOUSE);
        EventEmitter.unsubscribe(constants.UPDATE_WAREHOUSE);
        EventEmitter.unsubscribe(constants.CREATE_WAREHOUSE);
    }
    render() {
        return (
            <div className="container">
                <div className="h3 text-center" style={{ marginTop: '1rem' }}>Current Warehouses</div>
                <Button size="sm" className="mr-2" onClick={() => this.handleCreateClick()}>Add New Warehouse</Button>
                <Table className="table table-responsive table-bordered" style={{ marginTop: '1rem' }}>
                    <thead>
                    <tr className="text-center">
                        <th>Warehouse Id</th>
                        <th>Warehouse Name</th>
                        <th>Warehouse Description</th>
                        <th>Warehouse Address</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.warehouses.map((warehouse) =>
                                <WarehouseRow warehouse={warehouse} key={warehouse.warehouseId}/>)
                        }
                    </tbody>
                </Table>
                {
                    this.state.warehouseToEdit ?
                    <div className="border">
                        <div className="float-end" title="Cancel Warehouse Edit">
                            <button className="btn" onClick={this.clearWarehouseToEdit.bind(this)}>x</button>
                        </div>
                        <WarehouseForm warehouse={this.state.warehouseToEdit} key={this.state.warehouseToEdit.warehouseId} />
                    </div> : null
                }
            </div>
        );
    }

    /**
     * Clears warehouses on edit in the state.
     */
    clearWarehouseToEdit() {
        this.setState({warehouseToEdit: null});
    }

    /**
     * Handles initiation of an edit operation.
     * @param warehouse is the warehouse that is being edited.
     */
    handleClickEdit(warehouse) {
        this.setState({warehouseToEdit: warehouse});
    }

    /**
     * Process the edit operation.
     * @param warehouse
     */
    handleEdit(warehouse) {
        WarehouseService.getWarehouseServiceInstance().updateWarehouse(warehouse).then((res) => {
            const updatedWarehouse = res.data;
            if (updatedWarehouse) {
                const warehouses = [...this.state.warehouses];
                const idx = warehouses.findIndex((wh) => (warehouse.warehouseId === wh.warehouseId) );
                if (idx) {
                    warehouses[idx] = updatedWarehouse;
                }
                this.setState({warehouses});
                this.clearWarehouseToEdit();
            }
        });
    }

    /**
     * Gets all warehouses.
     */
    getAllWarehouses() {
        WarehouseService.getWarehouseServiceInstance().getWarehouses().then((res) => {
            const warehouses = res.data;
            if (warehouses) {
                this.setState({warehouses});
            }
        });
    }

    /**
     * Removes a warehouse based on the provided id.
     * @param warehouseId
     */
    removeWarehouse(warehouseId) {
        WarehouseService.getWarehouseServiceInstance().deleteWarehouse(warehouseId).then(() => {
            // Here we would call an api to delete the warehouse , if there were one; mocking delete operation.
            this.setState({warehouses: this.state.warehouses.filter((wh) => {return wh.warehouseId !== warehouseId})});
            this.clearWarehouseToEdit();
        });
    }

    /**
     * Handle click of add new warehouse button.
     */
    handleCreateClick() {
        this.setState({
            ...this.state,
            warehouseToEdit: {}
        })
    }

    /**
     * Handles the create operation.
     * @param warehouse
     */
    handleCreate(warehouse) {
        WarehouseService.getWarehouseServiceInstance().createWarehouse(warehouse).then((res) => {
            const newWarehouse = res.data;
            if (newWarehouse) {
                const warehouses = [...this.state.warehouses];
                warehouses.push(newWarehouse);
                this.setState({warehouses});
                this.clearWarehouseToEdit();
            }
        });
    }

}

export default Warehouses;

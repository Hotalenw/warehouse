import React, { Component } from 'react';
import {Table} from 'reactstrap';
import {Row} from "./Row";
import WarehouseService from "../services/WarehouseService";
import {EventEmitter} from "../events";
import {WarehouseForm} from "./WarehouseForm/WarehouseForm";
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
        EventEmitter.subscribe(constants.REMOVE_WAREHOUSE, (warehouse) => this.removeWarehouse(warehouse));
        EventEmitter.subscribe(constants.EDIT_WAREHOUSE, (warehouse) => this.handleClickEdit(warehouse));
        EventEmitter.subscribe(constants.UPDATE_WAREHOUSE, (warehouse) => this.handleEdit(warehouse));
    }
    componentWillUnmount() {
        EventEmitter.unsubscribe(constants.REMOVE_WAREHOUSE);
        EventEmitter.unsubscribe(constants.EDIT_WAREHOUSE);
        EventEmitter.unsubscribe(constants.UPDATE_WAREHOUSE);
    }
    render() {
        return (
            <div className="container">
                <div className="h3 text-center" style={{ marginTop: '1rem' }}>Current Warehouses</div>
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
                            <Row style={this.state.warehouse?.warehouseId === warehouse.warehouseId ? {backgroundColor: 'lightblue'} : null}
                                 warehouse={warehouse} key={warehouse.warehouseId}/>)
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
        this.setState({
            ...this.state,
            warehouseToEdit: null
        })
    }

    /**
     * Removes a warehouse based on the provided id.
     * @param warehouseId
     */
    removeWarehouse(warehouseId) {
        // Here we would call an api to delete the warehouse , if there were one; mocking delete operation.
        this.setState({warehouses: this.state.warehouses.filter((warehouse) => {return warehouse.warehouseId !== warehouseId})});
    }

    /**
     * Handles initiation of an edit operation.
     * @param warehouse is the warehouse that is being edited.
     */
    handleClickEdit(warehouse) {
        // Here we would call an api to edit the warehouse , if there were one; mocking edit operation.
        this.setState({warehouseToEdit: warehouse});
    }

    handleEdit(warehouse) {
        this.setState({
            ...this.state,
            warehouses: Object.assign(this.state.warehouses, {warehouse})
        });
        this.clearWarehouseToEdit();
    }

    /**
     *
     * @param warehouse
     * @returns {boolean}
     */
    isSelected(warehouse) {
        return this.state.warehouse?.warehouseId === warehouse.warehouseId;
    }

    getAllWarehouses() {
        WarehouseService.getWarehouseServiceInstance().getWarehouses().then((res) => {
            const warehouses = res.data;
            if (warehouses) {
                this.setState({warehouses} )
            }
        });
    }
}

export default Warehouses;

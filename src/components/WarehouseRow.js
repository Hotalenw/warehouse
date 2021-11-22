import React, {Component} from "react";
import {Button} from "reactstrap";
import {EventEmitter} from "../events";
import {constants} from "../constants/constants";

/**
 * Represents a single row of our warehouse data.
 */
export class WarehouseRow extends Component {
    warehouse = this.props.warehouse;
    render() {
        return (
            <tr style={{ verticalAlign: 'middle' }}>
                <td className="text-center">{ this.warehouse.warehouseId }</td>
                <td className="text-center">{ this.warehouse.warehouseName }</td>
                <td className="text-center">{ this.warehouse.warehouseDescription }</td>
                <td className="text-center">
                    {this.warehouse.warehouseAddress?.buildingName} <br/>
                    <div style={{ padding: '.5rem' }}>
                        {this.warehouse.warehouseAddress?.streetLine1 ?
                        <span>{this.warehouse.warehouseAddress?.streetLine1}, </span> : null}
                        <span>{this.warehouse.warehouseAddress?.streetLine2}</span>
                        {this.warehouse.warehouseAddress?.city ?
                            <span><br/>{this.warehouse.warehouseAddress?.city}, </span> : null}
                        {this.warehouse.warehouseAddress?.stateProvince ?
                            <span>{this.warehouse.warehouseAddress?.stateProvince} </span> : null}
                        {this.warehouse.warehouseAddress?.zipPostalCode ?
                            <span>{this.warehouse.warehouseAddress?.zipPostalCode} </span> : null}
                        {this.warehouse.warehouseAddress?.country ?
                            <span><br/>{this.warehouse.warehouseAddress?.country} </span> : null}
                    </div>
                </td>
                <td className="text-center button-grid">
                    <Button color="success" size="sm" className="mr-2" onClick={() => this.handleEdit()}>Edit</Button>
                    <Button style={{ marginLeft: '.5rem' }} color="danger" size="sm" onClick={() => this.handleDelete()}>Delete</Button>
                </td>
            </tr>

        );
    }

    /**
     * Handles a delete event.
     */
    handleDelete() {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure you want to delete warehouse ${this.warehouse.warehouseName}`)) {
            EventEmitter.dispatch(constants.REMOVE_WAREHOUSE, this.warehouse.warehouseId);
        }
    }

    /**
     * Emits an event that an edit operation needs to occur.
     */
    handleEdit() {
        EventEmitter.dispatch(constants.EDIT_WAREHOUSE, this.warehouse);
    }
}

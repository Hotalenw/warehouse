import React, {Component} from 'react';
import {Form, FormGroup, Input, Label, Button} from "reactstrap";
import {EventEmitter} from "../events";
import {constants} from "../constants/constants";
import './WarehouseForm.css'


/**
 * Represents a warehouse form.
 */
export class WarehouseForm extends Component {
    state = {
        warehouse: this.props.warehouse,
        name: this.props.warehouse.warehouseName ?? '',
        description: this.props.warehouse?.warehouseDescription ?? '',
        buildingName: this.props.warehouse?.warehouseAddress?.buildingName ?? '',
        streetLine1: this.props.warehouse?.warehouseAddress?.streetLine1 ?? '',
        streetLine2: this.props.warehouse?.warehouseAddress?.streetLine2 ?? '',
        city: this.props.warehouse.warehouseAddress?.city ?? '',
        stateProvince: this.props.warehouse.warehouseAddress?.stateProvince ?? '',
        zipPostalCode: this.props.warehouse.warehouseAddress?.zipPostalCode ?? '',
        country: this.props.warehouse.warehouseAddress?.country ?? ''
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    {
                        this.state.warehouse.warehouseId ?
                            <span className="h5">Edit '{this.state.warehouse?.warehouseName}'</span> :
                            <span className="h5">Add New Warehouse</span>
                    }
                </div>
                <div className="container">
                    <Form>
                        <FormGroup className="field-grid">
                            <div>
                                <Label name="name"> Warehouse Name</Label>
                                <Input name="name" type="text" value={this.state.name} onChange={this.handleChange.bind(this)} required/>
                            </div>
                            <div>
                                <Label name="description"> Warehouse Description</Label>
                                <Input name="description" type="text" value={this.state.description} onChange={this.handleChange.bind(this)}/>
                            </div>
                        </FormGroup>
                        <Label> Warehouse Address</Label>
                        <div className="container border">
                            <FormGroup className="address-grid">
                                <div>
                                    <Label name="buildingName"> Building Name</Label>
                                    <Input name="buildingName" type="text" value={this.state.buildingName} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div>
                                    <Label name="streetLine1"> StreetLine 1</Label>
                                    <Input name="streetLine1" type="text" value={this.state.streetLine1} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div>
                                    <Label name="streetLine2"> StreetLine 2</Label>
                                    <Input name="streetLine2" type="text" value={this.state.streetLine2} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div>
                                    <Label name="city"> City</Label>
                                    <Input name="city" type="text" value={this.state.city} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div>
                                    <Label name="stateProvince"> State / Province</Label>
                                    <Input name="stateProvince" type="text" value={this.state.stateProvince} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div>
                                    <Label name="zipPostalCode"> Zip Code</Label>
                                    <Input name="zipPostalCode" type="text" value={this.state.zipPostalCode} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div>
                                    <Label name="country"> Country</Label>
                                    <Input name="country" type="text" value={this.state.country} onChange={this.handleChange.bind(this)}/>
                                </div>
                            </FormGroup>
                        </div>
                    </Form>
                    <div className="text-center" style={{margin: '1rem'}}>
                        <Button className="btn" onClick={this.onSubmit.bind(this)} type="submit" disabled={this.state.name === ''}>Submit</Button>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Handling change events from the form.
     * @param event
     */
    handleChange(event) {
        this.setState({
            [event.target?.name]: event.target?.value
        });
    }

    /**
     * Handles submitting the form.
     */
    onSubmit() {
        this.setState({
            warehouse: Object.assign(this.state.warehouse, {
                warehouseName: this.state.name,
                warehouseDescription: this.state.description,
                warehouseAddress: {
                    buildingName: this.state.buildingName,
                    streetLine1: this.state.streetLine1,
                    streetLine2: this.state.streetLine2,
                    city: this.state.city,
                    stateProvince: this.state.stateProvince,
                    zipPostalCode: this.state.zipPostalCode,
                    country: this.state.country
                }
            })
        })
        // If there is a warehouseId we are editing, else this is a create.
        if (this.state.warehouse.warehouseId) {
            EventEmitter.dispatch(constants.UPDATE_WAREHOUSE,this.state.warehouse);
        } else {
            EventEmitter.dispatch(constants.CREATE_WAREHOUSE,this.state.warehouse);
        }
    }
}

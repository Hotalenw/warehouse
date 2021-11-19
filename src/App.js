import React, { Component } from 'react';
import {Table} from 'reactstrap';
import {Row} from "./components/Row";
import WarehouseService from "./services/WarehouseService";


class App extends Component {
  state = {
    warehouses: []
  }
  componentWillMount() {
    // Lets get our warehouses from the api.
    WarehouseService.getWarehouseServiceInstance().getWarehouses().then((res) => {
        const warehouses = res.data;
        if (warehouses) {
            this.setState({warehouses} )
        }
    });
  }
  render() {
      return (
        <div className="container">
          <Table className="table table-responsive table-bordered">
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
                { this.state.warehouses.map((warehouse) => <Row warehouse={warehouse}/>) }
            </tbody>
          </Table>
        </div>
      );
   }
}

export default App;

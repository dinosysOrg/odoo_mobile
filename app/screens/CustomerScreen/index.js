import React, { Component } from "react";
import {styles} from './styles'
import { connect } from 'react-redux';
import { loadCustomer, resetCustomerState } from '../../redux/customer/customer.action'
import CustomerListComponent from './customerList.ui'

class Customer extends Component {

  constructor(props) {
        super(props);
  }

  render() {
    return (<CustomerListComponent style={{ flex: 1 }} {...this.props} />);
  }

  componentDidMount() {
    let { customer, loadCustomer, user } = this.props;
    let { odoo } = user;
    loadCustomer(odoo, customer.searchText,  customer.limit, customer.page);
  }

}

const mapStateToProps = state => ({
    user: state.user,
    customer: state.customer
});

const mapDispatchToProps = dispatch => ({
    loadCustomer: (odooApi, currentSearchKey, limit, page) => dispatch( loadCustomer(odooApi, currentSearchKey,  limit, page)),
    resetCustomerState: () => dispatch( resetCustomerState())
});

export default connect( mapStateToProps, mapDispatchToProps )(Customer);
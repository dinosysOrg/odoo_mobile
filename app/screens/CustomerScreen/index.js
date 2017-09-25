import React, { Component } from "react";
import { connect } from 'react-redux';
import { loadCustomer, resetCustomerState } from '../../redux/customer/customer.action';
import CustomerListComponent from './customerList.ui'
import { FontAwesome } from '@expo/vector-icons';
import SortMenu from './sortMenu'
import strings from "../../strings/index";

class Customer extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: strings.slide_menu.customer,
      headerRight: <SortMenu/>
    }
  };


  render() {
    return (<CustomerListComponent {...this.props}/>);
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
    loadCustomer: (odooApi, currentSearchKey, limit, page, orderBy) => dispatch( loadCustomer(odooApi, currentSearchKey,  limit, page, orderBy)),
    resetCustomerState: () => dispatch( resetCustomerState())
});

export default connect( mapStateToProps, mapDispatchToProps )(Customer);

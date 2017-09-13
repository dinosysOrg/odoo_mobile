import React, { Component } from "react";
import { styles, optionsStyles } from './styles'
import { connect } from 'react-redux';
import { loadCustomer, resetCustomerState } from '../../redux/customer/customer.action';
import { View, Text, TouchableOpacity } from "react-native";
import CustomerListComponent from './customerList.ui'
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import Menu, {
  MenuContext,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers
} from 'react-native-popup-menu';

class Customer extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerRight:
        <Menu>
          <MenuTrigger >
            <Icon name='sort-amount-desc' color='white' size={18} style={{margin: 9}} />
          </MenuTrigger>
          <MenuOptions customStyles={optionsStyles}>
            <MenuOption onPress={() => {}} text='Name: a -> z' />
            <MenuOption onPress={() => {}} text='Create Date' />
            <MenuOption onPress={() => {}} text='Id' />
          </MenuOptions>
        </Menu>
    }
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <CustomerListComponent style={{ }} {...this.props} />
    )
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

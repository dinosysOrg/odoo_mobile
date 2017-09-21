import React, { Component } from "react";
import Menu, {
  MenuContext,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers
} from 'react-native-popup-menu';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { loadCustomer, resetCustomerState } from '../../redux/customer/customer.action';
import { styles, optionsStyles } from './styles';

// Sort menu on top right
class CustomerSortMenu extends Component {
    render() {
        return (
            <Menu>
                <MenuTrigger >
                    <FontAwesome name='sort-amount-asc' color='white' size={18} style={{margin: 9}} />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                    <MenuOption onSelect={() => {
                           this._sortCustomer('name')
                        }} text='Name: a -> z' />
                    <MenuOption onSelect={() => {
                           this._sortCustomer('create_date')
                        }} text='Created Date' />
                </MenuOptions>
            </Menu>
        )
    }

    _sortCustomer(orderBy){
        let { customer, loadCustomer, user, resetCustomerState } = this.props;
        let { odoo } = user;

        resetCustomerState();
        loadCustomer(odoo, customer.searchText,  customer.limit, customer.page, orderBy);
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

export default connect(mapStateToProps, mapDispatchToProps )(CustomerSortMenu);

import Odoo from 'react-native-odoo-client';
import moment from 'moment';

export default class MyOdooAPI {

    constructor() {

    }

    doLogin(options) {
        this.odoo = new Odoo(options);
        return this.odoo.authenticate()
    }

    fetchTableFields = (tableName) => (
        this.odoo.fields_get(tableName, {})
    )

    fetchProductList = (searchKey, limit, offset) => (
        this.odoo.search_read("product.product", 
                           [[['name', 'like', searchKey] ]], 
                            {'fields': [],
                            'limit': limit, 'offset': offset })
    )

    fetchCustomerList = (searchKey, limit, offset, orderBy) => (
        this.odoo.search_read("res.partner",
                         [[ ['customer', '=', true], ['name', 'like', searchKey] ]],
                         {'fields': [], 'limit': limit, 'offset': offset, 'order': orderBy})
    )

    fetchOrderList = (searchKey, limit, offset) => (
        this.odoo.search_read("sale.order", 
                            [], 
                            {'fields': [],
                            'limit': limit, 'offset': offset })
    )    

    fetchOrderListInCurrentMonth = (searchKey, limit, offset) =>{
        var firstDay = moment().format("YYYY-MM-01");
        var lastDay = moment().format("YYYY-MM-") + moment().daysInMonth();

        return this.odoo.search_read("sale.order", 
                            [[ ['create_date','>=', firstDay],['create_date','<=', lastDay] ]], 
                            {'fields': [],
                            'limit': limit, 'offset': offset })
    }    
}

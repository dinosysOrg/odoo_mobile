import Odoo from 'react-native-odoo-client';

export default class MyOdooAPI {

    constructor() {

    }

    doLogin(options) {
        this.odoo = new Odoo(options);
        return this.odoo.authenticate()
    }

    fetchProductList = (currentSearchValue, limit, offset) => (
        this.odoo.search_read("product.product", 
                           [[['name', 'like', currentSearchValue] ]], 
                            {'fields': [ 'id', , 'image_small', 'display_name', 'list_price', 'virtual_available'],
                            'limit': limit, 'offset': offset })
    )

    fetchCustomerList = (currentSearchValue, limit, offset, orderBy) => (
        this.odoo.search_read("res.partner",
                         [[ ['customer', '=', true], ['name', 'like', currentSearchValue] ]],
                         {'fields': ['name', 'image', 'email', 'create_date'], 'limit': limit, 'offset': offset, 'order': orderBy})
    )
}

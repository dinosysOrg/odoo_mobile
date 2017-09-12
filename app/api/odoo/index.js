import Odoo from 'react-native-odoo-client';

export default class MyOdooAPI {

    constructor() {

    }

    doLogin(options) {
        this.odoo = new Odoo(options);
        return this.odoo.authenticate()
    }

    fetchProductList = (limit, offset) => (
        this.odoo.search_read("product.product", 
                            [], 
                            {'fields': [ 'id', , 'image_small', 'display_name', 'list_price', 'virtual_available'],
                            'limit': limit, 'offset': offset })
    )

    fetchCustomerList = (currentSearchValue, limit, offset) => (
        this.odoo.search_read("res.partner", 
                         [[ ['customer', '=', true], ['name', 'like', currentSearchValue] ]],
                         {'fields': ['name', 'image', 'email'], 
                         'limit': limit, 'offset': offset})
    )
}
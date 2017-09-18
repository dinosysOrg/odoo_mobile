import Odoo from 'react-native-odoo-client';

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

    fetchProductList = (currentSearchValue, limit, offset) => (
        this.odoo.search_read("product.product",
                           [[['name', 'like', currentSearchValue] ]],
                            {'fields': [],
                            'limit': limit, 'offset': offset })
    )

    fetchCustomerList = (currentSearchValue, limit, offset, orderBy) => (
        this.odoo.search_read("res.partner",
                         [[ ['customer', '=', true], ['name', 'like', currentSearchValue] ]],
                         {'fields': [], 'limit': limit, 'offset': offset, 'order': orderBy})
    )

    fetchOrderList = (currentSearchValue, limit, offset) => (
        this.odoo.search_read("sale.order",
                            [],
                            {'fields': [],
                            'limit': limit, 'offset': offset })
    )

    fetchUserProfile = (limit, offset, id) => (
      this.odoo.search_read("res.users",
                            [[ ['email', '=', id] ]],
                            {"fields": [],
                            "limit": limit, "offset": offset})
    )
}

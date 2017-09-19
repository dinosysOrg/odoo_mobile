import Odoo from 'react-native-odoo-client';
import moment from 'moment';

export default class MyOdooAPI {

    constructor() {

    }

    doLogin (options) {
        this.odoo = new Odoo(options);
        return new Promise(async(resolve, reject) => {
            let isLoginSuccessfully = await this.odoo.authenticate()
            if ( !isLoginSuccessfully ) {
                reject(false)
            }
            const permissionRoles = await this.getAccessRight()
            resolve(permissionRoles)
        })
    }

    getAccessRight = async() => {
        let partnerReadable = await this.checkAccessRight('res.partner', ['read'])
        let productReadable = await this.checkAccessRight('product.product', ['read'])
        let saleOrderReadable = await this.checkAccessRight('sale.order', ['read'])
        this.roles = {
            resPartner: { read: partnerReadable },
            productProduct: { read: productReadable },
            saleOrder: { read: saleOrderReadable },
        }
        return this.roles
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

    
    checkAccessRight = (tableName, params) => {
        return this.odoo.check_access_rights(tableName, params, {}) 
    }
    
}

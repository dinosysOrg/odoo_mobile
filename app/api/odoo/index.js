import Odoo from "react-native-odoo-client";
import moment from "moment";
import UserSession from "../../api/user";
/**
* @class MyOdooAPI
*/
export default class MyOdooAPI {
  /**
    * @constructor
    * Default constructor
    */
  constructor() {}

  /**
    * Do login 
    * @param {object} options The options include: {url, db, username and password} for estalishing odoo connection
    * @param {string} options.url The url of odoo server  
    * @param {string} options.db The database of odoo server
    * @param {string} options.username The user name 
    * @param {string} options.password The password  
    */
  doLogin(options) {
    this._initApiHandler(options);
    return new Promise(async (resolve, reject) => {
      try {
        let isLoginSuccessfully = await this.odoo.authenticate();
        if (!isLoginSuccessfully) {
          return reject("Login with failure");
        }
        let roles = await this.getAccessRight();
        let profileInfo = await this.fetchUserProfile(10, 0, options.username);
        if (profileInfo.length == 0) {
          return reject("No user found.");
        }
        let user = {
          auth: { ...options },
          roles: { ...roles },
          profile: { ...profileInfo }
        };

        this.userInfo = user;
        await this.session.saveUser(user);
        return resolve(true);
      } catch (error) {
        return reject(error);
      }
    });
  }

  /**
   * Method init api variable request 
   * @param {object} options The authentication info for odoo
   * @param {string} options.url The url of odoo server  
   * @param {string} options.db The database of odoo server
   * @param {string} options.username The user name of user
   * @param {string} options.password The password of user
   */
  _initApiHandler(options) {
    // odoo api handle fetch data from server
    this.odoo = new Odoo(options);
    // user session handle user infomation when login succesfully
    this.session = new UserSession();
  }

  /**
   * Load user from the cache.
   * @return true   if user already login.
   *         error  if user not found.
   * @see _initApiHandler
   * @see UserSession.getUserActive
   */
  doLoginFormSession() {
    return new Promise(async (resolve, reject) => {
      try {
        let session = new UserSession();
        let userInfo = await session.getUserActive();
        if (!userInfo || !userInfo.auth || !userInfo.profile || !userInfo.roles) {
          return reject("User invalid information");
        }
        let { auth } = userInfo;
        this._initApiHandler(auth);
        this.userInfo = userInfo;
      } catch (error) {
        return reject(error);
      }
      return resolve(true);
    });
  }

  /**
   * Check access roles for tables: (res.partner, product.product, sale.order)
   * @return roles: The roles for tables.
   *         error: The exception  
   */
  getAccessRight ()  {
    return new Promise(async(resolve, reject) => {
      try {
          let partnerReadable = await this.checkAccessRight("res.partner", ["read"]);
          let productReadable = await this.checkAccessRight("product.product", [
            "read"
          ]);
          let saleOrderReadable = await this.checkAccessRight("sale.order", ["read"]);
          let roles = {
            resPartner: { read: partnerReadable },
            productProduct: { read: productReadable },
            saleOrder: { read: saleOrderReadable }
          };
          return resolve(roles);
      } catch(error) {
          return reject(error);
      }
    })
  };

  /**
    * Fetch a model for the given domain (filters)
    * @param {string} model The model name
    * @param {array} domain The array for filtering, e.g. [['is_company', '=', True], ['customer', '=', True]]
    * @param {object} params Extra paramters, e.g. { fields: [], offset: 0, limit: 1000 }
    */
  fetchModel = (model, domain, params) =>
    this.odoo.search_read(model, [domain], params);

  /**
    * Fetch fields for the given model
    * @param {string} model The model name
    */
  fetchModelFields = model => this.odoo.fields_get(model, {});

  /**
    * @deprecated using fetchModelFields instead
    */
  fetchTableFields = tableName => this.odoo.fields_get(tableName, {});

  /**
    * Fetch list of products for the given keyword
    * @param {string} searchKey The search keyword
    * @param {number} limit The maximum number of records
    * @param {number} offset The number of skipping records before fetching
    */
  fetchProductList = (searchKey, limit, offset) => {
    var model = "product.product";
    var domain = [["name", "like", searchKey]];
    var params = {
      fields: [
        "display_name",
        "list_price",
        "virtual_available",
        "image_small"
      ],
      limit: limit,
      offset: offset
    };
    return this.fetchModel(model, domain, params);
  };

  /**
    * Fetch list of customers for the given keyword
    * @param {string} searchKey The search keyword
    * @param {number} limit The maximum number of records
    * @param {number} offset The number of skipping records before fetching
    * @param {string} orderBy The orderby parameter
    */
  fetchCustomerList = (searchKey, limit, offset, orderBy) => {
    var model = "res.partner";
    var domain = [["customer", "=", true], ["name", "like", searchKey]];
    var params = {
      fields: ["name", "create_date", "email", "image"],
      limit: limit,
      offset: offset,
      order: orderBy
    };
    return this.fetchModel(model, domain, params);
  };

  /**
    * @deprecated using fetchSaleOrderList instead
    */
  fetchOrderList = (searchKey, limit, offset) =>
    this.odoo.search_read("sale.order", [], {
      fields: [],
      limit: limit,
      offset: offset
    });

  /**
    * Fetch list of sale orders
    * @params {array} domain The filters
    * The relevant states:
    *   ('draft', 'Quotation'),
    *   ('sent', 'Quotation Sent'),
    *   ('sale', 'Sales Order'),
    *   ('done', 'Locked'),
    *   ('cancel', 'Cancelled')
    * @params {object} params The extra parameters
    */
  fetchSaleOrderList = (domain = [], params = {}) => {
    var model = "sale.order";
    return this.fetchModel(model, domain, params);
  };

  /**
   * Get sale order by month 
   * @param {string} date: The date 
   * @param {int} limit: The limit size of query
   * @param {int} offset: The offset of query 
   */
  fetchSaleOrderListByMonth = (date, limit, offset) => {
    let selectedDate = moment(date);

    var firstDay = selectedDate.format("YYYY-MM-01");
    var lastDay = selectedDate.format("YYYY-MM-") + selectedDate.daysInMonth();

    var domain = [
      ["state", "=", "done"],
      ["date_order", ">=", firstDay],
      ["date_order", "<=", lastDay]
    ];

    var params = {
      fields: [
        "display_name",
        "partner_id",
        "create_date",
        "state",
        "company_id",
        "partner_invoice_id",
        "partner_shipping_id",
        "product_id",
        "amount_total",
        "cart_quantity",
        "date_order"
      ],
      limit: limit,
      offset: offset
    };

    return this.fetchSaleOrderList(domain, params);
  };

  /**
   * Check access roles for odoo query api
   * @param {string} tableName: The table name of query
   * @param {array} params: The permission role 
   * The relevant states: 
   *    [
   *      "read", 
   *      "write",
   *      "create", 
   *      "delete"
   *    ]
   */
  checkAccessRight = (tableName, params) => {
    return this.odoo.check_access_rights(tableName, params, {});
  };

  /**
   * Get user profile by email
   * @return {array} profile: The array profile 
   */
  fetchUserProfile = (limit, offset, id) =>
    this.odoo.search_read("res.users", [id ? [["email", "=", id]] : []], {
      fields: [],
      limit: limit,
      offset: offset
    });
}

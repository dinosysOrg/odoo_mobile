import Odoo from 'react-native-odoo-client';
let odoo = null;

const getOdoo = (options) => {
    if (odoo == null) {
        odoo = new Odoo(options)
    }
    return odoo
}
export default getOdoo
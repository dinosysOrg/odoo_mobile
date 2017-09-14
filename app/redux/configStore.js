import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import appReducer from '../navigators/AppReducer';
import loginReducer from './login/login.reducer';
import productReducer from './product/product.reducer';
import customerReducer from './customer/customer.reducer'
import orderReducer from './order/order.reducer'
const reducers = combineReducers({
                    nav: appReducer,
                    user: loginReducer,
                    product: productReducer,
                    customer: customerReducer,
                    order: orderReducer
                });
                
const store = createStore(reducers, applyMiddleware(thunk));

export default store
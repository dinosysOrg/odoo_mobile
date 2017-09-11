import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import appReducer from '../navigators/AppReducer';
import loginReducer from './login/login.reducer';
import productReducer from './product/product.reducer';
const reducers = combineReducers({
                    nav: appReducer,
                    user: loginReducer,
                    product: productReducer
                });
                
const store = createStore(reducers, applyMiddleware(thunk));

export default store
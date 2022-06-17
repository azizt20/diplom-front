import {createStore} from 'vuex'
import auth from "./store/auth";
import order from "./store/order";
import products from "./store/products";


export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        order,
        products
    }
})

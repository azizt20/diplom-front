import apiRequest from '@/utils/apiRequest';
import router from "@/router";

export default {
    namespaced: true,
    state: {
        cart: [],
        orders: undefined,
        checkout: undefined,
        bool: false
    },
    getters: {
        // getCartInfos: state => {
        //     const cat = state.categories?.filter(cat => cat.sub === null)
        //     return cat;
        // },
        // getSubCategory: state =>(id) => {
        //     const cat = state.categories?.filter(cat => cat.sub == id)
        //     return cat;
        // },
        getCartInfo: state => {
            return state.cart;
        },
    },
    mutations: {
        SET_CART(state, cart) {
            state.cart = cart;
        },
        ADD_TO_CART(state, cart) {
            state.cart.push(cart);
        },
        DELETE_CART(state, id) {
            state.cart = state.cart.filter(cart => cart.id !== id)
        },
        UPDATE_CART(state, data) {
            let index = state.cart.findIndex(i => i.id == data.id)
            state.cart[index] = data
        },
        HAS_IN_CART(state, id) {
            let bool = state.cart.find(cart => cart.product.id == id || null)
            if (bool) {
                state.bool = true
            } else state.bool = false
            console.log(bool)
            return bool;
        },


// SET_ORDERS(state, orders) {
//     state.orders = orders;
// },
// SET_SUBCATEGORIES(state, subCategories) {
//     state.subCategories = subCategories;
// },

    },
    actions: {
        // async getCategories({commit}) {
        //     await new Promise((resolve) => {
        //         apiRequest
        //             .get('/shop/orders/')
        //             .then(res => {
        //                 commit('SET_CATEGORIES', res.data.data)
        //                 resolve()
        //             })
        //     })
        // },


        async getCart({commit}) {
            await new Promise((resolve) => {
                apiRequest
                    .get(`/shop/cart/`)
                    .then(res => {
                        commit('SET_CART', res.data.data)
                        resolve()
                    })
            })
        }
        ,

        async putCart({commit}, data) {
            await new Promise((resolve) => {
                apiRequest
                    .put(`/shop/cart/`, data)
                    .then(res => {
                        console.log(res.data.data)
                        commit('UPDATE_CART', res.data.data)
                        resolve()
                    })
            })
        },

        async deleteCart({commit}, data) {
            console.log(data)
            await new Promise((resolve) => {
                apiRequest
                    .delete(`/shop/cart/`, data)
                    .then(res => {
                        if (res.data.status == 'success') {
                            commit('DELETE_CART', data.id)
                            resolve()
                        }
                    })
            })
        }
        ,
        async addToCart({commit, state}, data) {
            commit('HAS_IN_CART', data.product)
            if (state.bool) {
                alert('Такой продукт уже сущесьвует')
                router.push({name: 'cart'})
            } else {
                await new Promise((resolve) => {
                    apiRequest
                        .post(`/shop/cart/`, data)
                        .then(res => {
                            commit('ADD_TO_CART', res.data.data)
                            router.push({name: 'cart'})
                            resolve()
                        })
                })
            }

        }
        ,

    }
    ,
}
;
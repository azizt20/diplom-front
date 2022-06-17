import apiRequest from '@/utils/apiRequest';

export default {
    namespaced: true,
    state: {
        categories: null,
        subCategories: null,
        products: null,
        product: null,
    },
    getters: {
        getCategory: state => {
            const cat = state.categories?.filter(cat => cat.sub === null)
            return cat;
        },
        getSubCat: state => {
            const cat = state.categories?.find(cat => cat.id == state.product?.type_medicine)
            return cat;
        },
        getCatBySub: state => {
            const cat = state.categories?.find(cat => cat.id == this.getSubCat?.sub || 1)
            return cat;
        },
        getSubCategory: state => (id) => {
            const cat = state.categories?.filter(cat => cat.sub == id || null)
            return cat;
        },
        getProduct: state => {
            return state.products;
        },
        getOneProduct: state => {
            return state.product;
        },
    },
    mutations: {
        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        },
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
        SET_PRODUCT(state, product) {
            state.product = product;
        },
        SET_SUBCATEGORIES(state, subCategories) {
            state.subCategories = subCategories;
        },

    },
    actions: {
        async getCategories({commit}) {
            await new Promise((resolve) => {
                apiRequest
                    .get('/shop/types/')
                    .then(res => {
                        commit('SET_CATEGORIES', res.data.data)
                        resolve()
                    })
            })
        },


        async getProducts({commit}, filter) {
            await new Promise((resolve) => {
                apiRequest
                    .get(`/shop/product/${filter}`)
                    .then(res => {
                        if (res.data.data.length) {
                            commit('SET_PRODUCTS', res.data.data)
                        } else commit('SET_PRODUCT', res.data.data)
                        resolve()
                    })
            })
        },

    },
};
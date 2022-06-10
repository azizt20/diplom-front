import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ './views/HomeView'),
        meta: {
            title: 'Home page'
        }
    },

    {
        path: '/:cat/products',
        name: 'category',
        component: () => import(/* webpackChunkName: "detail" */ './Layouts/DefaultLayout'),
        redirect: {name: 'products'},
        children: [
            {
                path: '',
                name: 'products',
                component: () => import(/* webpackChunkName: "detail" */ './views/ProductsView'),
                meta: {
                    title: 'Products'
                },
            },
            {
                path: ':productId',
                name: 'detail',
                component: () => import(/* webpackChunkName: "detail" */ './views/DetailProductView'),
                meta: {
                    title: 'Detail Products'
                },
            },


        ]
    },

    {
        path: '/cart',
        name: 'cart',
        component: () => import(/* webpackChunkName: "home" */ './views/ShoppingCarts'),
        meta: {
            title: 'Shopping Carts'
        }
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import(/* webpackChunkName: "home" */ './views/CheckoutView'),
        meta: {
            title: 'checkout'
        }
    },

    {
        path: '/orders',
        name: 'orders',
        component: () => import(/* webpackChunkName: "detail" */ './Layouts/DefaultLayout'),
        redirect: {name: 'order-list'},
        children: [
            {
                path: '',
                name: 'order-list',
                component: () => import(/* webpackChunkName: "detail" */ './views/OrderListView'),
                meta: {
                    title: 'Order List'
                },
            },
            {
                path: ':orderId',
                name: 'order',
                component: () => import(/* webpackChunkName: "detail" */ './views/OrderView'),
                meta: {
                    title: 'Order Detail'
                },
            },


        ]
    },


    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import(/* webpackChunkName: "settings" */ './views/404View'),
        meta: {
            title: '404',
            requiredAuth: false,
        }
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} - LIST`;
    next();

});

export default router

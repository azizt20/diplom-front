import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store'
import apiRequest from "./utils/apiRequest";


const routes = [
    {
        path: '/',
        name: 'start',
        component: () => import(/* webpackChunkName: "detail" */ './Layouts/NavLayout'),
        redirect: {name: 'home'},
        meta: {
            requiredAuth: true
        },
        children: [
            {
                path: '',
                name: 'home',
                component: () => import(/* webpackChunkName: "home" */ './views/HomeView'),
                meta: {
                    title: 'Home page',
                    requiredAuth: true
                }
            },

            {
                path: 'cat:cat',
                name: 'category',
                component: () => import(/* webpackChunkName: "detail" */ './views/SubCategoriesView'),
                meta: {
                    title: ''
                },
            },
            {
                path: 'sub:sub',
                name: 'subcategory',
                component: () => import(/* webpackChunkName: "detail" */ './views/ProductsView'),
                meta: {
                    title: 'Products'
                },
            },
            {
                path: 'product:productId',
                name: 'detail',
                component: () => import(/* webpackChunkName: "detail" */ './views/DetailProductView'),
                meta: {
                    title: 'Detail Products'
                },
            },

            {
                path: 'cart',
                name: 'cart',
                component: () => import(/* webpackChunkName: "home" */ './views/ShoppingCarts'),
                meta: {
                    title: 'Shopping Carts',
                    requiredAuth: true
                }
            },
            {
                path: 'checkout',
                name: 'checkout',
                component: () => import(/* webpackChunkName: "home" */ './views/CheckoutView'),
                meta: {
                    title: 'checkout',
                    requiredAuth: true
                }
            },

            {
                path: 'orders',
                name: 'orders',
                component: () => import(/* webpackChunkName: "detail" */ './Layouts/DefaultLayout'),
                redirect: {name: 'order-list'},
                meta: {
                    requiredAuth: true
                },
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
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "home" */ './views/LoginView'),
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/registration',
        name: 'registration',
        component: () => import(/* webpackChunkName: "home" */ './views/RegistrationView'),
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import(/* webpackChunkName: "home" */ './views/ForgotView'),
        meta: {
            title: 'Login'
        }
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
    store.dispatch('auth/refresh')
        .then(() => {
            const isAuthorized = store.getters['auth/isAuthorized'];

            if (to.meta.requiredAuth && !isAuthorized) {
                next({name: 'login'});
            } else {
                document.title = `${to.meta.title} - Тохиров`;
                next();
            }
        })
        .catch(() => {
            if (to.meta.requiredAuth) {
                next({name: 'login'});
            } else {
                document.title = `${to.meta.title} - Тохиров`;
                next();
            }
        });
});

apiRequest.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status) {
        if (error.response.status === 401) {
            store.dispatch('auth/refreshToken')
        }
        return Promise.reject(error.response.data);
    }
});

export default router

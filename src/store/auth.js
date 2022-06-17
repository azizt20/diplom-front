import apiRequest from '@/utils/apiRequest';
import router from "@/router";

// const STORAGE_URL = process.env.VUE_APP_STORAGE_URL;

export default {
    namespaced: true,
    state: {
        user: undefined,
        token: undefined,
        isAuthorized: undefined,
    },
    getters: {
        isAuthorized: (state) => state.isAuthorized === true,
        getUser: (state) => {
            const user = state.user
            // user.avatar = STORAGE_URL + user.avatar

            return user;
        },
    },
    mutations: {
        SET_ACCESS_TOKEN(state, token) {
            localStorage.setItem('access', token);
            apiRequest.defaults.headers.Authorization = `Bearer ${token}`;
            state.token = token;
        },
        SET_REFRESH_TOKEN(state, token) {
            localStorage.setItem('refresh', token);
        },
        SET_AUTHORIZED_STATUS(state, status) {
            state.isAuthorized = status;
        },

        REMOVE_TOKEN(state) {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            state.token = false;
        }
    },
    actions: {
        login({commit}, formData) {
            return new Promise((resolve, reject) => {
                apiRequest
                    .post('/login/', formData)
                    .then((result) => {
                        const access_token = result.data.access
                        const refresh_token = result.data.refresh
                        commit('SET_ACCESS_TOKEN', access_token);
                        commit('SET_REFRESH_TOKEN', refresh_token);
                        commit('SET_AUTHORIZED_STATUS', true);
                        router.push({name: 'home'})


                        resolve();
                    })
                    .catch((error) => {
                        alert('Логин или пароль не верный')
                        reject(error);
                    });
            });
        },

        refresh({commit, getters}) {
            return new Promise((resolve, reject) => {
                if (getters.isAuthorized) {
                    resolve();
                } else if (localStorage.getItem('access')) {
                    const key = localStorage.getItem('access');
                    if (key) {
                        commit('SET_ACCESS_TOKEN', key);
                        commit('SET_AUTHORIZED_STATUS', true);
                        resolve();
                    }
                } else {
                    reject()
                }
            })
        },

        refreshToken({commit, dispatch}) {
            return new Promise((resolve, reject) => {
                if (localStorage.getItem('refresh')) {
                    apiRequest
                        .post('/refresh/', {refresh: localStorage.getItem('refresh')})
                        .then((result) => {
                            location.reload();
                            const access_token = result.data.access;
                            commit('SET_ACCESS_TOKEN', access_token);
                            commit('SET_AUTHORIZED_STATUS', true);

                            resolve();
                        })
                        .catch((error) => {
                            dispatch('logout')
                            reject(error);
                        });
                } else {
                    dispatch('logout')
                    reject();

                }


            })
        },

        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('REMOVE_TOKEN');
                commit('SET_AUTHORIZED_STATUS', false);
                apiRequest
                    .post('/logout/')
                    .then(() => {
                        commit('REMOVE_TOKEN');
                        commit('SET_AUTHORIZED_STATUS', false);
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
                router.push({name: 'login'})
            })
        },

        registration(state, formData) {
            return new Promise((resolve, reject) => {
                const headers = {'Content-Type': 'multipart/form-data'};
                apiRequest
                    .post('/user/registration/', formData, {headers})
                    .then((result) => {

                        console.log(result.data)
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
    },
};
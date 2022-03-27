import axios from 'axios'
import store from '@/store'
import router from '@/router'

const baseURL = 'http://front-test.vinixcode.cloud:8000/api'

const axiosIns = axios.create({
    baseURL: baseURL
})

axiosIns.interceptors.response.use(undefined, async (error) => {
    const routeName = router?.currentRoute?.name
    const originalRequest = error.config
    if(error.response.status === 401 && routeName !== 'Login') {
        return await new Promise(resolve => {
            axios.post(`${baseURL}/auth/refresh`)
                .then(response => {
                    store.commit('SET_DATA_LOGIN', response.data)
                    store.commit('SET_DEFAULT_AXIOS')
                    resolve(axiosIns(originalRequest))
                })
                .catch(error => {
                    store.commit('authModule/SET_LOGOUT')
                    store.commit('settingsModule/SET_SNACKBAR_EXPIRED', true)
                    router.replace({ name: 'Login' })
                    resolve(Promise.reject(error))
                })
        })
    }
    return Promise.reject(error)
})

export default axiosIns
import axios from '@axios'

const state = {
    access_token: null,
    expires_in: null,
    token_type: null,
    user: null
}

const getters = {}

const actions = {
    async login(context, user) {
        return await new Promise(resolve => {
            axios.post('auth/login', user)
                .then(response => {
                    context.commit('SET_DATA_LOGIN', response.data)
                    context.commit('SET_DEFAULT_AXIOS')
                    resolve(true)
                })
                .catch(error => {
                    context.commit('settingsModule/SET_SNACKBAR',
                        {
                            color: 'error',
                            message: `Error al iniciar sesión. ${error.response.data.error}`,
                        },
                        { root: true }
                    )
                    resolve(false)
                })
        })
    },
    async register(context, user) {
        return await new Promise(resolve => {
            axios.post('auth/register', user)
                .then(() => resolve(true))
                .catch(error => {
                    let textError = ''
                    let timeError = 6000
                    if(error.response.status === 400) {
                        const errorList = Object.entries(JSON.parse(error.response.data))
                        timeError = timeError * errorList.length
                        errorList.forEach(x => {
                            textError = `${textError}<br/><br/><strong>${x[0]}:</strong><br/>${x[1].join('<br/>')}`
                        })
                    }
                    context.commit('settingsModule/SET_SNACKBAR',
                        {
                            color: 'error',
                            message: `Error al crear la cuenta. ${textError}`,
                            timeout: timeError
                        },
                        { root: true }
                    )
                    resolve(false)
                })
        })
    },
    async logout(context) {
        return await new Promise(resolve => {
            axios.post('auth/logout')
                .then(() => {
                    context.commit('SET_LOGOUT')
                    resolve(true)
                })
                .catch(error => {
                    context.commit('settingsModule/SET_SNACKBAR',
                        {
                            color: 'error',
                            message: `Error al cerrar sesión. ${error.response.data.message}`,
                        },
                        { root: true }
                    )
                    resolve(false)
                })
        })
    },
    getUser(context) {
        axios.get('auth/user-profile')
            .then(response => context.commit('SET_DATA_USER', response.data))
            .catch(() => {
                context.commit('settingsModule/SET_SNACKBAR',
                    {
                        color: 'error',
                        message: 'Error al recuperar los datos del usuario.',
                    },
                    { root: true }
                )
            })
    }
}

const mutations = {
    SET_DATA_USER(state, data) {
        state.user = data
    },
    SET_DATA_LOGIN(state, data) {
        state.token_type = data.token_type
        state.access_token = data.access_token
        state.expires_in = data.expires_in
        state.user = data.user
    },
    SET_DEFAULT_AXIOS(state) {
        if (state.access_token && state.token_type) {
            axios.defaults.headers.common.Authorization = `${state.token_type} ${state.access_token}`
        }
    },
    SET_LOGOUT(state) {
        state.token_type = null
        state.access_token = null
        state.expires_in = null
        state.user = null
        axios.defaults.headers.common.Authorization = null
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
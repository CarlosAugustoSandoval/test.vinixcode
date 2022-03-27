const state = {
    showSnackbarExpired: false,
    customizerDrawer: false,
    darkMode: false,
    primaryColor: '#FFB300',
    optionsPrimary: [
        '#FFB300',
        '#00A1E5',
        '#55BB46',
        '#563DEA',
        '#9C27B0',
        '#00B278'
    ],
    snackbar: null
}

const getters = {
    swatchesPrimary: state => {
        let swatchesPrimary = []
        const primaryColors = state.optionsPrimary
        const length = 2
        for (let i = 0; i < primaryColors.length; i += length) {
            const swatchesRow = primaryColors.slice(i, i + length)
            swatchesPrimary.push(swatchesRow)
        }
        return swatchesPrimary
    }
}

const actions = {
}

const mutations = {
    SET_CUSTOMIZER_DRAWER(state, show) {
        state.customizerDrawer = show
    },
    SET_THEME_MODE (state, dark) {
        state.darkMode = dark
    },
    SET_THEME_COLOR (state, color) {
        state.primaryColor = color
    },
    SET_SNACKBAR_EXPIRED (state, data) {
        state.showSnackbarExpired = data
    },
    SET_SNACKBAR (state, data) {
        const timeout = 6000
        const color = 'success'
        const message = ''
        state.snackbar = {
            timeout: data.timeout || timeout,
            message: data.message || message,
            color: data.color || color
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
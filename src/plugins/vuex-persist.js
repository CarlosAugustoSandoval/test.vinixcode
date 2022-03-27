import VuexPersistence from 'vuex-persist'
export default new VuexPersistence({
    key: 'vinixcode',
    storage: window.localStorage,
    modules: [
        'settingsModule',
        'authModule'
    ]
})
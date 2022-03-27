import Vue from 'vue'
import Vuex from 'vuex'
import persist from '@/plugins/vuex-persist'

import settingsModule from '@/modules/settings/store'
import authModule from '@/modules/auth/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settingsModule,
    authModule
  },
  plugins: [persist.plugin]
})

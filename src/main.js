import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vuetify from './plugins/vuetify'
import '@/plugins/moment'
import '@/plugins/globalComponents'
import '@/plugins/veeValidate'
import '@/plugins/axios'

store.commit('authModule/SET_DEFAULT_AXIOS')
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

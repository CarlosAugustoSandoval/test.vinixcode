import Vue from 'vue'
import CPassword from '@/components/CPassword'
import Loading from '@/components/Loading'

Vue.use({
    install(Vue) {
        Vue.component('CPassword', CPassword)
        Vue.component('Loading', Loading)
    }
})
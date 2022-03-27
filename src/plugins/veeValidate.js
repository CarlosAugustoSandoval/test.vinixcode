import Vue from 'vue'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'

import {
    required,
    email,
    confirmed
} from 'vee-validate/dist/rules'

Vue.use({
    install(Vue) {
        Vue.component('ValidationProvider', ValidationProvider)
        Vue.component('ValidationObserver', ValidationObserver)
    }
})

extend('required', {
    ...required,
    message: 'El campo {_field_} es requerido'
})

extend('email', {
    ...email,
    message: 'El correo no es valido'
})

extend('confirmed', {
    ...confirmed,
    message: 'El campo {_field_} no coincide'
})

extend('minlength', {
    params: ['length'],
    validate(value, { length }) {
        return String(value).length >= length
    },
    message: 'El campo {_field_} debe tener como mínimo {length} caracteres'
})

extend('maxlength', {
    params: ['length'],
    validate(value, { length }) {
        return String(value).length <= length
    },
    message: 'El campo {_field_} debe tener como maximo {length} caracteres'
})
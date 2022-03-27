<template>
  <v-row
      justify="center"
      align="center"
      class="fill-height ma-0"
  >
    <v-card
        flat
        tile
        width="400"
    >
      <v-card-title class="d-flex align-center justify-center">
        <v-img
            :src="appLogo"
            max-width="200px"
            alt="logo"
            contain
        />
      </v-card-title>
      <v-card-title class="d-flex align-center justify-center pb-7">
        <h2 class="text-2xl font-weight-bold text-center">
          {{ appName }}
        </h2>
      </v-card-title>
      <v-card-text>
        <p class="font-weight-bold text-center mb-2 title">
          Bienvenido! 👋🏻
        </p>
        <p class="mb-2 text-center title">
          Crea tu cuenta e inicia la aventura.
        </p>
      </v-card-text>
      <v-card-text>
        <loading
            v-model="loading"
            absolute
        />
        <ValidationObserver
            ref="formRegister"
            tag="form"
            v-slot="{ invalid }"
            @submit.prevent="register"
        >
          <ValidationProvider
              name="Nombre"
              rules="required|minlength:2|maxlength:100"
              v-slot="{ errors }"
          >
            <v-text-field
                label="Nombre"
                v-model="model.name"
                outlined
                clearable
                :error-messages="errors"
            />
          </ValidationProvider>
          <ValidationProvider
              name="Email"
              rules="required|email"
              v-slot="{ errors }"
          >
            <v-text-field
                label="Email"
                v-model="model.email"
                outlined
                clearable
                :error-messages="errors"
            />
          </ValidationProvider>

          <c-password
              v-model="model.password"
              label="Contraseña"
              rules="required|minlength:6"
              name="contraseña"
              vid="password"
              placeholder="············"
              :dense="false"
          />
          <c-password
              v-model="model.password_confirmation"
              label="Confirmar contraseña"
              :rules="{ required: true, confirmed:'password' }"
              name="Confirmar contraseña"
              vid="passwordConfirmation"
              placeholder="············"
              :dense="false"
          />
          <v-btn
              block
              color="primary"
              class="mt-6"
              type="submit"
              large
              :disabled="invalid"
          >
            Crear cuenta
          </v-btn>
        </ValidationObserver>
        <v-btn
            block
            color="info"
            class="mt-6"
            :to="{name: 'Login'}"
        >
          Ya tengo una cuenta
        </v-btn>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
import config from '@config'
import store from '@/store'
export default {
  name: 'Login',
  data: () => ({
    loading: false,
    appName: config.appName || '',
    appLogo: config.logo || '',
    model: {
      name: null,
      email: null,
      password: null,
      password_confirmation: null
    }
  }),
  methods: {
    register() {
      this.$refs.formRegister.validate().then(result => {
        if (result) {
          this.loading = true
          store.dispatch('authModule/register', this.model)
              .then(resolve => {
                if (resolve) {
                  store.dispatch('authModule/login', { email: this.model.email, password: this.model.password })
                      .then(resolve => {
                        if (resolve) this.$router.push({ name: 'Posts' })
                        this.loading = false
                      })
                } else {
                  this.loading = false
                }
              })
        }
      })
    }
  }
}
</script>

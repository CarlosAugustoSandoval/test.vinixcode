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
          Inicia sesión en tu cuenta.
        </p>
      </v-card-text>
      <v-card-text>
        <loading
            v-model="loading"
            absolute
        />
        <ValidationObserver
            ref="formLogin"
            tag="form"
            v-slot="{ invalid }"
            @submit.prevent="login"
        >
          <ValidationProvider
              name="Email"
              rules="required|email"
              v-slot="{ errors }"
          >
            <v-text-field
                label="Email"
                v-model="email"
                outlined
                clearable
                :error-messages="errors"
            />
          </ValidationProvider>

          <c-password
              v-model="password"
              label="Contraseña"
              rules="required"
              name="contraseña"
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
            Iniciar sesión
          </v-btn>
        </ValidationObserver>
        <v-btn
            block
            color="info"
            class="mt-6"
            :to="{name: 'Register'}"
        >
          Registrate
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
    email: null,
    password: null
  }),
  methods: {
    login() {
      this.$refs.formLogin.validate().then(result => {
        if (result) {
          this.loading = true
          store.dispatch('authModule/login', { email: this.email, password: this.password })
              .then(resolve => {
                if (resolve) this.$router.push({ name: 'Posts' })
                this.loading = false
              })
        }
      })
    }
  }
}
</script>

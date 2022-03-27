<template>
  <v-navigation-drawer
      style="z-index: 4 !important;"
      :style="`padding-top: ${$vuetify.breakpoint.mdAndUp ? '64' : '56'}px`"
      v-model="customizerDrawer"
      app
      temporary
      clipped
      :right="!$vuetify.rtl"
      dark
  >
    <loading v-model="loading"/>
    <v-list-item
        v-if="user"
        two-line
        class="px-3 py-4"
    >
      <v-list-item-avatar
          size="50"
          class="mr-2"
      >
        <v-icon x-large>mdi-account-circle</v-icon>
      </v-list-item-avatar>
      <v-list-item-content class="white--text">
        <v-list-item-title class="title">{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle class="caption white--text">{{ user.email }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider/>
    <div class="px-4 py-4">
      <label class="white--text">Color Primario</label>
      <v-color-picker
          class="pt-2"
          v-model="colorActive"
          mode="hexa"
          :swatches="swatchesPrimary"
          show-swatches
          hide-canvas
          hide-mode-switch
          hide-inputs
          hide-sliders
      />
    </div>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn
            block
            color="red"
            @click="logout"
        >
          <v-icon dark class="mr-1">mdi-power-standby</v-icon>
          Cerrar Sesión
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import store from '@/store'
import {mapGetters, mapState} from 'vuex'

export default {
  name: 'Customizer',
  data: () => ({
    loading: false,
    colorActive: null
  }),
  computed: {
    ...mapState('authModule', ['user']),
    ...mapState('settingsModule', ['darkMode', 'primaryColor']),
    ...mapGetters('settingsModule', ['swatchesPrimary']),
    customizerDrawer: {
      get() {
        return store.state.settingsModule.customizerDrawer
      },
      set(val) {
        store.commit('settingsModule/SET_CUSTOMIZER_DRAWER', val)
      }
    }
  },
  watch: {
    colorActive: {
      handler(color) {
        this.$store.commit('settingsModule/SET_THEME_COLOR', typeof color === 'string' ? color : color.hex)
      },
      immediate: false
    }
  },
  created() {
    this.colorActive = this.primaryColor
  },
  methods: {
    logout() {
      this.loading = true
      store.dispatch('authModule/logout')
          .then(resolve => {
            if(resolve) this.$router.push({name: 'Login'})
            this.$store.commit('settingsModule/SET_CUSTOMIZER_DRAWER', false)
            this.loading = false
          })
    }
  }
}
</script>

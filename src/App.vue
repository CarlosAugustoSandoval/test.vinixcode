<template>
  <v-app id="inspire">
    <component
        v-if="layout"
        :is="layout"
    >
      <router-view/>
    </component>
    <snackbar/>
    <v-snackbar
        v-model="snackbarExpired"
        :timeout="10000"
    >
      Los datos de la sesión han expirado, inicie sesión nuevamente.
    </v-snackbar>
  </v-app>
</template>

<script>
import LayoutBlank from '@/layouts/blank/Blank'
import LayoutContent from '@/layouts/content/Content'
import {mapState} from 'vuex'
import Snackbar from '@/modules/settings/components/Snackbar'
import store from '@/store'
export default {
  name: 'App',
  components: {
    Snackbar
  },
  computed: {
    layout() {
      return this.$route.meta.layout ? this.$route.meta.layout === 'blank' ? LayoutBlank : LayoutContent : null
    },
    ...mapState('settingsModule',['darkMode', 'primaryColor', 'showSnackbarExpired']),
    snackbarExpired: {
      get() {
        return this.showSnackbarExpired
      },
      set(val) {
        store.commit('settingsModule/SET_SNACKBAR_EXPIRED', val)
      }
    }
  },
  watch: {
    darkMode: {
      handler (dark) {
        this.$vuetify.theme.dark = dark
      },
      immediate: true
    },
    primaryColor: {
      handler (color) {
        if (color) {
          this.$vuetify.theme.themes.light.primary = color
          this.$vuetify.theme.themes.dark.primary = color
        }
      },
      immediate: true
    }
  }
}
</script>

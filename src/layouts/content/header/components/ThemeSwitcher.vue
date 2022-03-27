<template>
  <v-fade-transition mode="out-in">
    <v-icon
        :key="isDark"
        @click="isDark = !isDark"
        class="mx-2"
    >
      mdi-weather-{{ isDark ? 'sunny' : 'night' }}
    </v-icon>
  </v-fade-transition>
</template>

<script>
import store from '@/store'
export default {
  name: 'ThemeSwitcher',
  computed: {
    isDark:{
      get() {
        return this.$vuetify.theme.dark
      },
      set(val) {
        this.$vuetify.theme.dark = val
        store.commit('settingsModule/SET_THEME_MODE', val)
      }
    }
  }
}
</script>

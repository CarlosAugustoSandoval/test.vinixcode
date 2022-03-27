<template>
  <v-app-bar
      app
      color="primary"
      dark
  >
    <v-toolbar-title class="align-center d-flex">
      <span class="title mr-2">Posts@Vinixcode</span>
    </v-toolbar-title>
    <v-spacer />
    <theme-switcher/>
    <user-menu/>
  </v-app-bar>
</template>

<script>
import UserMenu from './components/UserMenu'
import ThemeSwitcher from './components/ThemeSwitcher'
export default {
  name: 'Header',
  components: {
    ThemeSwitcher,
    UserMenu
  }
}
</script>

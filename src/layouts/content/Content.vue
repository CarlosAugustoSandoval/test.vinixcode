<template>
  <div>
    <Header/>
    <v-main>
      <slot/>
      <customizer/>
    </v-main>
  </div>
</template>

<script>
import store from '@/store'
import Header from './header/Header'
import Customizer from '@/modules/settings/components/Customizer'

export default {
  name: 'Content',
  components: {
    Header,
    Customizer
  },
  beforeCreate() {
    store.dispatch('authModule/getUser')
  }
}
</script>

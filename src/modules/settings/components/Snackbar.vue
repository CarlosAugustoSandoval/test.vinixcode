<template>
  <v-snackbar
      multi-line
      v-model="show"
      :timeout="timeout"
      :color="color"
      top
  >
    <div v-html="message"/>
    <template v-slot:action="{ attrs }">
      <v-btn
          icon
          v-bind="attrs"
          @click="show = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Snackbar',
  data: () => ({
    flag: true,
    show: false,
    timeout: -1,
    color: 'info',
    message: ''
  }),
  computed: {
    ...mapState('settingsModule', ['snackbar'])
  },
  watch: {
    snackbar: {
      handler (val) {
        if (this.flag) {
          this.show = false
          if (val.message) {
            this.flag = false
            this.$nextTick(() => {
              this.color = val.color
              this.message = val.message
              this.timeout = val.timeout
              this.show = true
            })
            setTimeout(() => {
              this.flag = true
            }, 300)
          }
        }
      },
      immediate: false
    }
  }
}
</script>
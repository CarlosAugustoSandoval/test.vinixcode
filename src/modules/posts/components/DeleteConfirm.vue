<template>
  <v-dialog
      v-model="dialog"
      max-width="500"
      persistent
  >
    <v-card
        class="text-center"
    >
      <loading
          v-model="loading"
          absolute
      />
      <v-container>
        <v-icon
            size="80"
            color="error"
        >
          mdi-delete-forever
        </v-icon>
        <h2 class="mb-3">Borrar registro de Post</h2>
        <p class="mb-3 text-h6" v-if="item">
          ¿Está seguro de borrar el registro del post <strong>{{item.title}}</strong>
        </p>
      </v-container>
      <v-card-actions class="justify-center">
        <v-btn
            @click="cancel"
            :loading="loading"
        >
          Cancelar
        </v-btn>
        <v-btn
            color="error"
            :loading="loading"
            @click="deleteItem"
        >
          Si, Borrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from '@axios'
import store from '@/store'
export default {
  name: 'DeleteConfirm',
  props: {
    item: {
      type: Object,
      default: null
    },
    dialog: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    loading: false
  }),
  methods: {
    close() {
      this.$emit('update:dialog', false)
    },
    success(value) {
      this.loading = false
      this.$emit('success', value)
      this.close()
    },
    cancel() {
      this.close()
      this.$emit('cancel')
    },
    async deleteItem() {
      this.loading = true
      axios.delete(`v1/post/${this.item.id}`)
          .then(() => this.success())
          .catch(() => {
            store.commit('settingsModule/SET_SNACKBAR',
                {
                  color: 'error',
                  message: `Error al borrar el post ${this.item.id}.`,
                }
            )
            this.loading = false
          })
    }
  }
}
</script>
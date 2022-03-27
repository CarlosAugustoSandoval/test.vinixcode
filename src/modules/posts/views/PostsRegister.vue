<template>
  <v-container>
    <v-row dense>
      <v-col
          cols="12"
          md="8"
          lg="6"
          class="mx-auto"
      >
        <v-card>
          <v-app-bar flat>
            <v-icon class="mr-1"> {{ post.id ? 'mdi-square-edit-outline' : 'mdi-plus-box-outline' }}</v-icon>
            {{ post.id ? `Edición del Post ${post.id}` : 'Nuevo Post' }}
          </v-app-bar>
        </v-card>
        <v-card-text class="mt-3">
          <loading
              v-model="loading"
              absolute
          />
          <ValidationObserver
              ref="formPost"
              tag="form"
          >
            <ValidationProvider
                name="Titulo"
                rules="required"
                v-slot="{ errors }"
            >
              <v-text-field
                  label="Título"
                  v-model="post.title"
                  outlined
                  clearable
                  :error-messages="errors"
              />
            </ValidationProvider>

            <ValidationProvider
                name="Mensaje"
                rules="required"
                v-slot="{ errors }"
            >
              <v-textarea
                  label="Mensaje"
                  v-model="post.body"
                  outlined
                  clearable
                  auto-grow
                  rows="5"
                  :error-messages="errors"
              />
            </ValidationProvider>
          </ValidationObserver>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
              large
              :to="{name: 'Posts'}"
          >
            Cancelar
          </v-btn>
          <v-btn
              large
              color="info"
              @click="save"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@axios'
import store from '@/store'
import Post from '../model/Post'
export default {
  name: 'PostsRegister',
  props: {
    id: {
      type: [Number, String],
      default: null
    }
  },
  data: () => ({
    loading: false,
    post: Post.create()
  }),
  created() {
    if(this.id) {
      this.getPost()
    }
  },
  methods: {
    save() {
      this.$refs.formPost.validate().then(result => {
        if (result) {
          this.loading = true
          const request = this.id ? axios.put(`v1/post/${this.id}`, this.post) : axios.post('v1/post', this.post)
          request
              .then(() => {
                store.commit('settingsModule/SET_SNACKBAR',
                    {
                      color: 'success',
                      message: `El post se ${this.id ? 'editó' : 'creó'} correctamente`
                    }
                )
                this.$router.push({ name: 'Posts' })
              })
              .catch(error => {
                let textError = ''
                let timeError = 6000
                if(error.response.status === 400) {
                  const errorList = Object.entries(JSON.parse(error.response.data))
                  timeError = timeError * errorList.length
                  errorList.forEach(x => {
                    textError = `${textError}<br/><br/><strong>${x[0]}:</strong><br/>${x[1].join('<br/>')}`
                  })
                } else {
                  textError = error.response?.data?.message
                }
                store.commit('settingsModule/SET_SNACKBAR',
                    {
                      color: 'error',
                      message: `Error al ${this.id ? 'editar' : 'crear'} el post. ${textError}`,
                      timeout: timeError
                    }
                )
              })
              .finally(() => this.loading = false)
        }
      })
    },
    getPost() {
      this.loading = true
      axios.get(`v1/post/${this.id}`)
          .then(response => {
            this.post = Post.create(response.data)
            if(!this.post.id) {
              store.commit('settingsModule/SET_SNACKBAR',
                  {
                    color: 'error',
                    message: `No se encontró información con el ID: ${this.id}`
                  }
              )
              this.$router.push({name: 'Posts'})
            }
          })
          .catch(() => {
            store.commit('settingsModule/SET_SNACKBAR',
                {
                  color: 'error',
                  message: `Error al recuperar el post ID: ${this.id}.`,
                }
            )
          })
          .finally(() => this.loading = false)
    }
  }
}
</script>
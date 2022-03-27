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
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    fab
                    small
                    v-bind="attrs"
                    v-on="on"
                    color="info"
                    class="mr-2"
                    :to="{ name: 'Posts' }"
                >
                  <v-icon>mdi-arrow-left-thick</v-icon>
                </v-btn>
              </template>
              <span>Volver a los posts</span>
            </v-tooltip>
            <v-icon class="mr-1"> mdi-text-box</v-icon>
            {{ `Detalle Post ID: ${post.id || ''}` }}
          </v-app-bar>
          <loading
              v-model="loading"
              absolute
          />
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle
                  class="mt-1"
                  v-if="post.users_id"
              >
                <v-chip label>
                  <v-icon
                      color="error"
                      class="mr-1"
                  >
                    mdi-account
                  </v-icon>
                  Usuario ID: {{post.users_id}}
                </v-chip>
              </v-list-item-subtitle>
              <v-list-item-title class="title">{{post.title}}</v-list-item-title>
              <p class="ma-0 body-2">{{post.body}}</p>
              <v-list-item-subtitle
                  class="mt-1"
                  v-if="post.created_at || post.updated_at"
              >
                <v-chip
                    v-if="post.created_at"
                    x-small
                    class="mr-1"
                >
                  <v-icon
                      color="info"
                      small
                      class="mr-1"
                  >
                    mdi-plus-box-outline
                  </v-icon>
                  {{moment(post.created_at).format('DD-MM-YYYY HH:mm')}}
                </v-chip>
                <v-chip
                    v-if="post.updated_at"
                    x-small
                    class="mr-1"
                >
                  <v-icon
                      color="orange"
                      small
                      class="mr-1"
                  >
                    mdi-square-edit-outline
                  </v-icon>
                  {{moment(post.updated_at).format('DD-MM-YYYY HH:mm')}}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@axios'
import store from '@/store'
import Post from '../model/Post'
export default {
  name: 'PostsDetail',
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
                  message: `Error al recuperar el post ID: ${this.id}.`
                }
            )
          })
          .finally(() => this.loading = false)
    }
  }
}
</script>
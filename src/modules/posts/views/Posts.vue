<template>
  <v-container>
    <v-row dense>
      <v-col
          cols="12"
          md="8"
          xl="6"
          class="mx-auto"
      >
        <v-card>
          <loading
              v-model="loading"
              absolute
          />
          <v-app-bar flat>
            <v-app-bar-title>POSTS</v-app-bar-title>
            <v-spacer/>
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    fab
                    small
                    v-bind="attrs"
                    v-on="on"
                    color="info"
                    class="mr-2"
                    @click="getPosts"
                >
                  <v-icon>mdi-sync</v-icon>
                </v-btn>
              </template>
              <span>Recargar posts</span>
            </v-tooltip>

            <v-btn
                small
                color="primary"
                :to="{name: 'PostsCreate'}"
            >
              <v-icon class="mr-1">mdi-plus-box-outline</v-icon>
              Nuevo posts
            </v-btn>
          </v-app-bar>
          <v-list
              v-if="posts.length"
              three-line
              class="pa-0"
          >
            <template v-for="(post, postIndex) in posts">
              <post-item
                  :key="`post${postIndex}`"
                  :post="post"
                  @detail="$router.push({name: 'PostsDetail', params: {id: post.id}})"
                  @borrar="predeletePost(post)"
              />
              <v-divider :key="`postDivider${postIndex}`"/>
            </template>
          </v-list>
          <v-card-text
              v-else
              class="text-center"
          >
            <p v-if="loading">Cargando los posts registrados.</p>
            <p v-else><strong>:(</strong> No tiene Posts registrados.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <delete-confirm
        :dialog.sync="dialogDelete"
        :item="selected"
        @success="getPosts"
    />
  </v-container>
</template>

<script>
import axios from '@axios'
import store from '@/store'
import PostItem from '../components/PostItem'
import DeleteConfirm from '../components/DeleteConfirm'
export default {
  name: 'Posts',
  components: {
    PostItem,
    DeleteConfirm
  },
  data: () => ({
    dialogDelete: false,
    selected: null,
    loading: false,
    posts: []
  }),
  created() {
    this.getPosts()
  },
  methods: {
    predeletePost(post) {
      this.dialogDelete = true
      this.selected = post
    },
    getPosts() {
      this.loading = true
      axios.get('v1/post')
          .then(response => {
            this.posts = response.data
          })
          .catch(() => {
            store.commit('settingsModule/SET_SNACKBAR',
                {
                  color: 'error',
                  message: 'Error al recuperar el listado de posts.',
                }
            )
          })
          .finally(() => this.loading = false)
    }
  }
}
</script>

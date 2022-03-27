<template>
  <v-list-item @click="$emit('detail')">
    <v-list-item-content>
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
        <v-chip
            v-if="post.users_id"
            x-small
            class="mr-1"
        >
          <v-icon
              color="error"
              small
              class="mr-1"
          >
            mdi-account
          </v-icon>
          Usuario ID: {{post.users_id}}
        </v-chip>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn
          icon
          color="warning"
          @click.stop="$router.push({name: 'PostsEdit', params: {id: post.id}})"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
          icon
          color="error"
          @click.stop="$emit('borrar')"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: 'PostItem',
  props: {
    post: {
      type: Object,
      default: null
    }
  }
}
</script>
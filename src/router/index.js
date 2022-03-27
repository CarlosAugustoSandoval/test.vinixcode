import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import auth from '../modules/auth/router'
import posts from '../modules/posts/router'
import errors from '../modules/errors/router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: { name: 'Posts' }
    },
    ...auth,
    ...posts,
    ...errors
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach(async (to, from, next) => {
    document.title = `Posts@Vinixcode | ${to.meta.title}`
    if (to.matched.some(record => record.meta?.requireAuth)) {
        if (!store.state.authModule.access_token) {
            next({ name: 'Login' })
        } else  {
            next()
        }
    } else {
        next()
    }
})

export default router

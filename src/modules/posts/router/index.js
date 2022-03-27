const posts = [
    {
        path: '/posts/list',
        name: 'Posts',
        component: () => import(/* webpackChunkName: "postsList" */ '@/modules/posts/views/Posts.vue'),
        meta: {
            layout: 'content',
            title: 'Posts',
            requireAuth: true
        }
    },
    {
        path: '/posts/create',
        name: 'PostsCreate',
        component: () => import(/* webpackChunkName: "postsRegister" */ '@/modules/posts/views/PostsRegister.vue'),
        meta: {
            layout: 'content',
            title: 'PostsCreate',
            requireAuth: true
        }
    },
    {
        path: '/posts/edit/:id',
        name: 'PostsEdit',
        component: () => import(/* webpackChunkName: "postsRegister" */ '@/modules/posts/views/PostsRegister.vue'),
        props: true,
        meta: {
            layout: 'content',
            title: 'PostsEdit',
            requireAuth: true
        }
    },
    {
        path: '/posts/detail/:id',
        name: 'PostsDetail',
        component: () => import(/* webpackChunkName: "PostsDetail" */ '@/modules/posts/views/PostsDetail.vue'),
        props: true,
        meta: {
            layout: 'content',
            title: 'PostsDetail',
            requireAuth: true
        }
    }
]

export default posts
const errors = [
    {
        path: '*',
        name: 'Errors',
        component: () => import(/* webpackChunkName: "Error404" */ '@/modules/errors/views/Error404.vue'),
        meta: {
            layout: 'blank',
            title: 'Error 404',
            requireAuth: false
        }
    }
]

export default errors
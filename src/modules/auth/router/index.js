const auth = [
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "authLogin" */ '@/modules/auth/views/Login.vue'),
        meta: {
            layout: 'blank',
            title: 'Login',
            requireAuth: false
        }
    },
    {
        path: '/auth/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "authRegister" */ '@/modules/auth/views/Register.vue'),
        meta: {
            layout: 'blank',
            title: 'Register',
            requireAuth: false
        }
    }
]

export default auth
import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')

const Detect = () => import('views/detect/Detect')
const Query = () => import('views/query/Query')
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/detect',
    children: [
      { path: '/detect', component: Detect },
      { path: '/query', component: Query }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

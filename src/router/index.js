import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('views/login/Login')
const CommonLayout = () => import('views/layout/CommonLayout')
const HomeIndex = () => import('views/home/HomeIndex')
const QaIndex = () => import('views/qa/QaIndex')
const VideoIndex = () => import('views/video/VideoIndex')
const ProfileIndex = () => import('views/profile/ProfileIndex')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: CommonLayout,
    children: [
      {
        // 默认子路由
        path: '',
        component: HomeIndex
      },
      {
        path: '/qa',
        component: QaIndex
      },
      {
        path: '/video',
        component: VideoIndex
      },
      {
        path: '/profile',
        component: ProfileIndex
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

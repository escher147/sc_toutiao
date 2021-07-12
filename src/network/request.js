import axios from 'axios'
import store from '@/store'
export function request (config) {
  const instance = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/',
    method: config.method || 'GET',
    timeout: config.timeout || 5000
  })
  // 设置请求拦截器
  instance.interceptors.request.use(config => {
    // console.log(config)
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    // 不返回config会一直停留在这里
    return config
  })
  return instance(config)
}

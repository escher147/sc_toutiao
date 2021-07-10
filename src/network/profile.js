import { request } from './request'
// 获取用户自己的信息
export function getUserInfo () {
  return request({
    url: '/app/v1_0/user'
    // 请求头
    // headers: {
    //   // token数据格式 Bearer 数据
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

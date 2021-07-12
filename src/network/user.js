// 用户相关网络请求
import { request } from './request'

// 获取用户频道列表
export function getUserChannels () {
  return request({
    url: '/app/v1_0/user/channels'
  })
}

// 频道相关网络请求
import { request } from './request'

// 获取所有频道
export function getAllChannels () {
  return request({
    url: '/app/v1_0/channels'
  })
}
// 删除指定用户频道
export function removeChannelById (id) {
  return request({
    url: `/app/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}
// 批量修改用户频道列表（部分覆盖)
export function addUserChannels (channel) {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}

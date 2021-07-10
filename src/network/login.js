import { request } from './request'
// 用户登录验证
export function login (data) {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}
export function sendSms (mobile) {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}

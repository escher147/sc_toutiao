// 文章相关网络请求

import { request } from './request'

// 请求文章列表数据
export function getArticleList (params) {
  return request({
    url: '/app/v1_1/articles',
    params
  })
}

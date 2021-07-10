import Vue from 'vue'
import Vuex from 'vuex'
// 导入存储处理模块
import { setItem, getItem } from '@/common/utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 存储登录用户信息（token）,从本地存储获取
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 数据持久化，保存到本地
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})

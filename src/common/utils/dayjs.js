import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 配置使用relativeTime
import relativeTime from 'dayjs/plugin/relativeTime'
// 处理相对时间
dayjs.extend(relativeTime)

// 全局使用
dayjs.locale('zh-cn')

// 全局过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})

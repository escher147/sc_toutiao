<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.title" /> -->
      </van-list>
    </van-pull-refresh>

      </div>
</template>

<script>
import { getArticleList } from 'network/article'

import ArticleItem from '@/components/content/ArticleItem'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      // 请求下一页的时间戳
      timestamp: null,
      // 控制失败提示
      error: false,
      // 下拉刷新
      refreshing: false,
      // 刷新成功提示文本
      refreshSuccessText: ''
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      // 请求文章列表数据
      getArticleList({
        channel_id: this.channel.id,
        // 请求第一页数据：当前最新时间戳
        // 请求之后数据的时间戳由服务器返回
        timestamp: this.timestamp || Date.now(),
        // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        with_top: 1
      }).then(res => {
        // 请求出错情况模拟
        // if (Math.random() > 0.5) {
        //   JSON.parse('dadww')
        // }
        // console.log(res)
        const rdata = res.data.data
        this.list.push(...rdata.results)
        // 本次数据加载结束后将加载状态设置为结束
        this.loading = false
        // 判断是否全部加载完成
        if (rdata.results.length) {
          // 更新下一页数据(更新时间戳)
          this.timestamp = rdata.pre_timestamp
        } else {
          // 已经没有数据，将finished设置为true
          this.finished = true
        }
      }).catch(() => {
        this.error = true
        // 请求失败后loadding置为false
        this.loading = false
      })

      // 加载状态结束

      // 数据全部加载完成
    },
    // 下拉刷新
    onRefresh () {
      // 刷新请求数据，并将数据插入到顶部（refreshing会自动被设置为true）
      getArticleList({
        channel_id: this.channel.id,
        // 下拉刷新请求最新数据
        timestamp: Date.now(),
        with_top: 1
      }).then(res => {
        const results = res.data.data.results
        this.list.unshift(...results)
        // 将刷新标志refreshing设置为false
        this.refreshing = false
        // 设置刷新成功提示文本
        this.refreshSuccessText = `新增${results.length}篇文章`
      }).catch(() => {
        this.refreshing = false
        this.refreshSuccessText = '出错了，请重试'
      })
    }

  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>

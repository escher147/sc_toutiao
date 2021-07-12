<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <template #title>
        <van-button
          type="info"
          size="small"
          round
          icon="search"
          class="search-btn"
        >搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 频道tab标签 -->
    <van-tabs
      class="channel-tabs"
      v-model="active"
      animated
      swipeable
    >
      <van-tab
        v-for="item in channelList"
        :key="item.id"
        :title="item.name"
      >
        <!-- 文章列表 -->
        <article-list :channel="item"></article-list>
      </van-tab>
      <!-- 占位 -->
      <div slot="nav-right" class="nav-placeholder"></div>
      <!-- 更多标签 -->
      <div

        slot="nav-right"
        class="hamburger-btn"
        @click="isEditChannelShow = true"
      >
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
     <!-- 频道编辑弹出层 -->
      <van-popup
        v-model="isEditChannelShow"
        closeable
        position="bottom"
        close-icon-position="top-left"
        :style="{ height: '100%' }"
      >
        <edit-channel
          :my-channels="channelList"
          :active-index="active"
          @myChannelClick="myChannelClick"
        ></edit-channel>
      </van-popup>
  </div>
</template>

<script>
import ArticleList from 'views/home/childrenComponents/ArticleList'
import EditChannel from '@/views/home/childrenComponents/EditChannel'
import { getUserChannels } from 'network/user'
import { mapState } from 'vuex'
import { getItem } from 'common/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    EditChannel
  },
  data () {
    return {
      active: 0,
      channelList: [],
      // 控制频道弹出层显示
      isEditChannelShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this._getUserChannels()
  },
  methods: {
    _getUserChannels () {
      // 已登录
      if (this.user) {
        getUserChannels().then(res => {
        // console.log(res)
          const rdata = res.data.data
          this.channelList = rdata.channels
        }).catch(() => {
          this.$toast('获取频道列表出错，请刷新重试')
        })
      } else {
        // 未登陆
        // 查看本地存储是否有频道数据
        const localChannels = getItem('TOUTIAO_CHANNELS')
        if (localChannels) {
          this.channelList = localChannels
        } else {
          getUserChannels().then(res => {
            // console.log(res)
            const rdata = res.data.data
            this.channelList = rdata.channels
          }).catch(() => {
            this.$toast('获取频道列表出错，请刷新重试')
          })
        }
      }
    },
    // 编辑频道页面点击我的频道进行切换
    myChannelClick (index, isClose = true) {
      this.active = index
      this.isEditChannelShow = isClose
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;
  padding-top: 174px;
  ::v-deep .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
}
}
/deep/ .channel-tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  .van-tab {
    min-width: 200px;
    border-right: 1px solid #edeff3;
    font-size: 30px;
    color: #777;
  }
  .van-tab--active {
    color: #333;
  }
  .van-tabs__nav {
    padding: 0;
  }
  .van-tabs__line {
    width: 31px;
    height: 6px;
    background-color: #3296fa;
    bottom: 8px;
  }
}
.hamburger-btn {
  position: fixed;
  right: 0;
  width: 66px;
  height: 82px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  opacity: 0.902;
  i.iconfont {
    font-size: 33px;
  }
  // 给父元素添加伪元素
  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 80%;
    background-image: url(~assets/image/gradient-gray-line.png);
    // background-size: contain;
  }
}
.nav-placeholder {
  width: 66px;
  height: 82px;
  flex-shrink: 0;
}
</style>

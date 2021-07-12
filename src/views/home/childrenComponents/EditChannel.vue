<template>
  <div class="edit-channel">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        class="edit-btn"
        @click="editState = !editState"
      >{{editState ? "完成" : "编辑"}}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in myChannels"
        :key="item.id"
        @click="myChannelClick(item, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="editState && !fixedChannel.includes(item.id)"
        ></van-icon>
        <span
          slot="text"
          class="my-grid-item-text"
          :class="{activeColor: index === activeIndex}">{{item.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        icon="plus"
        class="grid-item"
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        @click="onAddChannel(item)"
      ></van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, removeChannelById } from 'network/channel'
import { mapState } from 'vuex'
import { setItem } from 'common/utils/storage'
export default {
  name: 'EditChannel',
  props: {
    myChannels: {
      type: Array,
      require: true
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      allChannels: [],
      // 我的频道编辑是否显示
      editState: false,
      // 不能被编辑的频道
      fixedChannel: [0]
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      // const recchannels = []
      // this.allChannels.forEach(allItem => {
      //   const ret = this.myChannels.find(myItem => {
      //     return myItem.id === allItem.id
      //   })
      //   if (!ret) {
      //     recchannels.push(allItem)
      //   }
      // })
      // return recchannels
      return this.allChannels.filter(allItem => {
        return !this.myChannels.find(myItem => {
          return myItem.id === allItem.id
        })
      })
    }
  },
  created () {
    this._getAllChannels()
  },
  methods: {
    // 获取所有频道
    _getAllChannels () {
      getAllChannels().then(res => {
        const channels = res.data.data.channels
        this.allChannels = channels
      }).catch(() => {
        this.$toast('获取频道出错，请重试')
      })
    },
    // 添加频道
    onAddChannel (channel) {
      // 由于推荐频道是利用计算属性获得，会实时监听变化，当我的频道列表发生变化时会自动更新推荐频道
      this.myChannels.push(channel)
      // 数据持久化
      // 未登录状态存储到本地
      if (!this.user) {
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      } else {
      // 登录状态储存到服务器
        addUserChannels({
          id: channel.id,
          seq: this.myChannels.length
        }).then(res => {
          console.log(res)
        }).catch(() => {
          this.$toast('保存数据出错')
        })
      }
    },
    // 点击我的频道
    myChannelClick (item, index) {
      if (this.editState) {
        // 编辑状态
        // 判断是否为不能删的固定频道
        if (this.fixedChannel.includes(item.id)) {
          return
        }
        // 删除当前频道之前的频道需要将active - 1,并传参表示是否关闭弹出框
        if (index < this.activeIndex) {
          this.$emit('myChannelClick', this.activeIndex - 1, true)
        }
        this.myChannels.splice(index, 1)
        // 处理持久化
        // 登录状态
        if (this.user) {
          removeChannelById(item.id).then(res => {
            console.log(res)
          }).catch(() => {
            this.$toast('删除频道出错')
          })
        } else {
          // 覆盖本地存储
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } else {
        // 非编辑状态
        this.$emit('myChannelClick', index, false)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.edit-channel {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__text,  .my-grid-item-text {
        color: #222;
        font-size: 28px;
        margin-top: 0;
      }
      .activeColor {
        color: #f85959;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
            position: absolute;
            right: -10px;
            top: -10px;
            font-size: 30px;
            color: #cacaca;
            z-index: 2;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }

}
</style>

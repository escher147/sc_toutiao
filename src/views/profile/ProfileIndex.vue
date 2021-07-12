<template>
  <div class="profile-container">
      <!-- 未登录头部 -->
      <div v-if="!user" class="header not-login">
        <div class="login-btn" @click="$router.push('/login')">
          <img class="mobile-img" src="~assets/image/mobile.png">
          <span class="text">登录 / 注册</span>
        </div>
      </div>
      <!-- 登录头部 -->
      <div v-else class="header user-info">
        <div class="base-info">
          <div class="left">
            <van-image
              :src="userInfo.photo"
              class="avatar"
              round
              fit="cover"
            />
            <span class="name">{{userInfo.name}}</span>
          </div>
          <div class="right">
            <van-button
              size="mini"
              round
            >编辑资料</van-button>
          </div>
        </div>
        <div class="data-stats">
          <div class="data-item">
            <span class="count">{{userInfo.art_count}}</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.follow_count}}</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.fans_count}}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.like_count}}</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
    <!-- 宫格导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      clickable
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from 'network/profile'
export default {
  name: 'ProfileIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    if (this.user) {
      this._getUserInfo()
    }
  },
  methods: {
    // 网络请求
    _getUserInfo () {
      getUserInfo().then(res => {
        // console.log(res)
        const rdata = res.data.data
        this.userInfo = rdata
      }).catch(() => {
        this.$toast('获取用户数据出错，请重试')
      })
    },

    // 退出登录
    onLogout () {
    // 提示是否退出
      this.$dialog.confirm({
        title: '提示',
        message: '确认退出？'
      }).then(() => {
        // 清除登录状态(vuex容器和localStorage中的登录数据)
        this.$store.commit('setUser', null)
      }).catch(() => {})
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
  .profile-container {
    .header {
      height: 361px;
      background: url("~assets/image/banner.png");
      background-size: cover;
    }
  }
  // 未登录头部
   .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  // 登录头部
   .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  // 宫格导航
  .grid-nav {
    .grid-item {
      height: 141px;
      i.iconfont {
        font-size: 45px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }

   .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
</style>

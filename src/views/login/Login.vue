<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="登录/注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            :time="6000 * 10"
            format="ss秒后重试"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-msg"
            round
            size="small"
            type="default"
            @click="onSendMsg"
            native-type="button"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/network/login'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          {
            required: true, message: '手机号不能为空'
          },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true, message: '验证码不能为空'
          },
          {
            pattern: /\d{6}/,
            message: '请输入6位验证码'
          }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    // 提交登录
    onSubmit () {
      const user = this.user
      // 登录提示toast
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      // 登录请求
      login(user).then(res => {
        // console.log(res)
        const rdata = res.data.data
        this.$store.commit('setUser', rdata)
        this.$toast.success('登录成功')
        // 跳回原页面
        this.$router.back()
      }).catch(err => {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('出错了，请稍后重试')
        }
      })
    },
    onSendMsg () {
      // 校验手机号
      this.$refs.loginForm.validate('mobile').then(() => {
        // 显示倒计时
        this.isCountDownShow = true
      }).catch(err => {
        return err
      })
      // 发送验证码请求
      sendSms(this.user.mobile).then(() => {
        this.$toast.success('发送成功')
      }).catch(err => {
        if (err.response.status === 429) {
          this.$toast('操作频繁，请稍后重试')
        } else {
          this.isCountDownShow = false
          this.$toast('发生错误，请稍后重试')
        }
      })
    },
    // 返回上一个页面
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 37px;
}
.send-msg {
  width: 178px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
.login-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>

module.exports = {
  plugins: {
    // vue-cli内置了autoprefixer
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // lib-flexible的rem适配将一行分成10份
      // rootValue值为设计稿的十分之一
      // 设计稿为75，vant要求37.5
      // rootValue值可以为数字和函数

      // rootValue: 37.5,

      // 对自己写的样式和vant的样式分开处理
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的css属性，*表示转换所有
      propList: ['*']
    }
  }
}

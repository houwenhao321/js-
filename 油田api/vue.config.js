// vue.config.js
const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = {
  // 选项...
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: "dist", //将构建好的文件输出到哪里
  assetsDir: "assets", //放置生成的静态资源(js、css、img、fonts)的目录
  indexPath: "index.html",
  filenameHashing: true,
  pages: undefined,
  lintOnSave: true,
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: false,
  crossorigin: undefined,
  integrity: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/css/varibles.less'),
      ],
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          // px转rem插件
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias //别名
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_v', resolve('src/views'))
  },
  devServer: {
    // 设置代理
    port: 8087,
    proxy: {
      "/nljz": {
        target: 'http://10.81.108.89:8098', //测试
        changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      }
    }
  }
}
const { resolve } = require('path');
const { SkeletonPlugin } = require('./skeleton');

module.exports = {
  configureWebpack: {
    plugins: [
      new SkeletonPlugin({
        // 启动静态文件服务器，显示dist目录里的页面
        staticDir: resolve(__dirname, 'dist'),
        port: 8008,
        origin: 'http://localhost:8008',
        device: 'iPhone 6',
        defer: 5000,
        elRoot: '#app',
        button: {
          color: '#efefef'
        },
        image: {
          shape: 'circle',
          color: '#efefef'
        }
      })
    ]
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== 'development') {
      config.plugin('html').tap(opts => {
        opts[0].minify.removeComments = false
        return opts
      })
    }
  }
}
const { resolve } = require('path');

const staticDir = resolve(__dirname, 'dist'); // 默认文件为当前项目根目录下的dist

// 默认配置
const defaultOptions = {
  port: 8008,
  origin: 'http://localhost:8008',
  device: 'iPhone 6',
  defer: 5000,
  elRoot: '#app',
  button: {
    color: '#efefef'
  },
  image: {
    shape: 'rect',
    color: '#efefef'
  },
  svg: {
    shape: 'rect',
    color: '#efefef'
  }
}

module.exports = {
  staticDir,
  defaultOptions
}
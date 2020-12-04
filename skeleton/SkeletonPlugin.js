const PLUGIN_NAME = 'SkeletonPlugin';
const merge = require('lodash/merge');
// [fs-extra] fs的一个扩展，提供了更多便利的API，并集成了fs所有的方法和为fs添加了promise的支持
const { readFileSync, writeFileSync } = require('fs-extra');
const { resolve } = require('path');
const { defaultOptions } = require('./config');
const Server = require('./Server');
const Skeleton = require('./Skeleton');

class SkeletonPlugin {
  constructor (options) {
    // 合并配置
    this.options = merge(defaultOptions, options);
  }

  apply (compiler) {
    compiler.hooks.done.tap(PLUGIN_NAME, async () => {
      await this.startServer();
      this.skeleton = new Skeleton(this.options);
      await this.skeleton.initialize(); // 启动无头浏览器
      
      const skeletonHTML = await this.skeleton.genHTML(this.options.origin); // 生成骨架屏的DOM字符串
      const originPath = resolve(this.options.staticDir, 'index.html');      // 打包后文件路径
      const originHTML = await readFileSync(originPath, 'utf8');             // 读取打包后文件内容
      const finalHTML = originHTML.replace('<!--替换内容-->', skeletonHTML);    // 把打包后的文件内容替换成生成的骨架屏内容
      await writeFileSync(originPath, finalHTML);                            // 向打包后的文件写入替换骨架屏后的内容 
      await this.skeleton.destroy();                                         // 销毁无头浏览器
      await this.server.close();                                             // 关闭服务
    })
  }
  async startServer () {
    this.server = new Server(this.options);
    await this.server.listen();
  }
}

module.exports = SkeletonPlugin;
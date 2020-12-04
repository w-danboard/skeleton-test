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
      
      const skeletonHTML = await this.skeleton.genHTML(this.options.origin);
      const originPath = resolve(this.options.staticDir, 'index.html');
      const originHTML = await readFileSync(originPath, 'utf8');
      const finalHTML = originHTML.replace('<!--替换内容-->', skeletonHTML);
      await writeFileSync(originPath, finalHTML);
      await this.skeleton.destroy();
      await this.server.close();
    })
  }
  async startServer () {
    this.server = new Server(this.options);
    await this.server.listen();
  }
}

module.exports = SkeletonPlugin;
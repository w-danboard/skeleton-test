const PLUGIN_NAME = 'SkeletonPlugin';
const { readFileSync, writeFileSync } = require('fs-extra'); // fs的一个扩展，提供了更多便利的API，并集成了fs所有的方法和为fs添加了promise的支持
const { resolve } = require('path');
const Server = require('./Server');
const Skeleton = require('./Skeleton');

class SkeletonPlugin {
  constructor (options) { // staticDir port origin
    this.options = options; // 插件传参
  }
  // compiler代表webpack编译对象
  apply (compiler) {
    // compiler身上会有很多的钩子，我们可以通过tap来注册这些钩子的监听
    // 当这个钩子触发的时候，会调用我们的监听函数
    // done整个编译流程都走完了，dist目录下的文件都生成了，就可以触发done的回调执行了
    compiler.hooks.done.tap(PLUGIN_NAME, async () => {
      console.log('SkeletonPlugin Done');
      await this.startServer(); // 启动一个http服务器
      this.skeleton = new Skeleton(this.options);
      await this.skeleton.initialize(); // 启动一个无头浏览器
      // 生成骨架屏的html和style
      const skeletonHTML = await this.skeleton.genHTML(this.options.origin);
      console.log(skeletonHTML, 'skeletonHTML===>插件log');
      const originPath = resolve(this.options.staticDir, 'index.html');
      const originHTML = await readFileSync(originPath, 'utf8');
      const finalHTML = originHTML.replace('<!--shell-->', skeletonHTML);
      await writeFileSync(originPath, finalHTML);
      await this.skeleton.destroy(); // 再销毁无头浏览器
      // 生成骨架屏内容
      await this.server.close(); // 完事后要关闭服务器
    })
  }
  async startServer () {
    this.server = new Server(this.options); // 创建服务
    await this.server.listen(); // 启动这个服务器
  }
}

module.exports = SkeletonPlugin;
const puppeteer = require('puppeteer');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { sleep } = require('./utils');

class Skeleton {
  constructor (options) {
    this.options = options;
  }

  // 初始化
  async initialize () {
    // 打开一个浏览器
    this.brower = await puppeteer.launch({ headless: true }); // 无头 true不打开浏览器
  }

  async newPage () {
    let { device } = this.options;
    let page = await this.brower.newPage();
    // puppeteer.devices[device]: 设备模拟
    await page.emulate(puppeteer.devices[device]);
    return page;
  }

  async makeSkeleton (page) {
    const { defer } = this.options;
    // 先读取脚本内容
    let scriptContent = await readFileSync(resolve(__dirname, 'skeletonScript.js'), 'utf8');
    // 通过addScriptTag方法向页面里注入这段脚本， 让这个脚本在pup生成的页面中注入
    await page.addScriptTag({ content: scriptContent });
    await sleep(defer)
    // 脚本执行完成就要创建骨架屏的DOM结构了
    // 在页面中执行此函数[genSkeleton]
    await page.evaluate((options) => { // page.evaluate可以让我们使用内置的DOM选择器，比如querySelecror()
      // 这个Skeleton是挂载到window上的
      Skeleton.genSkeleton(options);
    }, this.options);
  }

  async genHTML (url) { // 生成骨架屏的DOM字符串
    let page = await this.newPage();
    let response = await page.goto(url, { waitUntil: 'networkidle2' }); // 等地啊网络没有连接，也就是抓取信息全部加载出来
    if (response && !response.ok()) { // 如果访问不成功
      throw new Error(`${response.status} on ${url}`);
    }
    // 创建骨架屏
    await this.makeSkeleton(page);
    const { html, styles } = await page.evaluate((options) => {
      return Skeleton.getHtmlAndStyle(options)
    }, this.options);
    let result = `
      <style>${styles.join('\n')}</style>
      ${html}
    `;
    return result;
  }

  async destroy () {
    if (this.brower) {
      await this.brower.close();
      this.brower = null;
    }
  }
}

module.exports = Skeleton;
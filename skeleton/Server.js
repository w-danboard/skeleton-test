const http = require('http');
const express = require('express');

class Server {
  constructor (options) {
    this.options = options;
  }

  async listen () {
    const app = this.app = express();
    // 使用express的静态文件中间件，供客户端可以访问staticDir里的文件
    app.use(express.static(this.options.staticDir));
    
    this.httpServer = http.createServer(app); // 创建http服务
    return new Promise(resolve => {
      this.httpServer.listen(this.options.port, () => {
        console.log(`服务器已经在${this.options.port}端口上启动了`)
        resolve();
      })
    })
  }

  async close () {
    return new Promise(resolve => {
      this.httpServer.close(this.options.port, () => {
        console.log(`${this.options.port}端口服务器已经在关闭了`)
        resolve();
      })
    })
  }
}

module.exports = Server;
module.exports = {
    configureWebpack: {},
    devServer: { // 环境配置
      host: '0.0.0.0',
      public: '172.50.39.247:8080', // 此处是自己电脑IP地址！
      port: '8080',
      https: false,
      disableHostCheck: true,
      open: false // 配置自动启动浏览器
    }
}
'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // 编译输出的二级目录，静态资源文件夹
    assetsSubDirectory: 'static',
    // 编译发布的根目录
    assetsPublicPath: '/',
    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
    // 使用方法：https://vuejs-templates.github.io/webpack/proxy.html
    proxyTable: {
      '/api':{ //匹配项，所有带api的路径都会被转到target中
        target: 'http://47.98.121.127/tuyue/api',  //要代理的url，服务器提供的接口
        changeOrigin: true, //是否跨域
        secure: false, //如果是https接口，需要配置这个参数
        pathRewrite: {
          '^/api': '/'  //将/api重写为/，即请求url中去掉api
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // 编译输入的index.html，相对路径，相对于本目录
    index: path.resolve(__dirname, '../dist/index.html'),
    // 编译输出的静态资源根目录
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 编译输出的静态资源二级目录
    assetsSubDirectory: 'static',
    // 静态资源的的公开路径，也就是真正的引用路径
    assetsPublicPath: './',
    // assetsPublicPath: '/dist/',

    // 构建生产环境版本时是否开启source map，sourcmap是用来debug编译后文件的，
    // 通过映射到编译前文件来实现确定是哪一行代码报错，但同时也暴露项目源码
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

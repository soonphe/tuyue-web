'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 定义开发模式接口访问根路径，例：API_ROOT: '"//www.baidu.com/api"'
  API_ROOT: '"/api"',
  // 文件访问路径
  FILE_SERVER :  '"http://47.98.121.127/upload"'
})

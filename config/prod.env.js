'use strict'

module.exports = {
  NODE_ENV: '"production"',
  /* 这里配置的根路径要为全路径——因为不需要代理了 */
  // dev
  // API_ROOT: '"http://localhost:8080/api"'
  // test
  API_ROOT: '"http://192.168.1.6/tuyue/api"',
  FILE_SERVER : '"http://192.168.1.6/upload"'
  // prod
  // API_ROOT: '"http://47.98.121.127/tuyue/api"',
  // FILE_SERVER : '"http://47.98.121.127/upload"'

}

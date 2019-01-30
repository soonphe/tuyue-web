/**
 * 全局静态常量定义
 */
// 本地文件上传接口——这里使用了先动态代理转发，否则将出现403跨域问题
// export const localUploadServer = '/api/common/upload'
// 服务器文件上传接口（这里不能加端口，否则跨域，ip和port都必须要一致）
// export const uploadServer = 'http://47.98.121.127/tuyue/api/common/upload'
/**
 * ——已废弃，不再通过此方法判断本地上传和服务器上传
 // 判断是否为dev环境
 if (process.env.NODE_ENV === 'development') {
        // dev
        this.uploadAction = localUploadServer
      } else {
        // build
        this.uploadAction = uploadServer
      }
 */
// 文件上传路径
export const uploadServer = process.env.API_ROOT + '/common/upload'
// 公共图片访问路径
export const imageServer = process.env.FILE_SERVER
// 公共分页大小
export const pageSize = 20

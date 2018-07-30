/**
 * 全局静态常量定义
 */
// 本地文件上传接口——这里使用了先动态代理转发，否则将出现403跨域问题
export const localUploadServer = 'api/common/upload'
// 服务器文件上传接口
export const uploadServer = 'http://47.98.121.127/tuyue/api/common/upload'
// 公共图片访问路径
export const imageServer = 'http://47.98.121.127/upload'
// 公共分页大小
export const pageSize = 20

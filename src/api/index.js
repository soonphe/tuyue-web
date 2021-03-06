import axios from 'axios'
// 安装axios会默认安装qs
import qs from 'qs'
import store from '../vuex'
import {Message, MessageBox} from 'element-ui'

const http = axios.create({
  // baseURL: 'http://localhost:8080/',
  baseURL: process.env.API_ROOT,
  // timeout: 5000,
  timeout: 120000,
  withCredentials: true
  /* 配置默认请求头，axios默认上传json格式数据 */
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  // }
  // transformRequest: [function (data) {
  //   let newData = ''
  //   for (let k in data) {
  //     if (data.hasOwnProperty(k) === true) {
  //       newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
  //     }
  //   }
  //   return newData
  // }]
})

/* 配置http请求拦截器——先header中添加header信息 */
http.interceptors.request.use(
  req => {
    // 判断是否存在token
    if (store.state.Login.user.token) {
      // config.headers.Authorization = store.state.Login.token
      req.headers.common['X-Authorization'] = `Bearer ${store.state.Login.user.token}`
      req.headers.common['X-Requester'] = 'pc'
    }
    return req
  }, err => {
    Message({
      showClose: true,
      message: 'token invalid',
      type: 'error.data.error.message'
    })
    return Promise.reject(err)
  }
)

/* http返回拦截器——解析对应的返回码 */
http.interceptors.response.use(
  res => {
    /* 如果返回码不等于200，则弹出对应的错误信息 */
    if (!res.resultCode === '200') {
      Message({
        //  饿了么的消息弹窗组件,类似toast
        showClose: true,
        message: res.message ? res.message : '系统异常',
        type: 'error'
      })
      if (res.resultCode === 50008 || res.resultCode === 50012 || res.resultCode === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(res.message)
    } else {
      return res.data
    }
  },
  /* 常规请求错误码 */
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 404:
          err.message = `请求地址出错 `
          break
        case 500:
          err.message = '服务器内部错误'
          break
        default:
      }
    }
    Message({
      showClose: true,
      message: err.message,
      type: 'error'
    })
    return Promise.reject(err)
  }
)

/**
 * 定义网络请求公共框架
 * @param method
 * @param url
 * @param params
 */
function apiAxios (method, url, data, params) {
  return new Promise((resolve, reject) => {
    let options
    // 上传form-data数据
    if (method === 'POST') {
      options = {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        // 上传文件这里使用multipart类型
        // headers: {'content-info': 'multipart/form-data'},
        // 只有一种情况需要qs序列化，那就是type为application/x-www-form-urlencoded
        // qs.stringify格式化之后才是每一个字段对象，id: 1 name: 锁屏广告1
        // 序列化name=hehe&age=10，
        // JSON.stringify序列化结果"{"a":"hehe","age":10}"
        data: qs.stringify(data),
        params: params,
        url
      }
      // (默认)上传json数据
    } else if (method === 'POSTJSON') {
      options = {
        method: 'POST',
        data: data,
        params: params,
        url
      }
      // get|delete等请求
    } else {
      options = {
        method: method,
        data: data,
        params: params,
        url
      }
    }
    http(options).then(res => resolve(res),
      err => reject(err)
    )
    // options = {
    //   url: url,
    //   method: method,
    //   data: method === 'POST' || method === 'PUT' ? params : null,
    //   params: method === 'GET' || method === 'DELETE' ? params : null
    // }
    // 下载文件
    // http.get(url, {responseType: 'blob'})
    //   .then(res => {
  })
}

export default {
  get: function (url, params) {
    return apiAxios('GET', url, null, params)
  },
  post: function (url, data, params) {
    return apiAxios('POST', url, data, params)
  },
  postjson: function (url, data, params) {
    return apiAxios('POSTJSON', url, data, params)
  },
  delete: function (url, params) {
    return apiAxios('DELETE', url, null, params)
  }
}

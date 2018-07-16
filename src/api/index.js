import axios from 'axios'
// 安装axios会默认安装qs
import qs from 'qs'
import { Message } from 'element-ui'
// import { resolve } from 'url'

let http = axios.create({
  // baseURL: 'http://localhost:8080/',
  baseURL: process.env.API_ROOT,
  timeout: 5000,
  withCredentials: true,
  /* 配置请求头 */
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  transformRequest: [function (data) {
    let newData = ''
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
      }
    }
    return newData
  }]
})

/* 配置http请求拦截器——先header中添加header信息 */
// http.interceptors.request.use(
//   config => {
//     if (store.state.Login.token) {
//       // config.headers.Authorization = store.state.Login.token
//       config.headers.common['X-Authorization'] = `Bearer ${store.state.Login.token}`
//       config.headers.common['X-Requester'] = 'pc'
//     }
//     return config
//   },
//   err => {
//     Message({
//       showClose: true,
//       message: error,
//       type: "error.data.error.message"
//     })
//     return Promise.reject(err)
//   }
// )

/* http返回拦截器——解析对应的返回码 */
http.interceptors.response.use(
  res => {
    /* 如果返回码不等于200，则弹出对应的错误信息 */
    if (!res.resultCode === 200) {
      Message({
        //  饿了么的消息弹窗组件,类似toast
        showClose: true,
        message: res.message ? res.message : '系统异常',
        type: 'error'
      })
      return Promise.reject(res.message)
    }
    return res
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

/* 使用vue-resource方式定义请求方法 */
export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    /* 块级变量let 相较于var没有变量提升 */
    let Url
    if (params === null || params === undefined) {
      Url = url
    } else {
      Url = url + '?' + qs.stringify(params)
    }
    http.get(Url)
      .then(res => resolve(res.data),
        err => reject(err))
  })
}

export const post = (url, params) => {
  console.log(params)
  // qs.stringify：将params序列化name=hehe&age=10，JSON.stringify序列化结果"{"a":"hehe","age":10}"
  let Url = url + '?' + qs.stringify(params)
  return new Promise((resolve, reject) => {
    http.post(Url)
      .then(res => resolve(res.data),
        err => reject(err))
  })
}

export const put = (url, params) => {
  console.log('params', params)
  return new Promise((resolve, reject) => {
    http.post(url, params)
      .then(res => resolve(res.data),
        err => reject(err))
  })
}

export const del = (url, params) => {
  let Url = url + '?' + qs.stringify(params)
  return new Promise((resolve, reject) => {
    http.delete(Url)
      .then(res => resolve(res.data),
        err => reject(err))
  })
}

export const download = url => {
  return new Promise((resolve, reject) => {
    http.get(url, { responseType: 'blob' })
      .then(res => {
        console.log(res)
        resolve(res)
      }, err => {
        console.log('err', err)
        reject(err)
      })
  })
}

/* 传统请求方法定义 */
// function apiAxios (method, url, params, response) {
//   http({
//     method: method,
//     url: url,
//     data: method === 'POST' || method === 'PUT' ? params : null,
//     params: method === 'GET' || method === 'DELETE' ? params : null
//   }).then(function (res) {
//     response(res)
//   }).catch(function (err) {
//     response(err)
//   })
// }
//
// export default {
//   get: function (url, params, response) {
//     return apiAxios('GET', url, params, response)
//   },
//   post: function (url, params, response) {
//     return apiAxios('POST', url, params, response)
//   },
//   put: function (url, params, response) {
//     return apiAxios('PUT', url, params, response)
//   },
//   delete: function (url, params, response) {
//     return apiAxios('DELETE', url, params, response)
//   }

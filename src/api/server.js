import { get, post, put } from './index'
/* 定义接口访问路径与参数，这里添加的/api/会被proxyTable匹配 */
export const getAdvertList = params => get('/advert/getList', params)

export const allAd = params => get('/bk/getAllAdvert', params)

export const addAd = params => put('/bk/addNewAdvert', params)

export const delAd = params => post('/bk/removeAdvert', params)

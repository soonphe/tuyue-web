import api from './index'

/**
 * 公共——暂未使用
 * elementh中使用路径直接上传
 * quill(图片)中使用axios单独上传
 */
export const upload = params => api.postjson('/common/upload', params)

/**
 * 设备管理
 * @param params
 * @returns {*}
 */
export const devicesGetList = params => api.get('/devices/getList', params)
export const devicesUpdate = params => api.postjson('/devices/update', params)
export const devicesDelete = params => api.get('/devices/delete', params)
export const devicesGetStateCount = params => api.get('/devices/getStateCount', params)

/**
 * 用户
 */
export const login = params => api.post('/sysUser/login', params)
export const logout = params => api.get('/sysUser/logout', params)
export const sysUserGetList = params => api.get('/sysUser/getList', params)
export const sysUserAdd = (data, params) => api.postjson('/sysUser/add', data, params)
export const sysUserDelete = params => api.get('/sysUser/delete', params)
export const sysUserUpdate = data => api.post('/sysUser/update', data)

/**
 * 角色
 */
export const sysRoleGetList = params => api.get('/sysRole/getList', params)
export const sysRoleAdd = (data, params) => api.postjson('/sysRole/add', data, params)
export const sysRoleDelete = params => api.get('/sysRole/delete', params)
export const sysRoleUpdate = params => api.postjson('/sysRole/update', params)

/**
 * 模块
 */
export const sysMenuGetMenuListByRoleId = params => api.get('/sysMenu/getMenuListByRoleId', params)
export const sysMenuGetList = params => api.get('/sysMenu/getList', params)
export const sysMenuAdd = params => api.postjson('/sysMenu/add', params)
export const sysMenuDelete = params => api.get('/sysMenu/delete', params)
export const sysMenuUpdate = params => api.post('/sysMenu/update', params)

/**
 * 版本管理
 */
export const dataVersionGetList = params => api.get('/dataVersion/getList', params)
export const dataVersionAdd = params => api.postjson('/dataVersion/add', params)
export const versionGetList = params => api.get('/version/getList', params)
export const versionAdd = params => api.postjson('/version/add', params)
export const versionDelete = params => api.get('/version/delete', params)

/**
 * 推送管理
 */
export const pushGetList = params => api.get('/push/getList', params)
export const pushAdd = params => api.postjson('/push/add', params)

/**
 * 地域推送
 */
export const pushLocationGetList = params => api.get('/pushLocation/getList', params)
export const pushLocationAdd = params => api.postjson('/pushLocation/add', params)
export const pushLocationDelete = params => api.get('/pushLocation/delete', params)
export const pushLocationUpdate = params => api.postjson('/pushLocation/update', params)

/**
 * 用户
 */
export const userGetList = params => api.get('/user/getList', params)
export const userAdd = params => api.postjson('/user/add', params)
export const userDelete = params => api.get('/user/delete', params)
export const userGetUserCount = params => api.get('/user/getUserCount', params)

/**
 * 统计管理
 */
export const statsGetUnlock = params => api.get('/stats/getUnlock', params)
export const statsGetClick = params => api.get('/stats/getClick', params)
export const statsGetStay = params => api.get('/stats/getStay', params)
export const statsGetDatail = params => api.get('/stats/getDetail', params)

/**
 * 广告类别
 */
export const advertTypeGetList = params => api.get('/advertType/getList', params)
export const advertTypeAdd = params => api.post('/advertType/add', params)
export const advertTypeDelete = params => api.get('/advertType/delete', params)
export const advertTypeUpdate = params => api.post('/advertType/update', params)

/**
 * 广告
 */
export const advertGetList = params => api.get('/advert/getList', params)
export const advertAdd = (data, params) => api.postjson('/advert/add', data, params)
export const advertDelete = params => api.get('/advert/delete', params)
export const advertUpdate = (data, params) => api.postjson('/advert/update', data, params)
export const advertGetGroupListByAdvertId = params => api.get('/advert/getGroupListByAdvertId', params)

/**
 * 广告商
 */
export const advertiserGetList = params => api.get('/advertiser/getList', params)
export const advertiserAdd = params => api.postjson('/advertiser/add', params)
export const advertiserDelete = params => api.get('/advertiser/delete', params)
export const advertiserUpdate = params => api.postjson('/advertiser/update', params)
export const advertiserSelectByUid = params => api.get('/advertiser/selectByUid', params)

/**
 * 电影类别
 */
export const videoTypeGetList = params => api.get('/videoType/getList', params)
export const videoTypeAdd = params => api.post('/videoType/add', params)
export const videoTypeDelete = params => api.get('/videoType/delete', params)
export const videoTypeUpdate = params => api.post('/videoType/update', params)

/**
 * 视频
 */
export const movieGetList = params => api.get('/movie/getList', params)
export const movieAdd = params => api.postjson('/movie/add', params)
export const movieDelete = params => api.get('/movie/delete', params)
export const movieUpdate = params => api.postjson('/movie/update', params)

/**
 * 视频
 */
export const videoGetList = params => api.get('/video/getList', params)
export const videoAdd = params => api.postjson('/video/add', params)
export const videoDelete = params => api.get('/video/delete', params)
export const videoUpdate = params => api.postjson('/video/update', params)

/**
 * 音乐类别
 */
export const musicTypeGetList = params => api.get('/musicType/getList', params)
export const musicTypeAdd = params => api.post('/musicType/add', params)
export const musicTypeDelete = params => api.get('/musicType/delete', params)
export const musicTypeUpdate = params => api.post('/musicType/update', params)

/**
 * 音乐
 */
export const musicGetList = params => api.get('/music/getList', params)
export const musicAdd = params => api.postjson('/music/add', params)
export const musicDelete = params => api.get('/music/delete', params)
export const musicUpdate = params => api.postjson('/music/update', params)

/**
 * 书吧类别
 */
export const bookTypeGetList = params => api.get('/bookType/getList', params)
export const bookTypeAdd = params => api.post('/bookType/add', params)
export const bookTypeDelete = params => api.get('/bookType/delete', params)
export const bookTypeUpdate = params => api.post('/bookType/update', params)

/**
 * 书吧
 */
export const bookGetList = params => api.get('/book/getList', params)
export const bookAdd = params => api.postjson('/book/add', params)
export const bookDelete = params => api.get('/book/delete', params)
export const bookUpdate = params => api.postjson('/book/update', params)

/**
 * 游戏类别
 */
export const gameTypeGetList = params => api.get('/gameType/getList', params)
export const gameTypeAdd = params => api.post('/gameType/add', params)
export const gameTypeDelete = params => api.get('/gameType/delete', params)
export const gameTypeUpdate = params => api.post('/gameType/update', params)

/**
 * 游戏
 */
export const gameGetList = params => api.get('/game/getList', params)
export const gameAdd = params => api.postjson('/game/add', params)
export const gameDelete = params => api.get('/game/delete', params)
export const gameUpdate = params => api.postjson('/game/update', params)

/**
 * 餐饮类别
 */
export const foodTypeGetList = params => api.get('/foodType/getList', params)
export const foodTypeAdd = params => api.post('/foodType/add', params)
export const foodTypeDelete = params => api.get('/foodType/delete', params)
export const foodTypeUpdate = params => api.post('/foodType/update', params)

/**
 * 餐饮
 */
export const foodGetList = params => api.get('/food/getList', params)
export const foodAdd = params => api.postjson('/food/add', params)
export const foodDelete = params => api.get('/food/delete', params)
export const foodUpdate = params => api.postjson('/food/update', params)

/**
 * 城市
 */
export const cityGetList = params => api.get('/city/getList', params)
export const cityAdd = params => api.postjson('/city/add', params)
export const cityDelete = params => api.get('/city/delete', params)
export const cityUpdate = params => api.postjson('/city/update', params)

/**
 * 城市文章
 */
export const cityArticleGetList = params => api.get('/cityArticle/getList', params)
export const cityArticleAdd = params => api.postjson('/cityArticle/add', params)
export const cityArticleDelete = params => api.get('/cityArticle/delete', params)
export const cityArticleUpdate = params => api.postjson('/cityArticle/update', params)

/**
 * 文章类别
 */
export const articleTypeGetList = params => api.get('/articleType/getList', params)
export const articleTypeAdd = params => api.post('/articleType/add', params)
export const articleTypeDelete = params => api.get('/articleType/delete', params)
export const articleTypeUpdate = params => api.post('/articleType/update', params)

/**
 * 文章
 */
export const articleGetList = params => api.get('/article/getList', params)
export const articleAdd = params => api.postjson('/article/add', params)
export const articleDelete = params => api.get('/article/delete', params)
export const articleUpdate = params => api.postjson('/article/update', params)

/**
 * 车组
 */
export const groupGetList = params => api.get('/group/getList', params)
export const groupAdd = params => api.postjson('/group/add', params)
export const groupDelete = params => api.get('/group/delete', params)
export const groupUpdate = params => api.postjson('/group/update', params)
export const groupGetStateCount = params => api.get('/group/getStateCount', params)

/**
 * 出入库
 */
export const storageGetList = params => api.get('/storage/getList', params)
export const storageleAdd = params => api.postjson('/storage/add', params)
export const storageDelete = params => api.get('/storage/delete', params)
export const storageUpdate = params => api.postjson('/storage/update', params)

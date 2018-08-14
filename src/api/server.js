import api from './index'

/**
 * 公共——暂未使用
 */
export const upload = params => api.post('/common/upload', params)

/**
 * 用户
 */
export const login = params => api.post('/sysUser/login', params)
export const logout = params => api.get('/sysUser/logout', params)
export const sysUserGetList = params => api.get('/sysUser/getList', params)
export const sysUserAdd = params => api.post('/sysUser/add', params)
export const sysUserDelete = params => api.get('/sysUser/delete', params)
export const sysUserUpdate = params => api.post('/sysUser/update', params)

/**
 * 角色
 */
export const sysRoleGetList = params => api.get('/sysRole/getList', params)
export const sysRoleAdd = params => api.post('/sysRole/add', params)
export const sysRoleDelete = params => api.get('/sysRole/delete', params)
export const sysRoleUpdate = params => api.post('/sysRole/update', params)

/**
 * 模块
 */
export const sysMenuGetMenuListByRoleId = params => api.get('/sysMenu/getMenuListByRoleId', params)
// export const sysMenuGetList = params => get('/sysMenu/getList', params)
// export const sysMenuAdd = params => post('/sysMenu/add', params)
// export const sysMenuDelete = params => post('/sysMenu/delete', params)
// export const sysMenuUpdate = params => post('/sysMenu/update', params)

/**
 * 版本管理
 */
export const dataVersionGetList = params => api.get('/dataVersion/getList', params)
export const dataVersionAdd = params => api.put('/dataVersion/add', params)
export const versionGetList = params => api.get('/version/getList', params)
export const versionAdd = params => api.put('/version/add', params)

/**
 * 推送管理
 */
export const pushGetList = params => api.get('/push/getList', params)
export const pushAdd = params => api.put('/push/add', params)

/**
 * 用户
 */
export const userGetList = params => api.get('/user/getList', params)
export const userAdd = params => api.put('/user/add', params)
export const userDelete = params => api.get('/user/delete', params)
export const userUpdate = params => api.post('/user/update', params)

/**
 * 统计管理
 */
export const openGeUnlock = params => api.get('/open/getUnlock', params)
export const openGetDetail = params => api.put('/open/getDetail', params)
export const statsGetClick = params => api.get('/stats/getClick', params)
export const statsGetStay = params => api.post('/stats/getStay', params)
export const statsGetDatail = params => api.post('/stats/getDetail', params)

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
export const advertAdd = params => api.put('/advert/add', params)
export const advertDelete = params => api.get('/advert/delete', params)
export const advertUpdate = params => api.put('/advert/update', params)

/**
 * 视频类别
 */
export const videoTypeGetList = params => api.get('/videoType/getList', params)
export const videoTypeAdd = params => api.post('/videoType/add', params)
export const videoTypeDelete = params => api.get('/videoType/delete', params)
export const videoTypeUpdate = params => api.post('/videoType/update', params)

/**
 * 视频
 */
export const videoGetList = params => api.get('/video/getList', params)
export const videoAdd = params => api.put('/video/add', params)
export const videoDelete = params => api.get('/video/delete', params)
export const videoUpdate = params => api.put('/video/update', params)

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
export const musicAdd = params => api.put('/music/add', params)
export const musicDelete = params => api.get('/music/delete', params)
export const musicUpdate = params => api.put('/music/update', params)

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
export const bookAdd = params => api.put('/book/add', params)
export const bookDelete = params => api.get('/book/delete', params)
export const bookUpdate = params => api.put('/book/update', params)

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
export const gameAdd = params => api.put('/game/add', params)
export const gameDelete = params => api.get('/game/delete', params)
export const gameUpdate = params => api.put('/game/update', params)

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
export const foodAdd = params => api.put('/food/add', params)
export const foodDelete = params => api.get('/food/delete', params)
export const foodUpdate = params => api.put('/food/update', params)

/**
 * 城市
 */
export const cityGetList = params => api.get('/city/getList', params)
export const cityAdd = params => api.put('/city/add', params)
export const cityDelete = params => api.get('/city/delete', params)
export const cityUpdate = params => api.put('/city/update', params)

/**
 * 城市文章
 */
export const cityArticleGetList = params => api.get('/cityArticle/getList', params)
export const cityArticleAdd = params => api.put('/cityArticle/add', params)
export const cityArticleDelete = params => api.get('/cityArticle/delete', params)
export const cityArticleUpdate = params => api.put('/cityArticle/update', params)

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
export const articleAdd = params => api.put('/article/add', params)
export const articleDelete = params => api.get('/article/delete', params)
export const articleUpdate = params => api.put('/article/update', params)

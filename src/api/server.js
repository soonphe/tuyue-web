import api from './index'
/* 定义接口访问路径与参数，这里添加的/api/会被proxyTable匹配 */

/**
 * 用户
 */
export const login = params => api.post('/sysUser/login', params)
export const logout = params => api.get('/sysUser/logout', params)
export const sysUserGetList = params => api.get('/sysUser/getList', params)
export const sysUserAdd = params => api.post('/sysUser/add', params)
export const sysUserDelete = params => api.post('/sysUser/delete', params)
export const sysUserUpdate = params => api.post('/sysUser/update', params)

/**
 * 角色
 */
export const sysRoleGetList = params => api.get('/sysRole/getList', params)
export const sysRoleAdd = params => api.post('/sysRole/add', params)
export const sysRoleDelete = params => api.post('/sysRole/delete', params)
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
 * 广告类别
 */
export const advertTypeGetList = params => api.get('/advertType/getList', params)
export const advertTypeAdd = params => api.post('/advertType/add', params)
export const advertTypeDelete = params => api.post('/advertType/delete', params)
export const advertTypeUpdate = params => api.post('/advertType/update', params)

/**
 * 广告
 */
export const advertGetList = params => api.get('/advert/getList', params)
export const advertAdd = params => api.post('/advert/add', params)
export const advertDelete = params => api.post('/advert/delete', params)
export const advertUpdate = params => api.post('/advert/update', params)

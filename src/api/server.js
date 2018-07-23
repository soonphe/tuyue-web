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
// export const sysRoleGetList = params => get('/sysRole/getList', params)
// export const sysRoleAdd = params => post('/sysRole/add', params)
// export const sysRoleDelete = params => post('/sysRole/delete', params)
// export const sysRoleUpdate = params => post('/sysRole/update', params)

/**
 * 模块
 */
export const sysMenuGetMenuListByRoleId = params => api.get('/sysMenu/getMenuListByRoleId', params)
// export const sysMenuGetList = params => get('/sysMenu/getList', params)
// export const sysMenuAdd = params => post('/sysMenu/add', params)
// export const sysMenuDelete = params => post('/sysMenu/delete', params)
// export const sysMenuUpdate = params => post('/sysMenu/update', params)

/**
 * 广告
 */
export const advertGetList = params => api.get('/advertType/getList', params)
// export const advertAdd = params => post('/advertType/add', params)
// export const advertDelete = params => post('/advertType/delete', params)
// export const advertUpdate = params => post('/advertType/update', params)

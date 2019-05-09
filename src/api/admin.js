
// 引入axios
import request from '@/utils/request'

/**
 * 登录
 * params:
 * username
 * password
 */
export function Login(data) {
  // console.log(data)
  return request({
    url: '/api/v1//admin_login',
    method: 'post',
    data
  })
}

/* 管理员的增删改查 */

/**
 * 管理员信息列表
 * 可按条件查询
 */
export function AdminList(data) {
  return request({
    url: '/api/v1//admin/AdminList',
    method: 'get',
    params: data
  })
}
/**
 * 删除管理员信息
 */
export function AdminDelete(id) {
  return request({
    url: `/api/v1//admin/delete/${id}`,
    method: 'delete'
  })
}

/**
 *添加管理员信息
    params {}
 */
export function AdminAdd(params) {
  return request.post('/api/v1/admin/creatAdmin', params)
}

/**
 * 修改管理员信息
 */
export function AdminModify(params) {
  return request.post(`/api/v1//admin/ModifyAdmin`, params)
}


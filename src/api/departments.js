import request from '@/utils/request'

/**
 * 学院信息列表
 * 可按学院姓名条件查询
 */
export function DepartmentList(data) {
  return request({
    url: '/api/v1/majorList',
    method: 'get',
    params: data
  })
}
/**
 * 删除学院信息
 */
export function DepartmentDelete(id) {
  return request({
    url: `/api/v1//majorDel/${id}`,
    method: 'delete'
  })
}

/**
 *添加学院信息
    params {}
 */
export function DepartmentAdd(params) {
  return request.post('/api/v1/majorAdd', params)
}

/**
 * 修改学院信息
 */
export function DepartmentModify(id, params) {
  return request.post(`/api/v1/majorMod/${id}`, params)
}

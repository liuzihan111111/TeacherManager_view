import request from '@/utils/request'

/**
 * 薪资信息列表
 * 可按条件查询
 */
export function SalaryList(data) {
  return request({
    url: '/api/v1/salary/list',
    method: 'get',
    params: data
  })
}
/**
 * 删除薪资信息
 */
export function SalaryDelete(id) {
  return request({
    url: `/api/v1/salary/delete/${id}`,
    method: 'delete'
  })
}

/**
 *添加薪资信息
    params {}
 */
export function SalaryAdd(params) {
  return request.post('/api/v1/salary/add', params)
}

/**
 * 修改薪资信息
 */
export function SalaryModify(id, params) {
  return request.post(`/api/v1/salary/modify/${id}`, params)
}

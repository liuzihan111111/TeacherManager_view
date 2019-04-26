import request from '@/utils/request'

/**
 * 排课信息列表
 * 可按条件查询
 */
export function ScheduleList(data) {
  return request({
    url: '/api/v1/schedule/list',
    method: 'get',
    params: data
  })
}
/**
 * 删除排课信息
 */
export function ScheduleDelete(id) {
  return request({
    url: `/api/v1/schedule/delete/${id}`,
    method: 'delete'
  })
}

/**
 *添加排课信息
    params {}
 */
export function ScheduleAdd(params) {
  return request.post('/api/v1/schedule/add', params)
}

/**
 * 修改排课信息
 */
export function ScheduleModify(id, params) {
  return request.post(`/api/v1/schedule/modify/${id}`, params)
}

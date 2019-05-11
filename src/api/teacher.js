import request from '@/utils/request'

/**
 * 教师基本信息列表
 * 可按条件查询
 */
export function TeacherList(data) {
  return request({
    url: '/api/v1/teacherList',
    method: 'get',
    params: data
  })
}
/**
 * 删除教师信息
 */
export function TeacherDelete(id) {
  return request({
    url: `/api/v1/teacherDel/${id}`,
    method: 'delete'
  })
}

/**
 *添加教师信息
    params {}
 */
export function TeacherAdd(params) {
  return request.post('/api/v1/teacherAdd', params)
}

/**
 * 修改教师信息
 */
export function TeacherModify(id, params) {
  return request.post(`/api/v1/teacherMod/${id}`, params)
}
/**
 *  分组统计
 * query:分组条件
 * params:统计前的查询条件
 * */
export function TeacherGroup(query, params) {
  return request({
    url: `/api/v1/teacher/group/${query}`,
    method: 'get',
    params: params
  })
}

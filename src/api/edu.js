import request from '@/utils/request'

/**
 * 学历基本信息列表
 * 可按条件查询
 */
export function EduList(data) {
  return request({
    url: '/api/v1/edu/list',
    method: 'get',
    params: data
  })
}
/**
 * 删除学历信息
 */
export function EduDelete(id) {
  return request({
    url: `/api/v1/edu/delete/${id}`,
    method: 'delete'
  })
}

/*
export function TeacherAdd(params) {
  return request.post('/api/v1/teacherAdd', params)
}
 * /

/**
 * 修改学历信息
 */
export function EduModify(params) {
  return request.post(`/api/v1/edu/modify`, params)
}
/**
 *  分组统计
 * query:分组条件
 * params:统计前的查询条件
 * */
/* export function TeacherGroup(query, params) {
  return request({
    url: `/api/v1/teacher/group/${query}`,
    method: 'get',
    params: params
  })
} */

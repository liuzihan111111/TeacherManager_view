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

import request from '@/utils/request'

/**
 * 教师基本信息列表
 */
export function TeacherList(data) {
  return request({
    url: '/api/v1/teacherList',
    method: 'get',
    params: data
  })
}

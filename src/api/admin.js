
// 引入axios
import request from '@/utils/request'
import { baseurl } from '../baseurl'
/**
 * 教师基本信息列表
 */
export function TeacherList() {
  return request({
    url: baseurl + '/api/v1/teacherList',
    method: 'get'
  })
}

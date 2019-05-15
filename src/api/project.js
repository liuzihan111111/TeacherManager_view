import request from '@/utils/request'

/**
 * 项目信息列表
 * 可按条件查询
 */
export function ProjectList(data) {
  return request({
    url: '/api/v1/project/list',
    method: 'get',
    params: data
  })
}
/**
 * 删除项目信息
 */
export function ProjectDelete(id) {
  return request({
    url: `/api/v1/project/delete/${id}`,
    method: 'delete'
  })
}

/**
 *添加项目信息
    params {}
 */
export function ProjectAdd(params) {
  return request.post('/api/v1/project/add', params)
}

/**
 * 修改项目信息
 */
export function ProjectModify(id, params) {
  return request.post(`/api/v1/project/modify/${id}`, params)
}
/*
图片上传
*/
export function Upload(params) {
  return request.post('/api/v2/common/file_upload', params)
}

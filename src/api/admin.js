
// 引入axios
import request from '@/utils/request'

/**
 * 登录
 * params:
 * username
 * password
 */
export function Login(data) {
  console.log(data)
  return request({
    url: '/api/v1//admin_login',
    method: 'post',
    data
  })
}


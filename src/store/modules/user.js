import { logout } from '@/api/user'
import { Login } from '@/api/admin'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  major: '',
  roles: [] // 存放不同的角色
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 登录时 角色判断
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_MAJOR: (state, major) => {
    state.major = major
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 调用登录接口
      Login({ username: username.trim(), password: password }).then(response => {
        // 获取返回的api数据
        const data = response
        console.log(data)
        if (data.code === 1) {
          commit('SET_TOKEN', data.mess.username)
          setToken(data.mess.username)
          if (data.type === 1) {
            localStorage.setItem('id', data.allmess.tid)
            localStorage.setItem('name', data.allmess.tname)
          }
          if (data.type === 2) {
            localStorage.setItem('id', data.allmess.admin_id)
            localStorage.setItem('name', data.allmess.major_name)
            commit('SET_MAJOR', localStorage.getItem('name'))
          }
          if (data.type === 0) {
            localStorage.setItem('id', '')
            localStorage.setItem('name', '')
            commit('SET_MAJOR', '')
          }
          localStorage.setItem('role', data.type) // 将登陆用户的类型保存下来
          resolve(data) // 登陆成功后 将返回信息传递到登录页面   传值
        } else {
          // 登录不成功返回的信息
          reject(data.info)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const username = getToken(username)

      if (!username) {
        reject('Verification failed, please Login again.')
      }
      // const { name, avatar } = data

      commit('SET_NAME', username)
      if (localStorage.getItem('role') === 2) {
        commit('SET_MAJOR', localStorage.getItem('name'))
      }
      commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
      resolve(username)
    })
  },
  /*  getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },*/

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      localStorage.setItem('id', '')
      localStorage.setItem('name', '')
      localStorage.setItem('role', '')
      commit('SET_MAJOR', '')
      commit('SET_TOKEN', '')
      commit('SET_NAME', '')
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    users: []
  },
  mutations: {
    updateUser(state, user) {
      state.user = user
    },
    updateUsers(state, users) {
      state.users = users
    },
    saveToken(state, {data}) {
      return localStorage.setItem('access_token', data.access_token)
    },
  },
  actions: {
    signIn(context, data) {
      return axios.post(`api/login`, data)
          .then(async response => {
            await context.commit('saveToken', response.data)
            await context.dispatch('getUser')
            return response
          })
    },
    getUser(context, id) {
      return axios.get(`api/user`)
          .then(({ data }) => {
            context.commit('updateUser', data)
          })
          .catch(() => {
            context.commit('updateUser', '')
          })
    },
    getUsers(context) {
      return axios.get(`api/users`)
          .then(({ data }) => {
            context.commit('updateUsers', data)
          })
    },
    createUser(context, user) {
      return axios.post(`api/users`, user)
          .then(({ data }) => {
            context.commit('updateUser', data)
          })
    },
    updateUser(context, user) {
      return axios.post(`api/users`, user)
          .then(({ data }) => {
            context.commit('updateUser', data)
          })
    },
  },
  modules: {
  }
})

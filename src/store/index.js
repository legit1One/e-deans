import Vue from 'vue'
import Vuex from 'vuex'

const axios = require('axios');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    userInfo: {},
    users: [],
    applications: [],
    applicationTypes: [],
    signDocs: [],
    roles: [],
    loading: false
  },
  mutations: {
    updateUser(state, user) {
      state.user = user
    },
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    updateUsers(state, users) {
      state.users = users
    },
    updateRoles(state, roles) {
      state.roles = roles
    },
    updateApplications(state, applications) {
      state.applications = applications
    },
    updateApplicationTypes(state, applicationTypes) {
      state.applicationTypes = applicationTypes
    },
    updateSignDocs(state, signDocs) {
      state.signDocs = signDocs
    },
    saveToken(state, data) {
      if (data) {
        return localStorage.setItem('access_token', data.access_token)
      } else {
        localStorage.removeItem('access_token')
      }
    },
    setLoading(state, value) {
      state.loading = value
    },
  },
  actions: {
    setLoading(context, value) {
      context.commit('setLoading', value)
    },
    login(context, data) {
      context.commit('setLoading', true)
      return axios.post(`api/v1/login`, data)
        .then(async response => {
          context.commit('saveToken', response.data)
          return response
        })
        .catch(() => {
          context.commit('saveToken', '')
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    studentLogin(context, data) {
      context.commit('setLoading', true)
      return axios.post(`api/v1/student-login`, data)
        .then(async response => {
          context.commit('saveToken', response.data)
          return response
        })
        .catch(() => {
          context.commit('saveToken', '')
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    logout(context, data) {
      context.commit('setLoading', true)
      localStorage.removeItem('access_token')
      return axios.post(`api/v1/logout`, data)
        .then(async response => {
          return response
        })
        .finally(() => {
          context.commit('setLoading', false)
          window.location.reload()
        })
    },
    getUser(context, id) {
      context.commit('setLoading', true)
      return axios.get(`api/v1/users/${id}`)
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    getCurrentUser(context) {
      context.commit('setLoading', true)
      return axios.get(`api/v1/user-context`)
        .then(({data}) => {
          context.commit('updateUser', data)
        })
        .catch(() => {
          context.commit('updateUser', null)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    getRoles(context) {
      context.commit('setLoading', true)
      return axios.get(`api/v1/roles`)
        .then(({data}) => {
          context.commit('updateRoles', data)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    getUsers(context) {
      context.commit('setLoading', true)
      return axios.get(`api/v1/users`)
        .then(({data}) => {
          context.commit('updateUsers', data)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    createUser(context, user) {
      context.commit('setLoading', true)
      return axios.post(`api/v1/users`, user)
        .then(({data}) => {
          context.commit('updateUser', data)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    updateUser(context, user) {
      context.commit('setLoading', true)
      return axios.put(`api/v1/users/${user.id}`, user)
        .then(({data}) => {
          context.commit('updateUser', data)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    deleteUser(context, id) {
      context.commit('setLoading', true)
      return axios.delete(`api/v1/users/${id}`)
        .then(() => {
          const users = context.state.users.filter(user => user.id != id)
          context.commit('updateUsers', users)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    requestApplication(context, data) {
      context.commit('setLoading', true)
      return axios.post(`api/v1/application/submit-request`, data)
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    signApplication(context, data) {
      context.commit('setLoading', true)
      return axios.post(`api/v1/sign-docs/sign`, data)
        .then(({data}) => {
          context.commit('updateUser', data)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    getApplications(context) {
      context.commit('setLoading', true)
      return axios.get(`api/v1/applications`)
        .then(({data}) => {
          context.commit('updateApplications', data)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    getApplicationTypes(context) {
      context.commit('setLoading', true)
      return axios.get(`api/v1/application-types`)
        .then(({data}) => {
          context.commit('updateApplicationTypes', data)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    getSignDocs(context) {
      context.commit('setLoading', true)
      return axios.get(`api/v1/sign-docs`)
        .then(({data}) => {
          context.commit('updateSignDocs', data)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    getUserCampusInfo(context, id) {
      context.commit('setLoading', true)
      return axios.get(`api/v1/user/campus-info/${id}`)
        .then(({data}) => {
          context.commit('updateUserInfo', data)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    }
  },
  modules: {}
})

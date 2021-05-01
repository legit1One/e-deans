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
    allApplications: {},
    applicationTypes: [],
    signDocs: [],
    roles: [],
    loading: false,
    statistics: {},
    staticValues: []
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
    updateStaticValues(state, staticValues) {
      state.staticValues = staticValues
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
    updateAllApplications(state, allApplications) {
      state.allApplications = allApplications
    },
    updateStatistics(state, statistics) {
      state.statistics = statistics
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
        .catch((error ) => {
          context.commit('updateUser', null)
          if(error.response.status === 401) {
            localStorage.removeItem('access_token')
            window.location.href = '/login'
          }

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
    },
    getAllApplications(context, page=1) {
      context.commit('setLoading', true)
      return axios.get(`api/v1/applications/all?page=${page}`)
        .then(({data}) => {
          context.commit('updateAllApplications', data)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    getStatistics(context) {
      context.commit('setLoading', true)
      return axios.get(`api/v1/statistics`)
        .then(({data}) => {
          context.commit('updateStatistics', data)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    getStaticValues(context) {
      context.commit('setLoading', true)
      return axios.get(`api/v1/static-vars`)
        .then(({data}) => {
          context.commit('updateStaticValues', data)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    deleteStaticValue(context, id) {
      context.commit('setLoading', true)
      return axios.delete(`api/v1/static-vars/${id}`)
        .then(({data}) => {
          const values = context.state.staticValues.filter(value => value.id != id)
          context.commit('updateStaticValues', values)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    editStaticValue(context, value) {
      context.commit('setLoading', true)
      return axios.put(`api/v1/static-vars/${value.id}`, value)
        .then(() => {
          const values = context.state.staticValues.map(staticValue => staticValue.id === value.id? value: staticValue)
          context.commit('updateStaticValues', values)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    createStaticValue(context, data) {
      context.commit('setLoading', true)
      return axios.post(`api/v1/static-vars`, data)
        .then(() => {
          const values = [...context.state.staticValues, data]
          context.commit('updateStaticValues', values)
        })
        .finally(() => {
          context.commit('setLoading', false)
        })
    },
    verifySigning(context, data) {
      context.commit('setLoading', true)
      return axios.post(`api/v1/verify-signing`, data)
        .then(response => {
          context.commit('setLoading', false)
          return response
        })
    }
  },
  modules: {}
})

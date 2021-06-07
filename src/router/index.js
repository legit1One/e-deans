import Vue from 'vue'
import VueRouter from 'vue-router'
import UserList from "../components/UserList";
import CreateUser from "../components/CreateUser";
import Login from "../components/Login"
import Applications from "../components/Applications";
import CreateApplication from "../components/CreateApplication";
import SignDocs from "../components/SignDocs";
import CreateSignDoc from "../components/CreateSignDoc";
import Profile from "../components/Profile";
import AllApplications from "../components/AllApplications";
import Dashboard from "../components/Dashboard";
import StaticValues from "../components/StaticValues";
import ApplicationTypes from "../components/ApplicationTypes";
import SignerOrders from "../components/SignerOrders";

Vue.use(VueRouter)

const routes = [
  {
    path: '/user-list',
    name: 'userList',
    component: UserList
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/create-user',
    name: 'createUser',
    component: CreateUser
  },
  {
    path: '/update-user/:id',
    name: 'updateUser',
    component: CreateUser,
    meta: {
      isEdit: true
    }
  },
  {
    path: '/applications',
    name: 'applications',
    component: Applications,
  },
  {
    path: '/create-application',
    name: 'createApplication',
    component: CreateApplication,
  },
  {
    path: '/sign-docs',
    name: 'signDocs',
    component: SignDocs,
  },
  {
    path: '/create-sign-doc',
    name: 'createSignDoc',
    component: CreateSignDoc,
  },
  {
    path: '/profile',
    name: 'createSignDoc',
    component: Profile,
  },
  {
    path: '/all-applications',
    name: 'allApplications',
    component: AllApplications,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/static-values',
    name: 'staticValues',
    component: StaticValues,
  },
  {
    path: '/application-types',
    name: 'applicationTypes',
    component: ApplicationTypes,
  },
  {
    path: '/signer-orders/:id',
    name: 'signerOrders',
    component: SignerOrders,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !localStorage.getItem('access_token')) next({ name: 'login' })
  else if (to.path === '/') next({ name: 'dashboard' })
  else next()
})

export default router

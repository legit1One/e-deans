import Vue from 'vue'
import VueRouter from 'vue-router'
const UserList = () => import("../components/UserList");
const CreateUser = () => import("../components/CreateUser");
const Login = () => import("../components/Login")
const Applications = () => import("../components/Applications");
const CreateApplication = () => import("../components/CreateApplication");
const SignDocs = () => import("../components/SignDocs");
const CreateSignDoc = () => import("../components/CreateSignDoc");
const AllApplications = () => import("../components/AllApplications");
const Dashboard = () => import("../components/Dashboard");
const StaticValues = () => import("../components/StaticValues");
const ApplicationTypes = () => import("../components/ApplicationTypes");
const SignerOrders = () => import("../components/SignerOrders");

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
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   component: Profile,
  // },
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

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login' && !localStorage.getItem('access_token')) {
//     alert(123)
//     next({name: 'login'})
//   }
//   else if (to.path === '/') next({ name: 'dashboard' })
//   else next()
// })

export default router

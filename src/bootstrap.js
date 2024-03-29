// import Vue from 'vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import './scripts/app-style-switcher'
import './scripts/custom'
import './scripts/waves'
import './scripts/sidebar'
// import { ModalPlugin } from 'bootstrap-vue'
// Vue.use(BootstrapVue)
// Vue.use(ModalPlugin)


const axios = require('axios');

let axiosDefaults = require('axios/lib/defaults');
axiosDefaults.baseURL = 'http://127.0.0.1:8000/';
// axiosDefaults.baseURL = 'https://diploma-doc-service.herokuapp.com';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`


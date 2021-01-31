import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './scripts/app-style-switcher'
import './scripts/custom'
import './scripts/waves'
import './scripts/sidebar'
import { BootstrapVue, ModalPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(ModalPlugin)


const axios = require('axios');

let axiosDefaults = require('axios/lib/defaults');
axiosDefaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`


const axios = require('axios');

let axiosDefaults = require('axios/lib/defaults');
axiosDefaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`


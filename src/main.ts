import Vue from 'vue'
import axios from 'axios';
import "bootstrap";
import moment from 'moment';
import "bootstrap/dist/css/bootstrap.min.css";
// import "material-design-icons-iconfont/dist/material-design-icons.css";
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter("timestamp", value => {
  return moment(value).format("LLL");
});

// AXIOS
Vue.prototype.$http = axios;
axios.defaults.baseURL = "http://localhost:8002";
// axios.defaults.baseURL = process.env.VUE_APP_ROOT_API;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

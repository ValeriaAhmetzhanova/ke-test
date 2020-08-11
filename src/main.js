import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueBlobJsonCsv from 'vue-blob-json-csv'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueBlobJsonCsv)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

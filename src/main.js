import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import { routes } from './routes'
import './directives/transform'
import VeeValidate from 'vee-validate'

// import 'bootstrap/scss/bootstrap.scss';
// import './assets/sass/variables.scss';
import 'jquery/dist/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:3000'
Vue.use(VueRouter)
Vue.use(VeeValidate)

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})

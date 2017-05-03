import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// import 'vuetify/dist/vuetify.min.css'

import App from './App.vue'
import Home from './components/Home.vue'
import Detail from './components/ProjectDetail.vue'

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [{
	path: '/',
	component: Home
},
	{
	path: '/home',
	component: Home
}, {
	path: '/app',
	component: App
}, {
	name: 'project-detail',
	path: '/detail/:project',
	component: Detail
}]

const router = new VueRouter({
	routes
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


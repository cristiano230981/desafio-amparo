import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes/index';

Vue.config.productionTip = false;

Vue.use(VueRouter)

const router = new VueRouter({mode: 'history', routes});

//console.log('VUE_APP_API_URL',process.env.VUE_APP_API_URL)

new Vue({
  el: '#app',
  render: h => h(App),
  router
})

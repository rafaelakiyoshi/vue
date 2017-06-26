import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(VueResource)
new Vue({
  el: '#app',
  render: h => h(App)
})

/* jshint esversion: 6 */

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index';
import './plugins/element.js'
import 'bootstrap'; // Import js file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import css file

Vue.use(VueAxios , axios , ElementUI)

Vue.config.productionTip = false

router.beforeEach(((to, from, next) => {

  let currentUser;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://54.199.244.110/#/php/checkUser.php',true);
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      currentUser = xhr.responseText;
      const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
      if (requiresAuth && currentUser !== '') {
        next();
      } else if (requiresAuth && currentUser === ''){
        next('/login');
      } else {
        next();
      }
    }
  })
  xhr.send(null);
}))

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

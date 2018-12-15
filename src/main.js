// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './utils/rem';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './assets/iconfont/iconfont.css';
import './assets/css/reset.css';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  NProgress.start();
  // TODO Check Login Auth
  next();
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

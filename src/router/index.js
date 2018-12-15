import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Menu from '@/views/layout/Menu';

import Home from '@/views/home/Index';

import Case from '@/views/case/Case';

Vue.use(Router);
Vue.use(ElementUI);

export default new Router({
  routes: [
    {
      path: '/',
      component: Menu,
      redirect: '/index',
      children: [{
        path: '/index',
        component: Home,
        name: 'Home',
        meta: { title: '首页', icon: '', cache: false }
      }]
    }, {
      path: '/case',
      component: Menu,
      redirect: '/case/index',
      children: [{
        path: '/case/index',
        component: Case,
        name: 'Case',
        meta: { title: '实战案例', icon: '', cache: false }
      }]
    }
  ]
});

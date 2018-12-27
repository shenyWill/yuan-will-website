import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Menu from '@/views/layout/Menu';

import Home from '@/views/home/Index';

import Categories from '@/views/categories/Categories';

import Detail from '@/views/detail/Detail';

Vue.use(Router);
Vue.use(ElementUI);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: Menu,
      // redirect: '/',
      children: [{
        path: '/',
        component: Home,
        name: 'Home',
        meta: { title: '首页', icon: '', cache: false }
      }, {
        path: '/categories',
        component: Categories,
        name: 'Categories',
        meta: { title: '相关分类', icon: '', cache: false }
      }, {
        path: '/detail',
        component: Detail,
        name: 'Detail',
        meta: { title: '文章详情', icon: '', cache: false }
      }]
    }
  ]
});

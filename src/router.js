import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: [
        {path: '', component: () => import('./views/demo')},
        {path: '/demo1', component: () => import('./views/Dashboard')},
        {path: '/demo2', component: () => import('./views/Dashboard2')},
        {path: '/demo3', component: () => import('./views/Dashboard4')},
        {path: '*', redirect: '',},
    ]
})
import Vue from 'vue';
import App from './App.vue';

import './styles/index.scss';

import store from './store';
import * as filters from './filters' // global filters

Vue.config.productionTip = false;

// 设置过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import Quests from './components/quests'
import QuestInfo from './components/questInfo'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(BootstrapVue);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'quests/:id',
      component: Quests
    },
    {
      path: 'questInfo', component: QuestInfo, name: 'questInfo', params: true
    }
  ]
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  components: {
    'quest-list': Quests
  },
  template: `
    <div id="app">
      <router-view></router-view>
    </div>
  `
}).$mount('#app')

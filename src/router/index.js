import Vue from 'vue'
import Router from 'vue-router'
import picker from '@/pages/picker/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'picker',
      component: picker
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Demo from '@/components/Demo'
import Login from '@/components/Login'
import Tasks from '@/components/Tasks'
import Users from '@/components/Users'
import Results from '@/components/Results'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks 
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/results',
      name: 'results',
      component: Results
    },

  ]
})

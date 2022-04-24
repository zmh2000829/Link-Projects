import Vue from 'vue'
import Router from 'vue-router'

import Start from '@/views/user/Start'
import Home from '@/views/user/Home'
import Egg from '@/views/user/egg'
import loading from '@/views/user/loading'
import store from '@/store'
Vue.use(Router)

export const publicRouter = [
    {name:"start",path: '/start', component: Start, hidden: true, children:[]},
    {name:"home",path: '/home', component: Home, hidden: true, children:[]},
    {name:"loading",path: '/loading', component: loading, hidden: true, children:[]},
    {name:"egg",path: '/egg', component: Egg, hidden: true, children:[]}
  ]
export const router = new Router({
  routes: publicRouter,
})

//Logic 
router.beforeEach((to,from,next) =>{
      if (sessionStorage.getItem('user')){
        if (!store.getters.getUserInfo.length) {
          let user = JSON.parse(sessionStorage.getItem('user'))
          store.dispatch('setUserInfo', user)
          // 将session存入store
        }
        next()
    }
    else if(to.path == '/start'|| to.path=='/home'|| to.path=='/egg' || to.path=='/loading'){
      next();
    }
    else{
      next({path: '/start'})
    }
})
export default router
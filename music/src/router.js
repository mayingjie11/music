import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const route= new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
        path:'/',
        redirect:'/register'
      },
      {
        path:'/login',
        component:()=>import('./views/login/index.vue')
      },
      {
        path:'/music',
        component:()=>import('./views/music/index.vue')
      },
      {
        path:'/register',
        component:()=>import('./views/register/index.vue')
      },
      {
        path:'*',
        component:()=>import('./views/404/index.vue')
      },
  ]
})

let routes =['/music']
route.beforeEach((to,from,next)=>{
  if(routes.includes(to.path)){
      let token = localStorage.getItem('token')
      if(token){
        next()
      }else{
        next('/login')
      }
  }else{
    next()
  }
})


export default route
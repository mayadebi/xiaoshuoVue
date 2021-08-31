import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/admin/Home.vue'
import axios from "axios";
import store from "../store"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // 把home当父路由，下面就是子路由，访问子路由会自动加载父路由
    children:[
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/admin/index')
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/admin/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 菜单加载后改成true就不走这里了
  let hasRoute = store.state.menus.hasRoute
  if(!hasRoute){
    axios.get("/sys/menu/all",{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    }).then(res =>{
      // 保存菜单到state
      store.commit("SET_MENU_LIST",res.data.data.menu)
      // 保存权限到state
      store.commit("SET_AUTHORITYS",res.data.data.authoritys)
      // 动态绑定路由
      let Routes = router.options.routes

      res.data.data.menu.forEach(menu =>{
        if(menu.children){
          menu.children.forEach(e =>{
            // 转换路由
            let route = menuToRoute(e)
            // 把路由添加
            if(route){
              Routes[0].children.push(route)
            }
          })
        }
      })
      router.addRoutes(Routes)
      store.commit("SET_HASROUTE",true)
    })
  }

  next()
})
// 转换路由方法
const menuToRoute = (menu) =>{
  if(!menu.component){
    return null
  }
  let route = {
    name:menu.name,
    path:menu.path,
    meta:{
      icon:menu.icon,
      title:menu.title
    }
  }
  route.component = () => import('../views/'+menu.component+'')
  return route
}


export default router

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        menuList:[],
        authoritys: [],
        hasRoute:false
    },
    mutations: {
        SET_MENU_LIST(state,menu){
            state.menuList = menu
        },
        SET_AUTHORITYS(state,authoritys){
            state.authoritys = authoritys
        },
        SET_HASROUTE(state,hasRoute){
            state.hasRoute = hasRoute
            sessionStorage.setItem("hasRoute",hasRoute)
        }
    },
    actions: {},
    modules: {}
}

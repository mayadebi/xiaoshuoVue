import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        menuList: [],
        authoritys: [],
        hasRoute: false,
        editableTabsValue: 'index',
        editableTabs: [{
            title: '首页',
            name: 'index',
        }]
    },
    mutations: {
        SET_MENU_LIST(state, menu) {
            state.menuList = menu
        },
        SET_AUTHORITYS(state, authoritys) {
            state.authoritys = authoritys
        },
        SET_HASROUTE(state, hasRoute) {
            state.hasRoute = hasRoute
            sessionStorage.setItem("hasRoute", hasRoute)
        },
        ADD_TAB(state, tab) {
            let index = state.editableTabs.findIndex(e => e.name === tab.name)
            if (index === -1) {
                state.editableTabs.push({
                    title: tab.title,
                    name: tab.name
                });
            }
            state.editableTabsValue = tab.name
        },
        DEL_TOKEN: (state) => {
            state.token = ''
            state.menuList = []
            state.authoritys = []
            state.hasRoute = false
            state.editableTabsValue = 'index'
            state.editableTabs = [{
                title: '首页',
                name: 'index',
            }]
        }
    },
    actions: {},
    modules: {}
}

<template>
  <el-menu :default-active="this.$store.state.menus.editableTabsValue" class="el-menu-vertical-demo"
           background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <router-link to="/index">
      <el-menu-item index="index" @click="addMenu({name:'index',title:'首页'})">
        <template slot="title"><i class="el-icon-s-home"></i> <span slot="title">首页</span></template>
      </el-menu-item>
    </router-link>
    <el-submenu :index="menu.name" v-for="menu in menuList">
      <template slot="title"><i :class="menu.icon"></i> <span>{{ menu.title }}</span></template>
      <router-link :to="item.path" v-for="item in menu.children">
        <el-menu-item :index="item.name" @click="addMenu(item)">
          <template slot="title"><i :class="item.icon"></i> <span slot="title">{{ item.title }}</span></template>
        </el-menu-item>
      </router-link>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: "MenuLeft",
  data() {
    return {}
  },
  // 菜单放到计算属性里监控
  computed: {
    menuList: {
      get() {
        return this.$store.state.menus.menuList
      }
    }
  },
  methods: {
    addMenu(item) {
      this.$store.commit("ADD_TAB", item)
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100%;
}
</style>
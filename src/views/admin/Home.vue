<template>
  <el-container>
    <el-aside width="200px">
      <MenuLeft></MenuLeft>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
<!--        这里就是index页面,用路由跳转-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuLeft from '@/components/admin/MenuLeft'
import Header from '@/components/admin/Header'
export default {
  name: "Home",
  components:{
    MenuLeft,
    Header
  }
}
</script>

<style scoped>
.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
}



.el-dropdown-link {
  cursor: pointer;
}

.el-header {
  background-color: #17B3A3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
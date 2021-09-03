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
        <Tabs></Tabs>
        <!--        这里就是index页面,用路由跳转-->
        <div style="margin: 0 15px;">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuLeft from '@/components/admin/MenuLeft'
import Header from '@/components/admin/Header'
import Tabs from '@/components/admin/Tabs'
export default {
  name: "Home",
  components: {
    MenuLeft,
    Header,
    Tabs
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
  padding: 0;
}
a {
  text-decoration: none;
}
</style>
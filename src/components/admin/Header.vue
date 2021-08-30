<template>
  <div>
    <strong>看小说系统</strong>
    <div class="header-avatar">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <el-dropdown>
              <span class="el-dropdown-link">
                Admin<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-link type="primary" :underline="false" target="_blank"
               href="https://service-p0p7db2e-1305319709.hk.apigw.tencentcs.com/release/wangpan/">视频网站
      </el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.header-avatar {
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
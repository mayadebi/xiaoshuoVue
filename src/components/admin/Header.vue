<template>
  <div>
    <strong>抖M系统</strong>
    <div class="header-avatar">
      <el-avatar :src="userInfo.touxiang"></el-avatar>
      <el-dropdown>
              <span class="el-dropdown-link">
                {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/sys/userCenter">个人中心</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
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
  name: "Header",
  data() {
    return {
      userInfo: {
        id: '',
        username: '',
        touxiang: ''
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods:{
    getUserInfo(){
      this.$axios.get("/sys/userInfo").then(res =>{
        this.userInfo = res.data.data
      })
    },
    logout(){
      this.$axios.post("/logout").then(res =>{
        localStorage.clear()
        sessionStorage.clear()
        this.$store.commit("DEL_TOKEN");
        this.$router.push("/login")
      })
    }
  }
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
a {
  text-decoration: none;
}
</style>
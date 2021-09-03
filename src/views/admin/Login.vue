<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="6" :lg="7">
      <h2>黑芝香苗</h2>
      <el-image :src="require('@/assets/黑芝香苗9.png')"/>
      <p>站长qq:503991583</p>
    </el-col>
    <el-col :span="2">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :xl="6" :lg="7">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username" style="width: 380px">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 380px">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" style="width: 380px">
          <el-input v-model="loginForm.code" style="width: 150px;float: left;"></el-input>
          <el-image :src="captchaImg" class="code"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">立即创建</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
let name = "Login";
let name1 = name;
export default {
  name: name1,
  data() {
    return {
      captchaImg:'',
      loginForm: {
        username: '',
        password: '',
        code: '',
        token: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {min: 5, max: 5, message: '长度5个字符', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login',this.loginForm).then(res =>{
            const jwt = res.headers['authorization']
            this.$store.commit('SET_TOKEN',jwt)
            this.$router.push("/index")
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCaptcha(){
      this.$axios.get('/captcha').then(res =>{
        this.loginForm.token = res.data.data.token
        this.captchaImg = res.data.data.captchaImg
      })
    }
  }
}
</script>

<style scoped>
.code {
  margin-left: 8px;
  border-radius: 4px;
  float: left;
}

.el-divider {
  height: 200px;
}

.el-row {
  background-color: #fafafa;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}

</style>
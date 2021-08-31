<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
 export default {
   name:'App',
   watch:{
     // 修复进入页面不在首页标签不存在的bug
     $route(to,form){
       if(to.path != '/login'){
         let obj = {
           name: to.name,
           title: to.meta.title
         }
         this.$store.commit("ADD_TAB",obj)
       }
     }
   }
 }
</script>

<style lang="scss">


html, body, #app{
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

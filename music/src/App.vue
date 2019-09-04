<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>

export default {
  created() {
    // console.log(this.$api.user.login({userName:"mayingjie", password:"123456"}))
    //  this.$api.post('/api/login',{userName:"mayingjie", password:"123456"}).then(res => {
    //   console.log(res)
    // })
    this.$api.user.login({username:"zs", password:"123"}).then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0; 
  text-decoration: none;
  list-style: none;
  outline: none;
  user-select: none;
  appearance: none;
  box-sizing: border-box;
}
html,body,#app{
  width: 100%;
  height: 100%;
}
</style>

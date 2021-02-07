<template>
  <div class="page">
    <div class="text">{{userInfo.name}}，您好！欢迎您登陆信电科技社团管理系统</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  }
}
</script>
<style scoped>
.page {
  width: 100%;
}
.text {
  width: 100%;
  margin-top: 150px;
  color: black;
  font-size: 45px;
  display: flex;
  justify-content: center;
}
</style>

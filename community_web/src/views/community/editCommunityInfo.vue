<template>
  <div id='editCommunityInfo'
       class="editCommunityInfo-con">
    <communityInfoFrom :fromData='fromData'
                       :ApiInterface='ApiInterface'
                       class="editCommunityInfo" />
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      fromData: {},
      ApiInterface: ''
    }
  },
  components: {
    communityInfoFrom: () => import('../../components/community/communityInfoFrom')
  },
  computed: {},
  beforeMount () { },
  mounted () {
    // this.watchReflush()
  },
  beforeDestroy () {
  },
  methods: {
    getformdata (data, api) {
      this.fromData = data
      this.ApiInterface = api
    }
    // 监听页面刷刷新，回滚到前一个路由
    // async watchReflush () {
    //   // const self = this
    //   window.onbeforeunload = e => {
    //     alert('在此页面刷新将会丢失编辑的数据，重新回到全部社团页面')
    //     self.$confirm('，是否继续?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       self.$router.push(this.$route.meta.breadcrumb[1].path)
    //     }).catch(() => {
    //       e = e || window.event // 前面的e是标准浏览器的，后面的是ie的
    //       if (e.preventDefault()) { // 标准浏览器
    //         e.preventDefault()
    //       } else { // ie
    //         e.returnValue = false
    //       } e = e || window.event // 前面的e是标准浏览器的，后面的是ie的
    //       if (e.preventDefault()) { // 标准浏览器
    //         e.preventDefault()
    //       } else { // ie
    //         e.returnValue = false
    //       }
    //     })
    //   }
    // }
  },
  watch: {},
  created () {
    if (!this.$route.params.data) {
      this.$router.push(this.$route.meta.breadcrumb[1].path)
    }
    this.getformdata(this.$route.params.data, this.$route.params.api)
  }
}
</script>
<style scoped>
.editCommunityInfo-con {
  display: flex;
  justify-content: center;
}
</style>

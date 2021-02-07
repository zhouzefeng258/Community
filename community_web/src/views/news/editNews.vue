<template>
  <div class='page-con'>
    <newsEditor :type='type'
                :newsData='newsData' />
  </div>
</template>
<script>
export default {
  data () {
    return {
      type: 'edit',
      newsData: {}
    }
  },
  components: {
    newsEditor: () => import('../../components/news/newsEditor')
  },
  computed: {},
  beforeMount () { },
  mounted () { },
  methods: {
    getFromData (data) {
      this.newsData = data
    }
  },
  watch: {},
  created () {
    if (!this.$route.params.data) {
      this.$router.push(this.$route.meta.breadcrumb[1].path)
    }
    this.getFromData(this.$route.params.data)
  }
}
</script>
<style scoped>
</style>

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
      type: 'add',
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
    test () {
      console.log(this.content)
    }
  },
  watch: {}
}
</script>
<style scoped>
</style>

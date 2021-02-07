<template>
  <div class='page-con'>
    <activityFrom :type='type'
                  :fromData='fromData' />
  </div>
</template>
<script>
export default {
  data () {
    return {
      type: 'edit',
      fromData: {}
    }
  },
  components: {
    activityFrom: () => import('../../components/activity/activityFrom')
  },
  computed: {},
  beforeMount () { },
  mounted () { },
  methods: {
    getFromData (data) {
      this.fromData = data
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
.page-con {
  display: flex;
  justify-content: center;
}
</style>

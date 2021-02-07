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
      type: 'add',
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
    test () {
      console.log(this.content)
    }
  },
  watch: {}
}
</script>
<style scoped>
.page-con {
  display: flex;
  justify-content: center;
}
</style>

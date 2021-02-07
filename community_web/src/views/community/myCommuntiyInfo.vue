<template>
  <div id="myCommuntiyInfo">
    <myCommunityInfoFrom :ApiInterface='ApiInterface'
                         @getClubInfo='getClubInfo' />
    <!-- <editCommunityInfoFrom :fromData='fromData'
                           :ApiInterface='ApiInterface'
                           @switchDisplay='switchDisplay'
                           class="editCommunityInfo"
                           v-else /> -->
  </div>
</template>
<script>
import * as api from '../../api/index.js'
export default {
  data () {
    return {
      showFlag: true,
      ApiInterface: api.updateCommunityInfo,
      userInfo: {}
    }
  },
  components: {
    myCommunityInfoFrom: () => import('../../components/community/myCommunityInfoFrom')
  },
  created () {
    this.getUserInfo()
    this.getClubInfo()
  },
  methods: {
    getUserInfo () {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    getClubInfo () {
      api.getCommunityInfoByStuentdId({ studentId: this.userInfo.studentId }).then(res => {
        if (res.code === 200) {
          console.log(1)
          sessionStorage.setItem('myCommunityInfo', JSON.stringify(res.data))
        } else {
          this.$message.error(res.message)
        }
      }).catch(errData => {
        console.log(errData)
      })
    }
  }
}
</script>
<style scoped>
#myCommuntiyInfo {
  display: flex;
  justify-content: center;
}
</style>

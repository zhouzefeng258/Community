<template>
  <div class="con"
       id='login'>
    <transition mode="out-in">
      <!-- <component :is="comName"
                 @showLog="showLog"></component> -->
      <router-view></router-view>
    </transition>
  </div>
</template>
<style scoped>
.con {
  background-color: #343a40;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.log-con {
  width: 400px;
  height: 500px;
}
.reg-con {
  width: 400px;
  height: 500px;
}
.center {
  display: flex;
  justify-content: center;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(0px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
</style>
<style>
#login .link span {
  font-size: 12px;
  font-weight: 300;
}
#login .link p {
  margin: 0;
  display: inline;
  font-size: 12px;
  font-weight: 300;
  color: #606266;
}
</style>
<script>
export default {
  components: {
    // log: () => import('./../../components/admin/log'),
    // reg: () => import('./../../components/admin/reg')
  },
  data () {
    return {

    }
  },
  methods: {
  },
  mounted () {
  },
  updated () {
  },
  created () {

  }

}
</script>

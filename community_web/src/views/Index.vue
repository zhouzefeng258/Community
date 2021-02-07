<template>
  <div class="app">
    <el-container id='con'>
      <el-aside class="app-side app-side-left"
                width="auto">
        <div class="app-side-logo">
          <transition name="slide-fade"
                      mode="out-in">
            <div class="app-side-title"
                 v-if="!isCollapse">
              <img src="@/assets/logo.png"
                   width="18"
                   height="15">
              <span>信电科技社团管理系统</span>
            </div>
            <img v-if="isCollapse"
                 src="@/assets/logo.png"
                 :width="isCollapse ? '60' : '60'"
                 height="60" />
          </transition>
        </div>
        <div>
          <el-menu :default-active="$route.meta.index"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   :collapse="isCollapse">
            <template>
              <el-menu-item index="0"
                            @click="doJump('/index')">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
              </el-menu-item>
            </template>
            <template v-for="(item,i) in menuArr">
              <el-submenu :key="i"
                          :index="item.index"
                          v-if="(item.Jurisdiction === userInfo.jurisdiction || item.Jurisdiction ===0)&& item.children !== undefined">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span slot="title">{{item.name}}</span>
                </template>
                <template v-for="(item,i) in item.children">
                  <el-menu-item :key="i"
                                v-if="item.Jurisdiction === userInfo.jurisdiction || item.Jurisdiction ===0"
                                :index="item.index"
                                @click="doJump(item.url)">{{item.name}}
                  </el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item :key="i"
                            :index="item.index"
                            @click="doJump(item.url)"
                            v-if="(item.Jurisdiction === userInfo.jurisdiction || item.Jurisdiction ===0) && item.children === undefined ">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header class="app-header">
          <div style="width: 60px; cursor: pointer;"
               @click.prevent="toggleSideBar">
            <i v-show="!isCollapse"
               class="el-icon-s-fold"></i>
            <i v-show="isCollapse"
               class="el-icon-s-unfold"></i>
          </div>
          <div class="app-header-userinfo">
            <el-dropdown trigger="hover"
                         :hide-on-click="false">
              <span class="el-dropdown-link">
                {{userInfo.name}}，您好
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </el-header>
        <div class="mini-Header">
          <tag :menusData=" menuArr"
               @jump="doJump"
               @close="doClose"></tag>
        </div>
        <el-main class="app-body">
          <div class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="(item,i) in $route.meta.breadcrumb"
                                  :key="i"
                                  :to="{ path: item.path }">{{item.name}}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="app-body-con">
            <template>
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
              </keep-alive>
              <router-view v-if="!$route.meta.keepAlive"></router-view>
            </template>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import menuData from '../assets/data/menuData'
import * as api from '../api/index'
export default {
  name: 'Index',
  components: {
    tag: () => import('../components/admin/Tag')
  },
  data () {
    return {
      flag: true,
      isCollapse: false,
      clientHeight: '',
      userInfo: {}
    }
  },
  computed: {
    menuArr: function () {
      return menuData.menuItem
    }
  },
  methods: {
    toggleSideBar () {
      this.isCollapse = !this.isCollapse
    },
    logout: function () {
      this.$confirm('确认退出?', '提示', {})
        .then(() => {
          sessionStorage.clear()
          this.$router.push('/')
        })
        .catch(() => { })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    conHeight () {
      var con = document.getElementById('con')
      con.style.height = this.clientHeight + 'px'
    },
    doJump (path) {
      if (path) {
        this.$router.push(path)
      }
    },
    doClose (url) {
      if (url) {
        this.$router.push(url.close)
      }
    },
    async getUserInfo () {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      console.log(this.userInfo)
      if (this.userInfo === null) {
        this.$router.push({
          path: '/'
        })
      }
    },
    getClubInfo () {
      api.getCommunityInfoByStuentdId({ studentId: this.userInfo.studentId }).then(res => {
        if (res.code === 200) {
          console.log(res.data)
          sessionStorage.setItem('myCommunityInfo', JSON.stringify(res.data))
        } else {
          this.$message.error(res.message)
        }
      }).catch(errData => {
        console.log(errData)
      })
    }
  },
  created () {
    this.getUserInfo()
    if (this.userInfo.jurisdiction === 2) {
      this.getClubInfo()
    }
  },
  mounted () {
    this.clientHeight = `${document.documentElement.clientHeight}`
    window.onresize = function temp () {
      this.clientHeight = `${document.documentElement.clientHeight}`
    }
    this.conHeight()
  },
  watch: {
    clientHeight: function () {
      this.conHeight()
    }
  }
}
</script>

<style scoped>
.el-aside {
  color: rgb(255, 255, 255);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 228px;
}
.breadcrumb {
  margin: 10px 0 0 10px;
}
.el-breadcrumb {
  font-size: 12px;
}
.mini-Header {
  width: 100%;
  background-color: white;
  height: 23px;
  border-bottom: #eef1f6 1px solid;
}
.app-body {
  padding: 0;
  background-color: white;
}
.app-body-con {
  height: 85%;
  padding: 20px;
  margin: 0;
}
.app-side-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.app-side-title span {
  font-size: 15px;
  color: black;
}

.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
</style>

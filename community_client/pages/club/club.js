// pages/club/club.js
import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
import Notify from '@vant/weapp/notify/notify'
import util from '../../utils/util'
Page({

  /**WWWW
   * 页面的初始数据
   */
  data: {
    clubInfo: {},
    activityList: [],
    showFlag: true,
    windowHeight: '',
    clubMembers: [],
    starValue: 0,
    show: false,
    btn_show: true,
    noticeList:[],
    topNotice:{},
    topShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var app = getApp()
    this.setData({
      windowHeight: app.globalData.windowHeight
    })
    // util.getWxUserInfo(app.globalData.userInfo.openid)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getNewUserinfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 用户跳转至活动详情页面
  toActIntro: function (event) {
    var id = event.currentTarget.dataset.actid
    var name = event.currentTarget.dataset.clubname
    wx.navigateTo({
      url: '../activitieInt/activitieInt?id=' + id + '&name=' + name,
    })
  },
  // 跳转至社团列表页面
  toClubList: function () {
    wx.navigateTo({
      url: '../clubsList/clubsList',
    })
  },
  // 获取社团用户的接口
  getClubMembers: function () {
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    var clubName = app.globalData.userInfo.communityName
    wx.request({
      url: url + '/user/getClubMembers',
      method: 'POST',
      data: {
        clubName: clubName
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 200) {
          that.setData({
            clubMembers: res.data.list,
          })
          for (let i = 0; i < that.data.clubMembers.length; i++) {
            if (that.data.clubMembers[i].jurisdiction == 0) {
              that.setData({
                ['clubMembers[' + i + '].jurisdiction']: '成员',
                ['clubMembers[' + i + '].typeClass']: 'member-type ordinary',
              })
            } else {
              that.setData({
                ['clubMembers[' + i + '].jurisdiction']: '社长',
                ['clubMembers[' + i + '].typeClass']: 'member-type',
              })
            }
          }
          console.log(that.data.clubMembers)
        } else {
          Toast.fail('获取数据失败');
        }
      }
    })
  },
  // 获取社团活动的接口
  getClubActList: function () {
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    var clubName = this.data.clubInfo.clubName
    wx.request({
      url: url + '/activity/getActivity',
      method: 'POST',
      data: {
        clubName: clubName
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 200) {
          that.setData({
            activityList: res.data.list,
          })
        } else {
          Toast.fail('获取数据失败');
        }
      }
    })
  },
  // 获取社团信息的函数
  getClubInfo: function () {
    var that = this
    var app = getApp()
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    wx.request({
      url: url + '/clubinfo/getclubsInfo',
      method: 'POST',
      data: {
        clubName: app.globalData.userInfo.communityName
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 200) {
           app.globalData.clubInfo = res.data.list
           that.setData({
             clubInfo:app.globalData.clubInfo
           })
        } else {
          Toast.fail('服务端异常,获取数据失败');
        }
      }
    })
  },
  // 给社团打星
  strikingStars: function () {
    this.setData({
      show: true
    })
  },
  starChange(e) {
    this.setData({
      starValue: e.detail
    })
  },
  submitStar: function () {
    if (this.data.starValue === 0) {
      Notify({
        type: 'danger',
        message: '评分不能为空'
      })
    } else {
      var that = this
      var app = getApp()
      var url = app.globalData.apiAddress
      let data = {
        clubId: this.data.clubInfo.clubId,
        starTotal: this.data.clubInfo.starTotal,
        star: this.data.starValue,
        evaluationTimes: this.data.clubInfo.evaluationTimes
      }
      let name = this.data.clubInfo.clubName
      wx.request({
        url: url + '/clubInfo/strikingStars',
        method: 'POST',
        data: {
          data
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
          if (res.data.code === 200) {
            wx.setStorageSync(name, '1')
            Notify({
              type: 'success',
              message: '评价成功，感谢您的打分'
            })
          } else {
            Notify({
              type: 'danger',
              message: '评价失败，服务器异常'
            })
          }
        }
      })
    }
  },
  // 判断我是否已给该社团打过评价
  judgeStarBtn() {
    let name = this.data.clubInfo.clubName
    let flag = wx.getStorageSync(name)
    console.log(wx.getStorageSync(name))
    if (flag != '1') {
      this.setData({
        btn_show: true
      })
    } else {
      this.setData({
        btn_show: false
      })
    }
  },
  // 退出社团提示
  showQuitDialog() {
    Dialog.confirm({
        title: '退出社团提醒',
        message: '您确认要退出当前社团吗？',
      })
      .then(() => {
        this.qiutClub()
      })
      .catch(() => {
        // on cancel
      });
  },
  // 发起退出社团请求 /user/quitClub
  qiutClub() {
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    let data = {
      clubName: this.data.clubInfo.clubName,
      openid: app.globalData.userInfo.openid
    }
    wx.request({
      url: url + '/user/quitClub',
      method: 'POST',
      data: {
        data
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code === 200) {
          Notify({
            type: 'success',
            message: '退出社团成功'
          })
          app.globalData.userInfo.communityName = ''
          that.onShow()
        } else {
          Notify({
            type: 'danger',
            message: '退出失败，服务器异常'
          })
        }
      }
    })
  },
  // 获取新的用户信息
  getNewUserinfo(){
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    var openid = app.globalData.userInfo.openid
    wx.request({
      url: url + '/user/geiMyUserInfo',
      method: 'POST',
      data: {
        openid: openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code = 200) {
          app.globalData.userInfo = res.data.list
          var clubName = app.globalData.userInfo.communityName
          if (clubName === '' || clubName === null) {
            that.setData({
              showFlag: false
            })
          } else {
            that.setData({
              showFlag: true
            })
            that.getClubInfo()
            if (that.data.clubInfo.clubName !== '') {
              // that.getClubActList()
              that.getClubMembers()
              that.judgeStarBtn()
              that.getNoticeList()
              that.getTopNotice()
            }
          }
        } else {
          wx.showToast({
            title: '获取新的用户信息失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  // 获取普通公告列表
  getNoticeList(){
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    var clubName = app.globalData.userInfo.communityName
    wx.request({
      url: url + '/announcement/getAnnouncementList',
      method: 'POST',
      data: {
        clubName: clubName
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res.data.list)
          that.setData({
            noticeList: res.data.list,
          })
        } else {
          Notify({
            type: 'danger',
            message: '获取数据失败'
          })
        }
      }
    })
  },
  // 获取置顶公告
  getTopNotice(){
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    var clubName = app.globalData.userInfo.communityName
    wx.request({
      url: url + '/announcement/getTopAnnouncement',
      method: 'POST',
      data: {
        clubName: clubName
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 200) {
          that.setData({
            topShow: true,
            topNotice: res.data.list,
          })
        } else if(res.data.code == 201){
          that.setData({
            topShow: false,
            topNotice:{}
          })
        } else {
          Notify({
            type: 'danger',
            message: '获取数据失败'
          })
        }
      }
    })
  },
  //跳转至公告详情页面
  topNotice: function (event) {
    console.log(event.currentTarget.dataset)
    var id = event.currentTarget.dataset.noticeid
    wx.navigateTo({
      url: '../Notice/Notice?id=' + id ,
    })
  },
})
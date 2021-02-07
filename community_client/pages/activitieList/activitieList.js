// pages/activitieList/activitieList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubInfo: {},
    activityList: [],
    showFlag:true,
    windowHeight:'',
    searchData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    this.setData({
      windowHeight: app.globalData.windowHeight
    })
    var clubName = app.globalData.userInfo.communityName
    if (clubName === '' || clubName === null) {
      this.setData({
        showFlag: false
      })
    } else {
        this.getClubInfo()
        this.getClubActList()
    }
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
  // 获取社团活动的接口
  getClubActList:function(){
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    var clubName = app.globalData.userInfo.communityName
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
  // 用户跳转至活动详情页面
  toActIntro: function (event) {
    var id = event.currentTarget.dataset.actid
    var name = event.currentTarget.dataset.clubname
    wx.navigateTo({
      url: '../activitieInt/activitieInt?id=' + id + '&name=' + name,
    })
  },
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
  serch: function (e) {
    this.setData({
      searchData: e.detail
    })
     if(this.data.searchData ==''){
       console.log(11111)
       this.getClubActList()
     }else{
       this.searchClubActList()
     }
  },
  searchClubActList(){
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    var clubName = app.globalData.userInfo.communityName
    var activityName = this.data.searchData
    wx.request({
      url: url + '/activity/searchActList',
      method: 'POST',
      data: {
        clubName: clubName,
        activityName:activityName
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
  // 跳转至社团列表页面
  toClubList: function () {
    wx.navigateTo({
      url: '../clubsList/clubsList',
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
              that.getClubActList()
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
})
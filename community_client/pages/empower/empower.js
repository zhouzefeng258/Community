 // pages/logs/logs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    wxUserInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 用户单击授权登陆时
  bindGetUserInfo: function(e) {
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      wx.login({
        success: function(res) {
          wx.request({
            url: url + '/user/wxLogin',
            method: 'POST',
            data: {
              APP_ID: app.globalData.APP_ID,
              APP_SECRET: app.globalData.APP_SECRET,
              CODE: res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.data.code == 1) {
                app.globalData.userInfo = res.data.list
                console.log(app.globalData.userInfo)
                wx.navigateBack({
                  delta:1,
                })
              } else if (res.data.code == 0) {
                wx.login({
                  success: function (res){
                    that.setData({
                      wxUserInfo: e.detail.userInfo,
                      'wxUserInfo.APP_ID': app.globalData.APP_ID,
                      'wxUserInfo.APP_SECRET': app.globalData.APP_SECRET,
                      'wxUserInfo.CODE': res.code
                    })
                    wx.setStorage({
                      key: 'wxUserInfo',
                      data: that.data.wxUserInfo
                    })
                    console.log(that.data.wxUserInfo.CODE)
                    wx.redirectTo({
                      url: "../bindInfo/bindInfo"
                    })
                  }
                })
              } else {
                wx.showModal({
                  title: '登陆失败',
                  content: res.message,
                  success(res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              }
            }
          })

        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
})
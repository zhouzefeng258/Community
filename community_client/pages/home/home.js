// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight:0,
    apiurl:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    // 获取app 
    var app = getApp()
    this.setData({
      apiurl: app.globalData.apiAddress
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight) // 获取可使用窗口高度
        let windowHeight = (res.windowHeight * (750 / res.windowWidth)) 
        _this.setData({
          'windowHeight': windowHeight
        })
        console.log(windowHeight) //最后获得转化后得rpx单位的窗口高度
      }
    })
    wx.getSetting({
      success:(res)=>{
        if (! res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '../empower/empower'
          })
        }else{
          var that = this
          var app = getApp()
          var url = app.globalData.apiAddress
          wx.login({
            success: function (res){
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
                  console.log(res.data)
                  if (res.data.code == 1){
                    app.globalData.userInfo = res.data.list
                  }else{
                    wx.showModal({
                      title: '登陆失败',
                      content:'用户不存在，请授权并绑定信息',
                      showCancel: false,
                      success(res) {
                        if (res.confirm) {
                          wx.navigateTo({
                            url: '../empower/empower'
                          })
                        } 
                      }
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
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

  }
})
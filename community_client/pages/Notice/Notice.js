// pages/Notice/Notice.js
var WxParse = require('../../wxParse/wxParse.js') //引入富文本编辑器
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    NoticeInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id
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
    this.getNotice()
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
  // 获取公告数据
  getNotice(){
    console.log(1111111)
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    wx.request({
      url: url + '/announcement/getAnnouncement',
      method: 'POST',
      data: {
        id: this.data.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 200) {
          console.log(res.data)
           that.setData({
            NoticeInfo:res.data.list
           })
           WxParse.wxParse('article', 'html', that.data.NoticeInfo.announcement, that, 5)
        } else {
          Notify({
            type: 'danger',
            message: '获取数据失败'
          })
        }
      }
    })
  }
})
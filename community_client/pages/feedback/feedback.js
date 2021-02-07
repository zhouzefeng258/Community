// pages/feedback/feedback.js
import Notify from '@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_phone: '',
    user_email: '',
    user_proposal: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      user_phone: '',
      user_email: '',
      user_proposal: ''
    })
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
  onShareAppMessage: function (e) {

  },
  emailInput: function (e) {
    this.setData({
      user_email: e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      user_phone: e.detail.value
    })
  },
  proposalInput: function (e) {
    this.setData({
      user_proposal: e.detail.value
    })
  },
  // 提交建议
  submitProposal: function () {
    console.log(11111)
    let {
      user_email,
      user_phone,
      user_proposal
    } = this.data
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    if (user_email == '' || user_phone == '' || user_proposal == '') {
      Notify({
        type: 'warning',
        message: '请将表单填完整'
      })
    } else {
      wx.request({
        url: url + '/proposal/addProposal',
        method: 'POST',
        data: {
          user_email: user_email,
          user_phone: user_phone,
          user_proposal: user_proposal
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res)
          if (res.data.code === 400) {
            Notify({
              type: 'danger',
              message: res.data.message
            })
          } else {
            Notify({
              type: 'success',
              message: res.data.message
            })
            that.onShow()
            // that.reast(that.data.actInfo.activityId,that.data.clubInfo.clubName)
          }
        }
      })
    }
  }
})
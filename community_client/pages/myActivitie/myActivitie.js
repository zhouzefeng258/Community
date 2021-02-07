// pages/myActivitie/myActivitie.js
import Notify from '@vant/weapp/notify/notify'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFlag:true,
    tabClass1:'nav-tabs-active',
    tabClass2: 'nav-tabs',
    url:'',
    recordList:[],
    recordList2:[],
    actType:'进行中',
    studentId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    this.setData({
      url:app.globalData.apiAddress,
      studentId:app.globalData.userInfo.studentId
    })
    this.getMyact()
    // this.getMyact2()
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

  },
  //
  showUnderWay:function(){
    this.getMyact()
    // this.getMyact2()
     this.setData({
      //  showFlag: true,
       tabClass1: 'nav-tabs-active',
       tabClass2: 'nav-tabs',
       actType:'进行中'
     })
  },
  //
  showEnding:function(){
    this.getMyact()
    // this.getMyact2()
    this.setData({
      // showFlag: false,
      tabClass1: 'nav-tabs',
      tabClass2: 'nav-tabs-active',
      actType: '已结束'
    })
  },
  //
  toAct:function(e){
    var id = e.currentTarget.dataset.actid
    var name = e.currentTarget.dataset.clubname
    wx.navigateTo({
      url: '../activitieInt/activitieInt?id=' + id + '&name=' + name,
    })
  },
  // 获取活动记录信息
  getMyact(){
    console.log()
    var that = this
    wx.request({
      url: this.data.url + '/activitieEnroll/getMyRecord',
      method: 'POST',
      data: {
        studentId:this.data.studentId,
        actType:'进行中'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code = 200) {
          that.setData({
            recordList: res.data.list,
          })
        } else {
          Notify({ type: 'danger', message: '服务器异常'})
        }
      }
    })
  },
  getMyact2(){
    console.log()
    var that = this
    wx.request({
      url: this.data.url + '/activitieEnroll/getMyRecord',
      method: 'POST',
      data: {
        studentId:this.data.studentId,
        actType:'已结束'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code = 200) {
          that.setData({
            recordList2: res.data.list,
          })
        } else {
          Notify({ type: 'danger', message: '服务器异常'})
        }
      }
    })
  }
})
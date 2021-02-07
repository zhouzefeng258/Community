// pages/clubIntroduction/clubIntroduction.js
import Toast from '@vant/weapp/toast/toast'
import Notify from '@vant/weapp/notify/notify'
import util from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    clubid: null,
    reason:'',
    clubInfo:{},
    userInfo:{},
    buttonType:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(111111)
    console.log(options)
    var that = this
    var id = JSON.parse(options.id);
    that.setData({
      clubid: id
    })
    var app = getApp()
    var url = app.globalData.apiAddress
    util.getWxUserInfo(app.globalData.userInfo.openid)
    wx.request({
      url: url + '/clubinfo/getclubsInfoById',
      method: 'POST',
      data: {
        id:this.data.clubid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 200) {
          that.setData({
            clubInfo: res.data.list,
          })
          console.log(that.data.clubInfo)
          that.getUserInfo()
        } else {
          Toast.fail('获取数据失败');
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

  },


  getUserInfo(event) {
    console.log(event.detail);
  },

  onClose() {
    this.setData({ close: false });
  },
  // 显示申请加入社团的弹框
  showJionClubDialog() {
    console.log(11111)
    this.setData({
      show: true
    })
    console.log(this.data.show)
  },
  // 发起加入社团的申请
  jionClub(){
    console.log(this.data)
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    if(this.data.reason !=''){
       // this.subscribeToMessages()
      let applayData = {
        name:this.data.userInfo.name,
        studentId:this.data.userInfo.studentId,
        openid:this.data.userInfo.openid,
        clubName:this.data.clubInfo.clubName,
        reason:this.data.reason
      }
      wx.request({
        url: url + '/memberShip/joinClub',
        method: 'POST',
        data: applayData,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res)
          if (res.data.code === 400) {
            Notify({ type: 'danger', message: res.data.message })
          } else {
            Notify({ type: 'success', message: res.data.message })
            that.setData({
              'reason':'',
              'show': false
            })
            console.log(that.data.clubInfo)
            let options = {
              id:''
            }
            options.id = that.data.clubInfo.clubId
            console.log(options)
            that.onLoad(options)
          }
        }
      })
    }else{
      Notify({ type: 'danger', message: '请输入申请理由' })
    }
  },
  // 获取用户的数据并判断该用户有无申请该社团
  async getUserInfo(){
    var app = getApp()
    await this.setData({
      'userInfo': app.globalData.userInfo
    })
    await this.queryApplication()
  },
  // 理由输入框的数据绑定
  reasonInputChange: function(e){
    console.log(e.detail)
    this.setData({
      reason: e.detail,
    })
  },
  // 判断当前的社团我是否已申请
  queryApplication:function(){
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    let data = {
      studentId:this.data.userInfo.studentId,
      clubName:this.data.clubInfo.clubName
    }
    wx.request({
      url: url + '/memberShip/queryApplication',
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code === 400) {
          Notify({ type: 'danger', message: res.message })
        } else {
          
          that.setData({
            'buttonType': res.data.flag
          })
        }
      }
    })
  },
  // 取消加入社团申请
  withdraw:function(){
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    let data = {
      studentId:this.data.userInfo.studentId,
      clubName:this.data.clubInfo.clubName
    }
    wx.request({
      url: url + '/memberShip/withdraw',
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.code === 400) {
          Notify({ type: 'danger', message: res.data.message })
        } else {
          Notify({ type: 'success', message: res.data.message })
          that.setData({
            'buttonType': true
          })
          console.log(that.data.clubInfo)
          let options = {
            id:''
          }
          options.id = that.data.clubInfo.clubId
          console.log(options)
          that.onLoad(options)
        }
      }
    })
  }
})
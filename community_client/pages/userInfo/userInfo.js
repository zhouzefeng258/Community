// pages/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerStyle: 'selected',
    pickerStyle1: 'selected',
    departmentArr: ['信息与机电工程分院', '语言文学分院', '医药与健康分院', '纺织与服装分院'],
    sexArr: ['男', '女'],
    sexIndex: 0,
    departmentIndex: 0,
    userInfo: {
      name: '',
      class: '',
      studentId: '',
      department: '请选择分院',
      sex: '请选择性别',
      nickName: '',
      avatarUrl: '',
    },
    editFlag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInitialUserInfo()
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
    this.getDepartment()
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
  // 显示可编辑信息的界面
  showInput: function () {
    this.setData({
      'editFlag': false
    })
  },
  showText: function () {
    this.getInitialUserInfo()
    this.setData({
      'editFlag': true
    })
  },
  // 性别选择框
  sexPickerChange: function (e) {
    this.setData({
      'userInfo.sex': this.data.sexArr[e.detail.value],
      pickerStyle: 'selected'
    })
  },
  // 分院选择框
  depPickerChange: function (e) {
    this.setData({
      'userInfo.department': this.data.departmentArr[e.detail.value],
      pickerStyle1: 'selected'
    })
  },
  // 名字
  nameInputChange: function (e) {
    this.setData({
      'userInfo.name': e.detail.value,
    })
  },
  // 班级
  classInputChange: function (e) {
    this.setData({
      'userInfo.class': e.detail.value,
    })
  },
  // 学号
  stIdInputChange: function (e) {
    this.setData({
      'userInfo.studentId': e.detail.value
    })
  },
  userInfoSubmit: function () {
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    wx.request({
      url: url + '/user/updatedUser',
      method: 'POST',
      data: {
        // wxUserInfo: that.data.userInfo
        id: that.data.userInfo.id,
        name: that.data.userInfo.name,
        department: that.data.userInfo.department,
        sex: that.data.userInfo.sex,
        studentId: that.data.userInfo.studentId,
        class: that.data.userInfo.class
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code = 200) {
          wx.showToast({
            title: '更新成功',
            icon: 'success',
            duration: 2000
          })
          wx.request({
            url: url + '/user/geiMyUserInfo',
            method: 'POST',
            data: {
              openid: that.data.userInfo.openid,
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.data.code = 200) {
                app.globalData.userInfo = res.data.list
              } else {
                wx.showToast({
                  title: '获取新的用户信息失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        } else {
          that.getInitialUserInfo()
          wx.showToast({
            title: '更新失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  // 获取当前的用户数据
  getInitialUserInfo: function () {
    var app = getApp()
    this.setData({
      userInfo: app.globalData.userInfo
    })
    console.log(this.data.userInfo)
  },// 获取系统中的分院信息
  getDepartment:function(){
    var that = this
    var app =getApp()
    var url = app.globalData.apiAddress
    wx.request({
      url: url+'/other/getDepartmentList', 
      method:'POST',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if(res.data.code = 200){
           let s = []
          for(let a in res.data.list){
            s.push(res.data.list[a].department)
          }
          that.setData({
            departmentArr:s
          })
        }else{
          console.log('服务器异常')
        }
      }
    })
  }
})
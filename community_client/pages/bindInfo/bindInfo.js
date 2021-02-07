// pages/bindInfo/bindInfo.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerStyle: 'unselected',
    pickerStyle1: 'unselected',
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
      APP_ID:'',
      APP_SECRET:'',
      CODE:''
    },
    windowHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _this = this
    wx.setNavigationBarTitle({
      title: '完善信息',
    })
    //获取wx授权的用户信息
    wx.getStorage({
      key: 'wxUserInfo',
      success: function(res) {
        _this.setData({
          'userInfo.nickName': res.data.nickName,
          'userInfo.avatarUrl': res.data.avatarUrl,
          'userInfo.APP_ID': res.data.APP_ID,
          'userInfo.APP_SECRET': res.data.APP_SECRET,
          'userInfo.CODE': res.data.CODE
        })
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        let windowHeight = (res.windowHeight * (750 / res.windowWidth))
        _this.setData({
          'windowHeight': windowHeight +'rpx'
        })
        console.log(_this.data.windowHeight)
      }
    })
    
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
    this.getDepartment()
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
  // 性别选择框
  sexPickerChange: function(e) {
    this.setData({
      'userInfo.sex': this.data.sexArr[e.detail.value],
      pickerStyle: 'selected'
    })
  },
  // 分院选择框
  depPickerChange: function(e) {
    this.setData({
      'userInfo.department': this.data.departmentArr[e.detail.value],
      pickerStyle1: 'selected'
    })
  },
  // 名字
  nameInputChange: function(e){
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
  userInfoSubmit: function() {
    var that = this
    var app =getApp()
    var url = app.globalData.apiAddress
    wx.request({
      url: url+'/user/bindUserInfo', 
      method:'POST',
      data: {
        wxUserInfo: that.data.userInfo
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.data.code = 200){
          app.globalData.userInfo = res.data.userInfo
          wx.showToast({
            title: '信息完善成功',
            icon: 'success',
            duration: 2000
          })
          wx.switchTab({
            url: '../home2/home2',
          })
        }else{
          wx.showToast({
            title: '完善失败，请重新完善信息',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  // 获取系统中的分院信息
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
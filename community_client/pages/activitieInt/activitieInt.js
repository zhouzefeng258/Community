// pages/activitieInt/activitieInt.js
import Toast from '@vant/weapp/toast/toast'
import Notify from '@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actId: '',
    clunName: '',
    actInfo: {},
    btn_flag: true,
    clubInfo: {},
    userInfo: {},
    name: '',
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    this.setData({
      id: options.id,
      name: options.name
    })
    this.setData({
      'userInfo': app.globalData.userInfo
    })
    this.setData({
      'clubInfo': app.globalData.clubInfo
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
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    wx.request({
      url: url + '/activity/getActintro',
      method: 'POST',
      data: {
        actId: this.data.id,
        clubName: this.data.name
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code = 200) {
          console.log(res.data)
          that.setData({
            actInfo: res.data.list,
          })
          that.setData({
            ["actInfo.createdAt"]: that.dateFormat("YYYY-mm-dd HH:MM", that.data.actInfo.createdAt),
            ["actInfo.startTime"]: that.dateFormat("YYYY-mm-dd HH:MM", that.data.actInfo.startTime),
            ["actInfo.updatedAt"]: that.dateFormat("YYYY-mm-dd HH:MM", that.data.actInfo.updatedAt)
          })
          let yestDay = new Date();
          let flagbtn =
            wx.request({
              url: url + '/activitieEnroll/enquiryRegistration',
              method: 'POST',
              data: {
                studentId: that.data.userInfo.studentId,
                activityId: that.data.id,
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                if (res.data.code === 400) {
                  Notify({
                    type: 'danger',
                    message: res.data.message
                  })
                } else {
                  flagbtn = res.data.flag
                  yestDay.setTime(yestDay.getTime() - 24 * 60 * 60 * 1000);
                  if (that.data.actInfo.surplusNumber > 0 && that.data.actInfo.ActivityType ==='已结束') {
                    that.setData({
                      btn_flag: 2,
                    })
                  } else if ((that.data.actInfo.surplusNumber > 0 || that.data.actInfo.surplusNumber === 0 ) && flagbtn) {
                    that.setData({
                      btn_flag: 3,
                    })
                  } else if ( that.data.actInfo.surplusNumber === 0  && !flagbtn) {
                    that.setData({
                      btn_flag: 4,
                    })
                  }else {
                    that.setData({
                      btn_flag: 1,
                    })
                  }
                }
              }
            })
          console.log(f)

          console.log(that.data.actInfo)
        } else {
          Notify({
            type: 'danger',
            message: '获取数据失败'
          });
        }
      }
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
  onShareAppMessage: function () {

  },
  // 时间格式转换函数
  dateFormat: function (fmt, time) {
    // console.log(time)
    let date = new Date(time);
    // console.log(date)
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(), // 年
      "m+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "H+": date.getHours().toString(), // 时
      "M+": date.getMinutes().toString(), // 分
      "S+": date.getSeconds().toString() // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    console.log(fmt)
    return fmt;
  },
  // 日期比较函数
  compareDate: function (dateTime1, dateTime2) {
    var formatDate1 = new Date(dateTime1)
    var formatDate2 = new Date(dateTime2)
    if (formatDate1 < formatDate2) {
      return true
    } else {
      return false
    }
  },
  // 查询用户是否报名了该活动
  enquiryRegistration: function (studentId, actid) {
    var app = getApp()
    var url = app.globalData.apiAddress
    wx.request({
      url: url + '/activitieEnroll/enquiryRegistration',
      method: 'POST',
      data: {
        studentId: studentId,
        activityId: actid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code === 400) {
          Notify({
            type: 'danger',
            message: res.data.message
          })
          return true
        } else {
          return res.data.flag
        }
      }
    })
  },
  // 报名参加活动
  enroll: function () {
    console.log(this.data.clubInfo)
    let enrollData = {
      activityId: this.data.actInfo.activityId,
      activityName: this.data.actInfo.activityName,
      openid: this.data.userInfo.openid,
      name: this.data.userInfo.name,
      studentId: this.data.userInfo.studentId,
      clubId: this.data.clubInfo.clubId,
      clubName: this.data.clubInfo.clubName,
      startTime: this.data.actInfo.startTime,
      address: this.data.actInfo.address,
      ActivityType:this.data.actInfo.ActivityType,
    }
    this.addenroll(enrollData)
  },
  // 报名接口
  addenroll: function (enrollData) {
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    // this.subscribeToMessages()
    wx.request({
      url: url + '/activitieEnroll/enroll',
      method: 'POST',
      data: enrollData,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code === 400) {
          // Notify({ type: 'danger', message: res.data.message })
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
  },
  // 弹出社团所需要的订阅消息的同意界面
  subscribeToMessages: function () {
    let arr = ['pgACGkguR8rg61lrczC4VxxiwoPErgZIapypuerZL-A', 'tCMeGzCoCOrIK5o8uzVjp8IGh2x1kH12IbUT-tjgQFA', 'WU7lGPpY6XFwV4p7UtJzP3cVnTbaHrM8gslX12tfVsU']
    wx.requestSubscribeMessage({
      tmplIds: arr,
      success(res) {
        console.log(res)
      }
    })


  },
  //刷新页面需要的函数
  reast: function () {
    this.onShow()
  },
  // 取消报名的函数
  quitenroll:function(){
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    wx.request({
      url: url + '/activitieEnroll/deleteActivitieEnroll',
      method: 'POST',
      data: {
        openid:app.globalData.userInfo.openid,
        studentId:app.globalData.userInfo.studentId,
        activityId:that.data.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code === 400) {
          // Notify({ type: 'danger', message: res.data.message })
          // wx.showToast({
          //   title: res.data.message,
          //   icon: 'none',
          //   duration: 2000
          // })
          // Notify({ type: 'danger', message: res.data.message })
          wx.showToast({
            title: '服务器异常！', // 标题
            icon: 'success',  // 图标类型，默认success
            duration: 1500  // 提示窗停留时间，默认1500ms
          })
        } else {
          wx.showToast({
            title: '取消成功！', // 标题
            icon: 'success',  // 图标类型，默认success
            duration: 1500  // 提示窗停留时间，默认1500ms
          })
          that.onShow()
          // that.reast(that.data.actInfo.activityId,that.data.clubInfo.clubName)
        }
      }
    })
  }
})
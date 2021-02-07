// pages/home2/home2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    apiurl: '',
    news: [],
    swiperList:[]
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
        app.globalData.windowHeight = windowHeight+'rpx'
        console.log(windowHeight) //最后获得转化后得rpx单位的窗口高度
      }
    })
    wx.getSetting({
      withSubscriptions: true,
      success: (res) => {
        console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '../empower/empower'
          })
        } else {
          _this.wxlogin()
        }
      }
    })
    // wx.request({
    //   url: this.data.apiurl + '/news/geiNewsList',
    //   method: 'POST',
    //   data: {},
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //     if (res.data.code == 200) {
    //       _this.setData({
    //         news: res.data.list
    //       })
    //       let l = _this.data.news.length
    //       for(var i=0;i<l; i++){
    //         _this.setData({
    //           ['news['+i+'].createdAt']: _this.dateFormat("YYYY-mm-dd", _this.data.news[i].createdAt),
    //         })
    //       }
         
    //     } else {
    //       console.log('数据获取失败')
    //     }
    //     console.log(_this.data.news[0])
    //   }
    // })
    this.getLunbotuList()

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
    const _this = this
    // 获取app 
    var app = getApp()
    wx.request({
      url: this.data.apiurl + '/news/geiNewsList',
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 200) {
          _this.setData({
            news: res.data.list
          })
          let l = _this.data.news.length
          for(var i=0;i<l; i++){
            _this.setData({
              ['news['+i+'].createdAt']: _this.dateFormat("YYYY-mm-dd", _this.data.news[i].createdAt),
            })
          }
         
        } else {
          console.log('数据获取失败')
        }
        console.log(_this.data.news[0])
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
  // 时间格式转换
  dateFormat: function (fmt, time) {
    let date = new Date(time);
    console.log(date)
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
  // 跳转至新闻详情页面
  toNewsIntro: function (event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../newsContent/newsContent?id=' + id
    })
  },
  // 判断用户当前是否加入社团，已加入社团时，获取社团数据
  getClubInfo:function(clubName){
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    wx.request({
      url: url + '/clubinfo/getclubsInfo',
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
           app.globalData.clubInfo = res.data.list
        } else {
          Toast.fail('服务端异常,获取数据失败');
        }
      }
    })
  },
  wxlogin:function(event){
      var that = this
      var app = getApp()
      var url = app.globalData.apiAddress
      wx.login({
        success: function (res) {
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
              if (res.data.code == 1) {
                app.globalData.userInfo = res.data.list
                if(res.data.list.communityName !==''){
                  that.getClubInfo(res.data.list.communityName)
                }
              } else {
                wx.showModal({
                  title: '登陆失败',
                  content: '用户不存在，请授权并绑定信息',
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
  },
  // 获取轮播图列表
  getLunbotuList(){
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    wx.request({
      url: url + '/lunbotu/getLunbotuList',
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code === 400) {
          Notify({ type: 'danger', message: res.data.message })
        } else {
          let arr =[]
          for(let a in res.data.list){
              arr[a] = res.data.list[a].imagePath 
          }
          that.setData({
            swiperList:arr
          })
        } 
      }
    })
  }
})
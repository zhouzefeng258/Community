// pages/newsContent/newsContent.js
var WxParse = require('../../wxParse/wxParse.js') //引入富文本编辑器
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsData:{},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    var app = getApp()
    var url = app.globalData.apiAddress
    var that = this
    console.log(that)
    wx.request({
      url: url+'/news/getNews',
      method: 'POST',
      data: {
        'newsId': id
      },
      header: {
        'content-type': 'application/json'
      },
      success:  (res)=> {
       if(res.data.code === 200){
         this.setData({
           newsData: res.data.list,
         })
         this.setData({
           ['newsData.createdAt']: this.dateFormat("YYYY-mm-dd", this.data.newsData.createdAt),
         })
        //  console.log(that.data.newsData)
         WxParse.wxParse('article', 'html', that.data.newsData.newsContent, this, 5)
       }else{
         Notify({ type: 'warning', message: '数据获取失败' });
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
  // 时间转换函数
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
})
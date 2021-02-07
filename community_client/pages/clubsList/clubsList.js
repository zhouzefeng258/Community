// pages/clubsList/clubsList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubInfoList: [],
    searchData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取社团列表
    this.getClubList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.clubInfoList)
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
  // 跳转至加入社团页面
  toClubInfo: function (event) {
    var id = event.currentTarget.dataset.clubid
    console.log(id)
    wx.navigateTo({
      url: '../clubIntroduction/clubIntroduction?id=' + id,
    })
  },
  // 社团搜索
  searchClub: function () {
    // 获取社团列表
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    wx.request({
      url: url + '/clubinfo/searchClubList',
      method: 'POST',
      data: {
        clubName: that.data.searchData
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res.data)
          that.setData({
            clubInfoList: res.data.list,
          })
        } else {
          Toast.fail('获取数据失败');
        }
      }
    })
  },
  serch: function (e) {
    this.setData({
      searchData: e.detail
    })
     if(this.data.searchData ==''){
       console.log(11111)
       this.getClubList()
     }else{
       this.searchClub(e)
     }
  },
  getClubList: function () {
    var that = this
    var app = getApp()
    var url = app.globalData.apiAddress
    wx.request({
      url: url + '/clubinfo/getClubList',
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code = 200) {
          console.log(res.data)
          that.setData({
            clubInfoList: res.data.list,
          })
        } else {
          Toast.fail('获取数据失败');
        }
      }
    })
  }
})
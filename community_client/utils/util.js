const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getWxUserInfo = function (openid){
  var that = this
  var app = getApp()
  var url = app.globalData.apiAddress
  wx.request({
    url: url + '/user/geiMyUserInfo',
    method: 'POST',
    data: {
      openid: openid,
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      
      if (res.data.code = 200) {
        app.globalData.userInfo = res.data.list
        console.log('u到了')
      } else {
        wx.showToast({
          title: '获取新的用户信息失败',
          icon: 'none',
          duration: 2000
        })
      }
    }
  })
} 

module.exports = {
  formatTime: formatTime,
  getWxUserInfo:getWxUserInfo
}

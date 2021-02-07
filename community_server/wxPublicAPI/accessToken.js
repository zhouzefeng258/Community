const request = require('request')

// 获取微信接口调用凭证
const APPID = 'wxfbb52b90dac5119b'
const APPSECRET = 'ed5709fa715a183d5a251125f9672e96'
let expires_in = 0


function getWxAccessToken () {
  var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APPID + '&secret=' + APPSECRET
  request.get(url, function (error, response, body) {
    // console.log(response)
    if (response.body) {
      let data = JSON.parse(response.body)
      expires_in = data.expires_in
      global.access_token = data.access_token
    } else {
      console.log(response)
    }
  })
}

async function getToken () {
  await getWxAccessToken()
  setInterval(function () {
    console.log('重新获取')
    getWxAccessToken()
  }, 7200000)
}

exports.getToken = getToken

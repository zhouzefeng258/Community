const request = require('request')

// 活动报名成功时调用
function enrollmentSuccessMessage (openid, data) {
  let flag
  let url = "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=" + global.access_token
  let requestData = {
    touser: openid,
    template_id: 'pgACGkguR8rg61lrczC4VxxiwoPErgZIapypuerZL-A',
    data: data
  }
  request({
    url: url,
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json",
    },
    body: requestData
  }, function (error, response, body) {
    console.log(body)
    if (body.errcode === 0) {
      console.log(1)
      flag = true
    } else {
      console.log(2)
      flag = false

    }
  })
  return flag
}



module.exports = {
  enrollmentSuccessMessage: enrollmentSuccessMessage
}

var express = require('express');
var router = express.Router();
// var User = require('../model/index').user
var user = require('../model/index').wxUser
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')

// 实验接口
router.get('/hhh', function (req, res, next) {
  res.send({
    code: 1
  })
});

// 完善信息接口
router.post('/bindUserInfo', function (req, res, next) {
  console.log(req.body.wxUserInfo)
  var wxUserInfo = req.body.wxUserInfo
  if (wxUserInfo.name === '' || wxUserInfo.class === '' || wxUserInfo.nickName === '' || wxUserInfo.sex === '' || wxUserInfo.department === '' || wxUserInfo.avatarUrl === '' || wxUserInfo.studentId === '' || wxUserInfo.APP_ID === '' || wxUserInfo.APP_SECRET === '' || wxUserInfo.CODE === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }

  var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + wxUserInfo.APP_ID + '&secret=' + wxUserInfo.APP_SECRET + '&js_code=' + wxUserInfo.CODE + '&grant_type=authorization_code'
  request.get(url, function (error, response, body) {
    if (response.statusCode == 200) {
      // 请求成功的处理逻辑
      console.log(body)
      console.log(JSON.parse(body).openid)
      wxUserInfo.openid = JSON.parse(body).openid
      console.log(wxUserInfo.openid)
      user
        .findOrCreate({ where: { openid: wxUserInfo.openid, studentId: wxUserInfo.studentId }, defaults: { openid: wxUserInfo.openid, class: wxUserInfo.class, nickName: wxUserInfo.nickName, sex: wxUserInfo.sex, department: wxUserInfo.department, avatarUrl: wxUserInfo.avatarUrl, studentId: wxUserInfo.studentId, name: wxUserInfo.name } })
        .then(([user, created]) => {
          if (created) {
            res.send({
              code: 200,
              message: '登记成功，您已可以使用小程序',
              userInfo: user
            })
          } else {
            res.send({
              code: 400,
              message: '该用户已存在'
            })
          }
        })
    } else {
      res.send({
        code: 400,
        message: "微信官方接口请求失败",
        errMessage: response.errmsg
      })
    }
  })

})

// 用户登陆接口
router.post('/wxLogin', (req, res, next) => {
  if (req.body.APP_ID === '' || req.body.APP_SECRET === '' || req.body.CODE === '') {
    res.send({
      code: 400,
      message: '请求参数不全'
    })
  } else {
    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + req.body.APP_ID + '&secret=' + req.body.APP_SECRET + '&js_code=' + req.body.CODE + '&grant_type=authorization_code'
    request.get(url, function (error, response, body) {
      if (response.statusCode == 200) {
        // 请求成功的处理逻辑
        var openid = JSON.parse(body).openid
        user.findOne({
          where: {
            openid: openid,
          }
        }).then(data => {
          if (data != null) {
            res.send({
              code: 1,
              message: '登陆成功',
              list: data
            })
          } else {
            res.send({
              code: 0,
              message: '登陆失败,该用户不存在'
            })
          }
        })

      }
    })
  }
})

// 更新信息接口
router.post('/updatedUser', (req, res, next) => {
  console.log(req.body)
  var wxUserInfo = req.body
  if (wxUserInfo.id === '' || wxUserInfo.name === '' || wxUserInfo.class === '' || wxUserInfo.sex === '' || wxUserInfo.department === '' || wxUserInfo.studentId === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  user.update({ name: wxUserInfo.name, class: wxUserInfo.class, sex: wxUserInfo.sex, department: wxUserInfo.department, studentId: wxUserInfo.studentId }, { where: { id: wxUserInfo.id } }).then(data => {
    if (data) {
      console.log(data)
      res.send({
        code: 200,
        message: '更新成功'
      })
    } else {
      res.send({
        code: 400,
        message: '更新失败'
      })
    }
  })

})

// 获取个人信息
router.post('/geiMyUserInfo', (req, res, next) => {
  if (req.body.openid === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  user.findOne({
    where: {
      openid: req.body.openid,
    }
  }).then(data => {
    if (data != '') {
      res.send({
        code: 200,
        message: '用户信息获取成功',
        list: data,
      })
    } else {
      res.send({
        code: 400,
        message: '数据获取失败',
      })
    }
  })
})
// 获取社团用户接口
router.post('/getClubMembers', (req, res, next) => {
  console.log(req.body)
  if (req.body.clubName === "") {
    res.send({
      code: 400,
      message: "参数不全"
    })
  }
  user.findAll({ where: { communityName: req.body.clubName } }).then(data => {
    if (data) {
      res.send({
        code: 200,
        message: "数据获取成功",
        list: data
      })
    } else (
      res.send({
        code: 400,
        message: '数据获取失败'
      })
    )

  })
})


// 退出社团 需要订阅消息
router.post('/quitClub', (req, res, next) => {
  console.log(req.body)
  if (req.body.data.clubName === '' || req.body.data.openid === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  user.update({ communityName: '' }, { where: { communityName: req.body.data.clubName, openid: req.body.data.openid } }).then(data => {
    if (data) {
      res.send({
        code: 200,
        message: '退出社团成功'
      })
    } else {
      res.send({
        code: 400,
        message: '操作失败'
      })
    }
  }).catch(err => {
    console.log(err)
  })

})

module.exports = router;
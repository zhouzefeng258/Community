var express = require('express');
var router = express.Router();
var activity = require('../model/index').activity
var clubInfo = require('../model/index').clubinfo
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')

// 获取正在进行中的对应社团的活动列表
router.post('/getActivity', (req, res, next) => {
  console.log(req.body)
  if (req.body.clubName === '') {
    res.send({
      code: 400,
      message: '缺少参数',
    })
  }
  let now = new Date()
  activity.findAll({ where: { clubName: req.body.clubName, ActivityType: '进行中', startTime: { [Op.gt]: now } } }).then(data => {
    console.log(data)
    if (data) {
      res.send({
        code: 200,
        message: '数据获取成功',
        list: data
      })
    } else {
      res.send({
        code: 400,
        message: '数据获取失败',
      })
    }
  }).catch(err => {
    console.log(err)
  })
})
// 获取社团界面的详细信息;
router.post('/getActintro', (req, res, next) => {
  if (req.body.actId === '' || req.body.clubName === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  var clubinfo = {}
  var list = {}
  var f = false
  clubInfo.findOne({ where: { clubName: req.body.clubName } }).then(data => {
    if (data != '') {
      clubinfo = data.dataValues
      f = true
    } else {
      f = false
    }
  })
  activity.findOne({ where: { activityId: req.body.actId } }).then(data => {
    if (data != '' && f) {
      list = data.dataValues
      list.clubinfo = clubinfo
      console.log(111111)
      res.send({
        code: 200,
        message: '数据请求成功',
        list: list
      })

    } else {
      res.send({
        code: 400,
        message: '数据请求失败'
      })
    }
  })

})
// 根据活动id查找活动
// router.post('/getOneAvt', (req, res, next) => {
//   console.log(req.body)
//   if (req.body.actId === '' || req.body.actType === '') {
//     res.send({
//       code: 400,
//       message: '缺少参数',
//     })
//   }
//   activity.findOne({ where: { activityId: req.body.actId, ActivityType: req.body.actType } }).then(data => {
//     if (data) {
//       console.log(data)
//       res.send({
//         code: 200,
//         message: '数据获取成功',
//         list: data
//       })
//     } else {
//       res.send({
//         code: 400,
//         message: '数据获取失败',
//       })
//     }
//   })
// })
router.post('/getOneAvt', (req, res, next) => {
  console.log(req.body)
  if (req.body.actId === '') {
    res.send({
      code: 400,
      message: '缺少参数',
    })
  }
  activity.findOne({ where: { activityId: req.body.actId } }).then(data => {
    if (data) {
      console.log(data)
      res.send({
        code: 200,
        message: '数据获取成功',
        list: data
      })
    } else {
      res.send({
        code: 400,
        message: '数据获取失败',
      })
    }
  })
})


// 根据活动名来搜索活动
router.post('/searchActList', function (req, res, next) {
  console.log(req.body)
  if (req.body.clubName === "") {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  let serchdata = {}
  let now = new Date()
  serchdata['clubName'] = { $like: req.body.clubName }
  serchdata['startTime'] = { [Op.gt]: now }
  if (req.body.activityName !== '') {
    serchdata['activityName'] = { $like: '%' + req.body.activityName + '%' }
  }
  activity.findAll({ where: serchdata }).then(data => {
    if (data) {
      res.send({
        code: 200,
        message: '列表获取成功',
        list: data,
      })
    } else {
      res.send({
        code: 400,
        message: '搜索失败'
      })
    }
  })
})




module.exports = router;
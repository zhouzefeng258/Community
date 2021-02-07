var express = require('express');
var router = express.Router();
var clubinfo = require('../model/index').clubinfo
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')

// 获取社团列表
router.post('/getClubList', function (req, res, next) {
  clubinfo.findAll({ where: { show: 1 } }).then(data => {
    // console.log(data)
    if (data != '') {
      res.send({
        message: '数据获取成功',
        code: 200,
        list: data,
      })
    } else {
      res.send({
        message: '数据获取失败',
        code: 400,
      })
    }
  })
})
// 获取单个社团信息 根据社团名获取
router.post('/getclubsInfo', function (req, res, next) {
  console.log(req.body)
  if (req.body.clubName === "") {
    console.log(333)
    res.send({
      message: "缺少参数",
      code: 400,
    })
  } else {
    clubinfo.findOne({ where: { clubName: req.body.clubName, show: 1 } }).then(data => {
      if (data != '') {
        console.log(222)
        res.send({
          message: "获取成功",
          code: 200,
          list: data
        })
      } else {
        console.log(1111)
        res.send({
          message: '获取异常',
          code: 400,
        })
      }
    })
  }

})
// 获取单个社团信息 根据社团id获取
router.post('/getclubsInfoById', function (req, res, next) {
  if (req.body.id === "") {
    console.log(333)
    res.send({
      message: "缺少参数",
      code: 400,
    })
  } else {
    clubinfo.findOne({ where: { clubId: req.body.id, show: 1 } }).then(data => {
      if (data != '') {
        console.log(222)
        res.send({
          message: "获取成功",
          code: 200,
          list: data
        })
      } else {
        console.log(1111)
        res.send({
          message: '获取异常',
          code: 400,
        })
      }
    })
  }

})
// 根据社团名称来搜索社团
router.post('/searchClubList', function (req, res, next) {
  console.log(req.body)
  if (req.body.clubName === "") {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  let serchdata = {}
  serchdata['clubName'] = { $like: '%' + req.body.clubName + '%' }
  serchdata['show'] = { $like: 1 }
  clubinfo.findAll({ where: serchdata }).then(data => {
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

// 给社团评分
router.post('/strikingStars', (req, res, next) => {

  let { clubId, starTotal, star, evaluationTimes } = req.body.data
  if (clubId === '' || starTotal === '' || star === '' || evaluationTimes === '') {
    res.send({
      code: 400,
      message: "参数不全"
    })
  }
  let s = Number(starTotal) + Number(star)
  let t = Number(evaluationTimes) + 1
  clubinfo.update({ starTotal: s, evaluationTimes: t }, { where: { clubId: clubId } }).then(data => {
    if (data) {
      res.send({
        code: 200,
        message: '评价成功',
        flag: true
      })
    } else {
      res.send({
        code: 400,
        message: '评价失败'
      })
    }
  }).catch(err => {
    console.log(err)
  })

})


module.exports = router;


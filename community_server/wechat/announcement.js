var express = require('express');
var router = express.Router();
var announcement = require('../model/index').announcement
var user = require('../model/index').wxUser
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')

//获取公告列表
router.post('/getAnnouncementList', (req, res, next) => {
  console.log(req.body)
  if (req.body.clubName === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  announcement
    .findAll({
      where: {
        clubName: req.body.clubName,
        isTop: 0
      }
    })
    .then(result => {
      if (result) {
        console.log(result)
        res.send({
          code: 200,
          message: '获取数据成功',
          list: result
        })
      }
    }).catch(data => {
      console.log(data)
    })
})
//获取置顶公告
router.post('/getTopAnnouncement', (req, res, next) => {
  console.log(req.body)
  if (req.body.clubName === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  announcement
    .findOne({
      where: {
        clubName: req.body.clubName,
        isTop: 1
      }
    })
    .then(result => {
      if (result) {
        console.log(result)
        res.send({
          code: 200,
          message: '获取数据成功',
          list: result
        })
      } else {
        res.send({
          code: 201,
          message: '暂无数据'
        })
      }
    }).catch(data => {
      console.log(data)
    })
})
// 获取单个公告
router.post('/getAnnouncement', (req, res, next) => {
  if (req.body.id === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  announcement
    .findOne({
      where: { id: req.body.id },
    })
    .then(result => {
      if (result) {
        console.log(result.rows)
        res.send({
          code: 200,
          message: '获取数据成功',
          list: result
        })
      }
    }).catch(data => {
      console.log(data)
    })
})

module.exports = router;
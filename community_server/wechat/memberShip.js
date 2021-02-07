var express = require('express');
var router = express.Router();
var memberShip = require('../model/index').memberShip
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')

// 社团申请
router.post('/joinClub', (req, res, next) => {
  if (req.body.name === '' || req.body.clubName === '' || req.body.studentId === '' || req.body.reason === '' || req.body.openid === '') {
    res.send({
      code: 400,
      message: "参数不全"
    })
  }
  let messageBody = {
    "thing2": {
      "value": req.body.activityName
    },
    "thing5": {
      "value": req.body.address
    },
    "thing9": {
      "value": req.body.clubName
    },
    "date4": {
      "value": req.body.startTime
    }
  }
  memberShip.findOrCreate({ where: { clubName: req.body.clubName, studentId: req.body.studentId, type: '待审批' }, defaults: { name: req.body.name, studentId: req.body.studentId, clubName: req.body.clubName, openid: req.body.openid, reason: req.body.reason, type: '待审批' } }).
    then(([memberShip, created]) => {
      if (created) {
        res.send({
          code: 200,
          message: "申请成功",
          id: memberShip.id
        })

      } else {
        res.send({
          code: 400,
          message: "申请失败,不能重复申请同一社团"
        })
      }
    })
})
// 取消社团申请
router.post('/withdraw', (req, res, next) => {
  if (req.body.studentId === '' || req.body.clubName === '') {
    res.send({
      code: 400,
      message: '参数错误'
    })
  }
  memberShip.findOne({ where: { studentId: req.body.studentId, clubName: req.body.clubName, type: '待审批' } }).then(data => {
    if (data) {
      memberShip.update({ type: '已取消' }, { where: { studentId: req.body.studentId, clubName: req.body.clubName, type: '待审批' } }).then(data => {
        if (data) {
          res.send({
            code: 200,
            message: '取消成功'
          })
        } else {
          res.send({
            code: 400,
            message: '取消失败',
          })
        }
      }).catch(err => {
        console.log(err)
        res.send({
          code: 500,
          message: err
        })
      })
    } else {
      res.send({
        code: 400,
        message: '未有可取消的申请',
      })
    }
  }).catch(err => {
    console.log(err)
    res.send({
      code: 500,
      message: err
    })
  })
})
// 查询我是否正在申请该社团
router.post('/queryApplication', (req, res, next) => {
  if (req.body.studentId === '' || req.body.clubName === '') {
    res.send({
      code: 400,
      message: '参数错误'
    })
  }
  memberShip.findOne({ where: { studentId: req.body.studentId, clubName: req.body.clubName, type: '待审批' } }).then(data => {
    if (data) {
      res.send({
        code: 200,
        message: '存在',
        flag: true
      })
    } else {
      res.send({
        code: 200,
        message: '不存在',
        flag: false
      })
    }
  }).catch(err => {
    console.log(err)
    res.send({
      code: 500,
      message: err
    })
  })
})


module.exports = router;
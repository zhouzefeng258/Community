var express = require('express');
var router = express.Router();
var activity = require('../model/index').activity
var clubInfo = require('../model/index').clubinfo
var user = require('../model/index').wxUser
var activitieEnroll = require('../model/index').activitieEnroll
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')
var wxPublicAPi = require('../wxPublicAPI/wxPublicAPi')


// 更新活动中的剩余人数信息的函数
function updateRemaining (activityId, type) {
  let surplusNumber
  let f = activity.findOne({ where: { activityId: activityId } }).then(data => {
    if (data) {
      surplusNumber = Number(data.surplusNumber)
      totalNumber = Number(data.totalNumber)
      if (type === 1) {
        if (totalNumber < surplusNumber + 1) {
          return false
        }
        surplusNumber = surplusNumber + 1
      } else if (type === -1) {
        if (surplusNumber - 1 < 0) {
          return false
        }
        surplusNumber = surplusNumber - 1
      }
      let f2 = activity.update({ surplusNumber: surplusNumber }, { where: { activityId: activityId } }).then(data => {
        if (data) {
          return true
        } else {
          return false
        }
      }).catch(err => {
        console.log(err)
        return false
      })
      return f2
    } else {
      console.log('出现异常')
      return false
    }
  }).catch(err => {
    console.log(err)
    return false
  })
  return f
}

// 添加报名信息
router.post('/enroll', (req, res, next) => {
  if (req.body.activityId === '' || req.body.activityName === '' || req.body.name === '' || req.body.clubId === '' || req.body.clubName === '' || req.body.ActivityType === '' || req.body.studentId === '' || req.body.openid === '' || req.body.startTime === '' || req.body.address === '') {
    res.send({
      code: 400,
      message: "参数不全"
    })
  }
  // let messageBody = {
  //   "thing2": {
  //     "value": req.body.activityName
  //   },
  //   "thing5": {
  //     "value": req.body.address
  //   },
  //   "thing9": {
  //     "value": req.body.clubName
  //   },
  //   "date4": {
  //     "value": req.body.startTime
  //   }
  // }
  activitieEnroll.findOrCreate({ where: { activityId: req.body.activityId, studentId: req.body.studentId }, defaults: { activityId: req.body.activityId, activityName: req.body.activityName, name: req.body.name, clubId: req.body.clubId, clubName: req.body.clubName, openid: req.body.openid, ActivityType: req.body.ActivityType, startTime: req.body.startTime } }).
    then(([record, created]) => {
      if (created) {
        let f = updateRemaining(req.body.activityId, -1)
        console.log(f)
        // wxPublicAPi.enrollmentSuccessMessage(req.body.openid, messageBody)
        res.send({
          code: 200,
          message: "报名成功",
          id: record.recordId
        })
      } else {
        res.send({
          code: 400,
          message: "报名失败,不能重复报名同一活动"
        })
      }
    })
})
// 获得我的报名记录
router.post('/getMyRecord', (req, res, next) => {
  console.log(req.body)
  if (req.body.studentId === '' || req.body.actType === '') {
    res.send({
      code: 400,
      message: '缺少参数'
    })
  } else {
    activitieEnroll.findAll({ where: { studentId: req.body.studentId, ActivityType: req.body.actType } }).then(data => {
      if (data) {
        res.send({
          code: 200,
          message: '数据获取成功',
          list: data
        })
      } else {
        res.send({
          code: 400,
          message: '数据获取失败'
        })
      }
    })
  }

})
// 查询我是否报名了某活动
router.post('/enquiryRegistration', (req, res, next) => {
  if (req.body.studentId === '' || req.body.activityId === '') {
    res.send({
      code: 400,
      message: '缺少参数'
    })
  } else {
    activitieEnroll.findOne({ where: { studentId: req.body.studentId, activityId: req.body.activityId } }).then(data => {
      if (data) {
        res.send({
          code: 200,
          message: '已报名',
          flag: true,
        })
      } else {
        res.send({
          code: 200,
          message: '未报名',
          flag: false,
        })
      }
    }).catch(err => {
      res.send({
        code: 400,
        message: '查询失败'
      })
    })
  }
})

// 取消活动报名
router.post('/deleteActivitieEnroll', (req, res, next) => {
  let { openid, studentId, activityId } = req.body
  console.log(req.body)
  if (studentId === '' || activityId === '' || openid === '') {
    res.send({
      code: 400,
      message: '参数错误'
    })
  }
  activitieEnroll.destroy({
    where: {
      studentId: studentId,
      activityId: activityId
    }
  }).then(async data => {
    if (data) {
      let flag = await updateRemaining(activityId, 1)
      console.log(flag)
      if (flag) {
        res.send({
          code: 200,
          message: '删除成功'
        })
      } else {
        res.send({
          code: 400,
          message: '删除失败，系统异常'
        })
      }

    } else {
      res.send({
        code: 400,
        message: '删除失败'
      })
    }
  }).catch(error => {
    res.send({
      code: 400,
      message: '删除失败',
      err: error
    })
  })
})

module.exports = router;
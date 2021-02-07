var express = require('express');
var router = express.Router();
var activity = require('../model/index').activity
var clubInfo = require('../model/index').clubinfo
var user = require('../model/index').wxUser
var activitieEnroll = require('../model/index').activitieEnroll
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')


// 更新活动中的剩余人数信息的函数
function updateRemaining (activityId, type) {
  let surplusNumber
  let f = activity.findOne({ where: { activityId: activityId } }).then(data => {
    if (data) {
      surplusNumber = Number(data.surplusNumber)
      totalNumber = Number(data.totalNumber)
      if (type === 1) {
        if (totalNumber < surplusNumber + 1) {
          surplusNumber = totalNumber
        }
        surplusNumber = surplusNumber + 1
      } else {
        if (surplusNumber - 1 < 0) {
          surplusNumber = 0
        }
        surplusNumber = surplusNumber - 1
      }
      let f2 = activity.update({ surplusNumber: surplusNumber }, { where: { activityId: activityId } }).then(data => {
        console.log(data + '1')
        if (data) {
          console.log('执行了这里3')
          return true
        } else {
          console.log('执行了这里4')
          return false
        }
      }).catch(err => {
        console.log(err)
        console.log('执行了这里7')
        return false
      })
      return f2
    } else {
      console.log('出现异常')
      console.log('执行了这里6')
      return false
    }
  }).catch(err => {
    console.log(err)
    console.log('执行了这里5')
    return false
  })
  return f
}
// 获取活动信息
// function getActinfo (activityId) { 
//   actInfo
// }
// 添加报名信息
// router.post('/enroll', (req, res, next) => {
//   if (req.body.activityId === '' || req.body.activityName === '' || req.body.name === '' || req.body.clubId === '' || req.body.clubName === '' || req.body.ActivityType === '' || req.body.studentId === '') {
//     res.send({
//       code: 400,
//       message: "参数不全"
//     })
//   }
//   activitieEnroll.findOrCreate({ where: { activityId: req.body.activityId, studentId: req.body.studentId }, defaults: { activityId: req.body.activityId, activityName: req.body.activityName, name: req.body.name, clubId: req.body.clubId, clubName: req.body.clubName, ActivityType: req.body.ActivityType } }).
//     then(([record, created]) => {
//       if (created) {
//         res.send({
//           code: 200,
//           message: "报名成功",
//           id: record.recordId
//         })
//       } else {
//         res.send({
//           code: 400,
//           message: "报名失败，不允许重复报名同一个项目"
//         })
//       }
//     })
// })
// 获得我的报名记录
// router.post('/getMyRecord', (req, res, next) => {
//   if (req.body.studentId == "") {
//     res.send({
//       code: 400,
//       message: '缺少参数'
//     })
//   } else {
//     activitieEnroll.findAll({ where: { studentId: req.body.studentId } }).then(data => {
//       if (data) {
//         res.send({
//           code: 200,
//           message: '数据获取成功',
//           list: data
//         })
//       } else {
//         res.send({
//           code: 400,
//           message: '数据获取失败'
//         })
//       }
//     })
//   }

// })
// 查询我是否报名了某活动
// router.post('/enquiryRegistration', (req, res, next) => {
//   if (req.body.studentId == "" || req.body.activityId) {
//     res.send({
//       code: 400,
//       message: '缺少参数'
//     })
//   } else {
//     activitieEnroll.findOne({ where: { studentId: req.body.studentId, activityId: req.body.activityId } }).then(data => {
//       if (data) {
//         res.send({
//           code: 1,
//           message: '已报名',
//           flag: true,
//         })
//       } else {
//         res.send({
//           code: 2,
//           message: '未报名',
//           flag: false,
//         })
//       }
//     })
//   }
// })
// 获取活动记录数据表
router.post('/getActivitieEnrollList', (req, res, next) => {
  const currentPage = req.body.currentPage
  const pagesize = req.body.pagesize
  const serchData = req.body.serchData
  if (currentPage === '' || pagesize === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  let serchdata = {}
  if (serchData.activityName != '') {
    serchdata['activityName'] = { $like: '%' + serchData.activityName + '%' }
  }
  if (serchData.clubName != '') {
    serchdata['clubName'] = { $like: '%' + serchData.clubName + '%' }
  }
  if (serchData.clubName != '') {
    serchdata['name'] = { $like: '%' + serchData.name + '%' }
  }
  if (serchData.studentId != '') {
    serchdata['studentId'] = { $like: '%' + serchData.studentId + '%' }
  }
  activitieEnroll
    .findAndCountAll({
      where: serchdata,
      offset: (currentPage - 1) * pagesize,
      limit: pagesize
    })
    .then(result => {
      if (result) {
        console.log(result.rows)
        res.send({
          code: 200,
          total: result.count,
          currentPage: currentPage,
          pagesize: pagesize,
          list: result.rows
        })
      }
    }).catch(data => {
      console.log(data)
    })
})
// 删除活动记录
router.post('/deleteActivitieEnroll', (req, res, next) => {
  let { id, activityId } = req.body
  console.log(req.body)
  if (id === '' || activityId === '') {
    res.send({
      code: 400,
      message: '您没有选择要删除的数据'
    })
  }
  activitieEnroll.destroy({
    where: {
      recordId: id
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
// 编辑活动记录信息
// router.post('/updatedActivitieEnroll', (req, res, next) => {
//   let { recordId, activityId, activityName, name, studentId, clubId, clubName, ActivityType } = req.body.activitieEnroll
//   if (recordId === '' || activityId === '' || activityName === '' || name === '' || clubId === '' || clubName === '' || ActivityType === '' || studentId === '') {
//     res.send({
//       code: 400,
//       message: "参数不全"
//     })
//   }
//   activitieEnroll.update({ activityId: activityId, activityName: activityName, name: name, clubId: clubId, clubName: clubName, ActivityType: ActivityType, studentId: studentId }, { where: { recordId: recordId } }).
//     then(([record, created]) => {
//       if (created) {
//         res.send({
//           code: 200,
//           message: "更新数据成功",
//           id: record.recordId
//         })
//       } else {
//         res.send({
//           code: 400,
//           message: "更新失败"
//         })
//       }
//     })
// })


module.exports = router;
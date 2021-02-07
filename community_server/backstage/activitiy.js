var express = require('express');
var router = express.Router();
var activity = require('../model/index').activity
var clubInfo = require('../model/index').clubinfo
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')


// 增加活动
router.post('/addActivity', (req, res, next) => {
  if (req.body.activityInfo === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  let { activityName, activityImage, clubName, ActivityLeader, startTime, address, ActivityIntro, totalNumber } = req.body.activityInfo
  activity.findOrCreate({ where: { activityName: activityName }, defaults: { activityName: activityName, activityImage: activityImage, clubName: clubName, ActivityLeader: ActivityLeader, startTime: startTime, address: address, ActivityIntro: ActivityIntro, totalNumber: totalNumber, surplusNumber: totalNumber, ActivityType: '进行中', approvalStatus: '待审批' } }).then(([data, created]) => {
    if (created) {
      res.send({
        code: 200,
        message: "添加成功",
        data: data.activityId
      })
    } else {
      res.send({
        code: 400,
        message: '添加失败'
      })
    }
  }).catch(err => {
    console.log(err)
    res.send({
      code: 400,
      message: '系统异常'
    })
  })
})
// 审批活动
router.post('/activityApproval', (req, res, next) => {
  if ((req.body.approvalStatus !== '已通过' || req.body.approvalStatus !== '未通过') && req.body.activityId === '') {
    res.send({
      code: 400,
      message: "参数错误"
    })
  }
  activity.update({ approvalStatus: req.body.approvalStatus }, { where: { activityId: req.body.activityId } }).then(data => {
    if (data) {
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
// 获取活动列表
router.post('/getActivityList', (req, res, next) => {
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
  if (serchData.ActivityLeader != '') {
    serchdata['ActivityLeader'] = { $like: '%' + serchData.ActivityLeader + '%' }
  }
  if (serchData.ActivityType != '') {
    serchdata['ActivityType'] = { $like: serchData.ActivityType }
  }
  if (serchData.approvalStatus != '') {
    if (serchData.approvalStatus === '其他') {
      serchdata['approvalStatus'] = { [Op.or]: ['已通过', '未通过'] }
    } else {
      serchdata['approvalStatus'] = { $like: serchData.approvalStatus }
    }
  }
  activity
    .findAndCountAll({
      where: serchdata,
      offset: (currentPage - 1) * pagesize,
      limit: pagesize
    })
    .then(result => {
      if (result) {
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
// 删除活动
router.post('/deleteActivity', (req, res, next) => {
  let id = Number(req.body.id)
  if (id === '') {
    res.send({
      code: 400,
      message: '您没有选择要删除的数据'
    })
  }
  activity.destroy({
    where: {
      activityId: id
    }
  }).then(data => {
    if (data) {
      res.send({
        code: 200,
        message: '删除成功'
      })
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
// 更新活动数据
router.post('/updatedActivity', (req, res, next) => {
  if (req.body.activityInfo === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  let { activityId, activityName, activityImage, clubName, ActivityLeader, startTime, address, ActivityIntro, totalNumber, surplusNumber, ActivityType, approvalStatus } = req.body.activityInfo
  activity.update({ activityName: activityName, activityImage: activityImage, clubName: clubName, ActivityLeader: ActivityLeader, startTime: startTime, address: address, ActivityIntro: ActivityIntro, totalNumber: totalNumber, surplusNumber: surplusNumber, ActivityType: ActivityType, approvalStatus: approvalStatus }, { where: { activityId: activityId } }).then((data) => {
    if (data) {
      res.send({
        code: 200,
        message: "更新成功",
        data: data.activityId
      })
    } else {
      res.send({
        code: 400,
        message: '更新失败'
      })
    }
  }).catch(err => {
    console.log(err)
    res.send({
      code: 400,
      message: '系统异常'
    })
  })
})

module.exports = router;
var express = require('express')
var router = express.Router()

var communityApproval = require('../backstage/communityApproval')
var communityInfo = require('../backstage/communityInfo')
var admin = require('../backstage/admin')
var news = require('../backstage/news')
var activity = require('../backstage/activitiy')
var wxUser = require('../backstage/user')
var activitieEnroll = require('../backstage/activitieEnroll')
var memberShip = require('../backstage/memberShip')
var lunbotu = require('../backstage/lunbotu')
var announcement = require('../backstage/announcement')
var proposal = require('../backstage/proposal')
var other = require('../backstage/other')

// 后台管理账户有关接口
router.use('/admin', admin)
// 社团创建和审批的相关接口
router.use('/communityApproval', communityApproval)
// 社团列表相关接口
router.use('/communityInfo', communityInfo)
// 新闻列表相关接口
router.use('/news', news)
// 活动模块相关接口
router.use('/activitiy', activity)
// 报名记录模块相关接口
router.use('/activitieEnroll', activitieEnroll)
// 用户管理模块相关接口
router.use('/wxUser', wxUser)
// 社团申请表相关接口
router.use('/memberShip', memberShip)
// 轮播图相关
router.use('/lunbotu', lunbotu)
// 社团公告相关
router.use('/announcement', announcement)
// 提交反馈相关接口
router.use('/proposal', proposal)
// 社团类型，部门相关接口
router.use('/other', other)

module.exports = router;
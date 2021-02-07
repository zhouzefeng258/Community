// 所有的微信接口在此路由

var express = require('express')
var router = express.Router()


var wxUser = require('../wechat/user')
var clubInfo = require('../wechat/clubInfo')
var activity = require('../wechat/activity')
var news = require('../wechat/news')
var activitieEnroll = require('../wechat/activitieEnroll')
var memberShip = require('../wechat/memberShip')
var lunbotu = require('../wechat/lunbotu')
var proposal = require('../wechat/proposal')
var announcement = require('../wechat/announcement')
var other = require('../wechat/other')

// 微信用户相关接口
router.use('/user', wxUser)
// 社团信息相关接口
router.use('/clubinfo', clubInfo)
// 活动信息相关接口
router.use('/activity', activity)
// 新闻相关接口
router.use('/news', news)
// 报名记录相关接口
router.use('/activitieEnroll', activitieEnroll)
// 社团报名相关接口
router.use('/memberShip', memberShip)
// 轮播图相关
router.use('/lunbotu', lunbotu)
// 提交反馈相关接口
router.use('/proposal', proposal)
// 社团公告相关接口
router.use('/announcement', announcement)
// 社团类型，部门相关接口
router.use('/other', other)


module.exports = router;
var sequelize = require('../db/dbConfig').sequelize()
var admin = sequelize.import('../model/admin.js')
var wxUser = sequelize.import('../model/wxUser.js')
var clubinfo = sequelize.import('../model/clubinfo.js')
var activity = sequelize.import('../model/activity.js')
var news = sequelize.import('../model/news.js')
var activitieEnroll = sequelize.import('../model/activitieEnroll.js')
var communityApproval = sequelize.import('../model/communityApproval.js')
var memberShip = sequelize.import('../model/memberShip.js')
var lunbotu = sequelize.import('../model/lunbotu.js')
var announcement = sequelize.import('../model/announcement.js')
var proposal = sequelize.import('../model/proposal.js')
var department = sequelize.import('../model/department.js')
var clubtype = sequelize.import('../model/clubtype.js')

sequelize.sync()

exports.user = admin
exports.wxUser = wxUser
exports.clubinfo = clubinfo
exports.activity = activity
exports.news = news
exports.activitieEnroll = activitieEnroll
exports.communityApproval = communityApproval
exports.memberShip = memberShip
exports.lunbotu = lunbotu
exports.announcement = announcement
exports.proposal = proposal
exports.department = department
exports.clubtype = clubtype

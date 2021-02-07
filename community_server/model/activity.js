module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'activity', {
    'activityId': {  //活动id
      'type': DataTypes.INTEGER(11),
      'allowNull': false,
      'primaryKey': true,
      'autoIncrement': true
    },
    'activityName': {  // 活动标题
      'type': DataTypes.STRING(100),
      'allowNull': false,
    },
    'activityImage': { // 活动图片
      'type': DataTypes.STRING(255),
      'allowNull': false,
      // 'defaultValue': null,
    },
    'clubName': { // 社团名
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    },
    // 'clubStar': { // 社团星级
    //   'type': DataTypes.INTEGER(1),
    //   'defaultValue': 0,
    // },
    // 'president': { // 社团负责人
    //   'type': DataTypes.STRING(10),
    //   'defaultValue': null,
    // },
    'ActivityLeader': { // 活动负责人
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    },
    'startTime': {  // 开始时间
      'type': DataTypes.DATE,
      'defaultValue': null,
    },
    'address': { // 活动地点
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    },
    'ActivityIntro': { // 活动简介
      'type': DataTypes.STRING(500),
      'defaultValue': null,
    },
    'totalNumber': { // 活动总人数
      'type': DataTypes.INTEGER(10),
      'defaultValue': null,
    },
    'surplusNumber': { //活动剩余人数
      'type': DataTypes.INTEGER(10),
      'defaultValue': null,
    },
    'ActivityType': {  //活动状态 报名进行中，报名已截至
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    },
    'approvalStatus': { // 审批状态 审批中，已通过，未通过
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    }
    // ,
    // 'studentId': { // 学号
    //   'type': DataTypes.STRING(10),
    //   'defaultValue': null,
    // },
    // 'community': {  // 加入的社团
    //   'type': 01DataTypes.STRING(100),
    //   'defaultValue': null,
    // },
    // 'jurisdiction': { //权限 0-游客 1-社团成员
    //   'type': DataTypes.INTEGER(1),
    //   'defaultValue': 0,
    // }
  }, {
    modelName: 'activity',
    timestamps: true,
    freezeTableName: true
  }
  )
}
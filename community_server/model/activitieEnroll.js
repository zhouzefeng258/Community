module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'activitieEnroll', {  //活动报名记录表
    'recordId': { // 记录id
      'type': DataTypes.INTEGER(11),
      'allowNull': false,
      'primaryKey': true,
      'autoIncrement': true
    },
    'activityId': {  //活动id
      'type': DataTypes.INTEGER(11),
      'allowNull': false,
    },
    'activityName': {  // 活动标题
      'type': DataTypes.STRING(100),
      'allowNull': false,
    },
    'openid': {
      'type': DataTypes.STRING(100),
      'allowNull': false,
    },
    'name': { // 名字
      'type': DataTypes.STRING(100),
      'allowNull': false,
    },
    'studentId': { //报名者学号
      'type': DataTypes.STRING(100),
      'allowNull': false,
    },
    'clubId': {  //社团id
      'type': DataTypes.INTEGER(11),
      'allowNull': false,
    },
    'clubName': { // 社团名
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    },
    'ActivityType': {  //活动状态 进行中，已结束
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    },
    'startTime': {  //活动状态 进行中，已结束
      'type': DataTypes.DATE,
      'defaultValue': null,
    }
  }, {
    modelName: 'activitieEnroll',
    timestamps: true,
    freezeTableName: true
  }
  )
}
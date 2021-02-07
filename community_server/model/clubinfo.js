var sequelize = require('../db/dbConfig').sequelize()
var admin = sequelize.import('../model/admin.js')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'clubinfo', {
    'clubId': {  //社团id
      'type': DataTypes.INTEGER(11),
      'allowNull': false,
      'primaryKey': true,
      'autoIncrement': true
    },
    'clubName': {  //社团名称
      'type': DataTypes.STRING(100),
      'allowNull': false,
    },
    'clubIcon': { // 社团图标
      'type': DataTypes.STRING(255),
      'defaultValue': null,
    },
    'clubType': { // 社团类型
      'type': DataTypes.STRING(255),
      'defaultValue': null,
    },
    'starTotal': { // 社团总星级
      'type': DataTypes.INTEGER(12),
      'defaultValue': 1,
    },
    'evaluationTimes': { // 评价的次数
      'type': DataTypes.INTEGER(12),
      'defaultValue': 1,
    },
    'department': { // 院/系
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    },
    'qqNumber': {  // 联系qq
      'type': DataTypes.STRING(12),
      'defaultValue': null,
    },
    'clubIntro': { // 社团简介
      'type': DataTypes.STRING(500),
      'defaultValue': null,
    },
    'president': { // 社长
      'type': DataTypes.STRING(10),
      'defaultValue': null,
    },
    'studentId': { // 社长的学号
      'type': DataTypes.STRING(11),
      defaultValue: null,

    },
    'teacher': { //指导教师
      'type': DataTypes.STRING(11),
      'defaultValue': null,
    },
    'show': { //是否显示
      'type': DataTypes.INTEGER(1),
      'defaultValue': 2,
    }
    // 'community': {  // 加入的社团
    //   'type': DataTypes.STRING(100),
    //   'defaultValue': null,
    // },
    // 'jurisdiction': { //权限 0-游客 1-社团成员
    //   'type': DataTypes.INTEGER(1),
    //   'defaultValue': 0,
    // }
  }, {
    modelName: 'clubinfo',
    timestamps: true,
    freezeTableName: true
  }
  )
}
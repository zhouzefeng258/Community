module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'communityApproval', {
    'id': {
      'type': DataTypes.INTEGER(11),
      'allowNull': false,
      'primaryKey': true,
      'autoIncrement': true
    },
    'clubName': {
      'type': DataTypes.STRING(20),
      'defaultValue': null,
    },
    'president': { //社团负责人
      'type': DataTypes.STRING(20),
      'defaultValue': null,
    },
    'studentId': { //社团负责人学号
      'type': DataTypes.STRING(11),
      'defaultValue': null,
    },
    'teacher': { //指导教师
      'type': DataTypes.STRING(20),
      'defaultValue': null,
    },
    'Reason': {  // 申请理由
      'type': DataTypes.STRING(500),
      'defaultValue': null,
    },
    'clubType': {
      'type': DataTypes.STRING(20),
      'defaultValue': null,
    },
    'department': {
      'type': DataTypes.STRING(20),
      'defaultValue': null,
    },
    'type': {  // 状态
      'type': DataTypes.INTEGER(1),
      'defaultValue': null,
    },

  }, {
    modelName: 'communityApproval',
    timestamps: false,
    freezeTableName: true
  }
  )
}
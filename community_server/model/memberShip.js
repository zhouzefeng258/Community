module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'memberShip', {  //会员资格申请表
    'id': { // 申请id
      'type': DataTypes.INTEGER(11),
      'allowNull': false,
      'primaryKey': true,
      'autoIncrement': true
    },
    'name': { // 申请人名字
      'type': DataTypes.STRING(100),
      'allowNull': false,
    },
    'studentId': { //申请人学号
      'type': DataTypes.STRING(100),
      'allowNull': false,
    },
    'openid': {   //申请人的openid
      'type': DataTypes.STRING(100),
      'allowNull': false,
    },
    'clubName': { // 社团名
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    },
    'reason': {  // 申请理由
      'type': DataTypes.STRING(500),
      'defaultValue': null,
    },
    'type': {  // 申请状态
      'type': DataTypes.STRING(10), //待通过，已通过，未通过，已取消
      'defaultValue': null,
    },

  }, {
    modelName: 'memberShip',
    timestamps: true,
    freezeTableName: true
  }
  )
}
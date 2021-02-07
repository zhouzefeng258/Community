module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'wx_user', {
    'id': {
      'type': DataTypes.INTEGER(11),
      'allowNull': false,
      'primaryKey': true,
      'autoIncrement': true
    },
    'openid': {  //小程序用户的openid
      'type': DataTypes.STRING(100),
      'allowNull': false,
    },
    'nickName': { // 昵称
      'type': DataTypes.STRING(100),
      'allowNull': false,
      // 'defaultValue': null,
    },
    'avatarUrl': { //用户头像，从微信获取
      'type': DataTypes.STRING(255),
      'defaultValue': null,
    },
    'name': { // 名字
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    },
    'sex': {  // 性别 0-男 1-女
      'type': DataTypes.STRING(8),
      'defaultValue': null,
    },
    'department': { // 分院/系
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    },
    'class': { // 班级
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    },
    'studentId': { // 学号
      'type': DataTypes.STRING(10),
      'defaultValue': null,
    },
    'communityName': {  // 加入的社团的名字
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    },
    'jurisdiction': { //权限 社长 或者成员
      'type': DataTypes.INTEGER(1),
      'defaultValue': 0,
    }
  }, {
    modelName: 'wx_user',
    timestamps: true,
    freezeTableName: true
  }
  )
}
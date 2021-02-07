module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'announcement', {
    'id': {
      'type': DataTypes.INTEGER(11),
      'allowNull': false,
      'primaryKey': true,
      'autoIncrement': true
    },
    'clubName': { //社团名
      'type': DataTypes.STRING(100),
      'allowNull': false,
    },
    'announcementTitle': { //公告标题
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    },
    'issuer': { //发布人
      'type': DataTypes.STRING(100),
      'allowNull': false,
    },
    'announcement': { //公告内容
      'type': DataTypes.TEXT,
      'defaultValue': null,
    },
    'isTop': {    // 判断是否公告置顶 1置顶 0不置顶
      'type': DataTypes.INTEGER(1),
      'defaultValue': 0,
    }
  }, {
    modelName: 'announcement',
    timestamps: true,
    freezeTableName: true
  }
  )
}
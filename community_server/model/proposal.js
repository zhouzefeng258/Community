module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'proposal', {
    'id': {
      'type': DataTypes.INTEGER(11),
      'allowNull': false,
      'primaryKey': true,
      'autoIncrement': true
    },
    'user_phone': { //用户手机
      'type': DataTypes.STRING(11),
      'defaultValue': null,
    },
    'user_email': { //用户邮箱
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    },
    'user_proposal': { //用户建议
      'type': DataTypes.TEXT,
      'defaultValue': null,
    }
  }, {
    modelName: 'proposal',
    timestamps: false,
    freezeTableName: true
  }
  )
}
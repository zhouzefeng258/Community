module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'clubtype', {
    'id': {
      'type': DataTypes.INTEGER(11),
      'allowNull': false,
      'primaryKey': true,
      'autoIncrement': true
    },
    'clubtype': { // 社团类型
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    }
  }, {
    modelName: 'clubtype',
    timestamps: false,
    freezeTableName: true
  }
  )
}
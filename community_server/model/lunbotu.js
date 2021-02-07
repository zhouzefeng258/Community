module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'lunbotu', {
    'id': {
      'type': DataTypes.INTEGER(11),
      'allowNull': false,
      'primaryKey': true,
      'autoIncrement': true
    },
    'imagePath': { //图片路径
      'type': DataTypes.STRING(500),
      'defaultValue': null,
    }
  }, {
    modelName: 'lunbotu',
    timestamps: false,
    freezeTableName: true
  }
  )
}
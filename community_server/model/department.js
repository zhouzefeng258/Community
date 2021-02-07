module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'department', {
    'id': {
      'type': DataTypes.INTEGER(11),
      'allowNull': false,
      'primaryKey': true,
      'autoIncrement': true
    },
    'department': { //分院
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    }
  }, {
    modelName: 'department',
    timestamps: false,
    freezeTableName: true
  }
  )
}
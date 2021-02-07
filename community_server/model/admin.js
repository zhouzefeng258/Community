module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'ht_admin', {
    'id': {
      'type': DataTypes.INTEGER(11),
      'allowNull': false,
      'primaryKey': true,
      'autoIncrement': true
    },
    'userName': {
      'type': DataTypes.STRING(20),
      'defaultValue': null,
    },
    'name': {
      'type': DataTypes.STRING(255),
      'defaultValue': null,
    },
    'passWord': {
      'type': DataTypes.STRING(20),
      'defaultValue': null,
    },
    'studentId': {
      'type': DataTypes.STRING(11),
      'defaultValue': null,
    },
    'clubName': {
      'type': DataTypes.STRING(100),
      'defaultValue': null,
    },
    'jurisdiction': {
      'type': DataTypes.INTEGER(1), // 1-超管 2-社管
      'defaultValue': 1,
    },

  }, {
    modelName: 'ht_admin',
    timestamps: false,
    freezeTableName: true
  }
  )
}
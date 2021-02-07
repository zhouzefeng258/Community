module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'news', {
    'newsId': {  //新闻id
      'type': DataTypes.INTEGER(11),
      'allowNull': false,
      'primaryKey': true,
      'autoIncrement': true
    },
    'newsTitle': {  // 新闻标题
      'type': DataTypes.STRING(100),
      'allowNull': false,
    },
    'newsImage': { // 新闻图片
      'type': DataTypes.STRING(255),
      'allowNull': false,
      // 'defaultValue': null,
    },
    // 'newsTime': { // 发布时间
    //   'type': DataTypes.STRING(255),
    //   'defaultValue': null,
    // },
    'newsSource': { //  新闻来源
      'type': DataTypes.STRING(100),
      'allowNull': false,
    },
    'newsContent': { //  新闻正文
      'type': DataTypes.TEXT,
    }
  }, {
    modelName: 'news',
    timestamps: true,
    freezeTableName: true
  }
  )
}
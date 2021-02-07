var express = require('express');
var router = express.Router();
// var User = require('../model/index').user
var news = require('../model/index').news
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')


// 获取新闻列表
router.post('/geiNewsList', (req, res, next) => {
  news.findAll().then(data => {
    if (data != "") {
      res.send({
        code: 200,
        message: "获取数据成功",
        list: data
      })
    } else {
      res.send({
        code: 400,
        message: "获取数据失败",
      })
    }
  })
})
// 获取新闻信息
router.post('/getNews', (req, res, next) => {
  if (req.body.newsId == '') {
    res.send({
      code: 400,
      message: "缺少参数",
    })
  }
  news.findOne({ where: { newsId: req.body.newsId } }).then(data => {
    console.log(data)
    if (data != '') {

      res.send({
        code: 200,
        message: "获取数据成功",
        list: data
      })
    } else {
      res.send({
        code: 400,
        message: "获取数据失败",
      })
    }
  })
})


module.exports = router;
var express = require('express');
var router = express.Router();
var lunbotu = require('../model/index').lunbotu
var user = require('../model/index').wxUser
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')


//获取轮播图列表
router.post('/getLunbotuList', (req, res, next) => {
  lunbotu
    .findAll()
    .then(result => {
      if (result) {
        res.send({
          code: 200,
          messageL: '数据获取成功',
          list: result
        })
      }
    }).catch(data => {
      console.log(data)
    })
})





module.exports = router;
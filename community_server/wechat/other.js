var express = require('express');
var router = express.Router();
var clubtype = require('../model/index').clubtype
var department = require('../model/index').department
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')


//获取部门列表
router.post('/getDepartmentList', (req, res, next) => {
  department
    .findAll()
    .then(result => {
      if (result) {
        res.send({
          code: 200,
          message: '数据获取成功',
          list: result
        })
      }
    }).catch(data => {
      console.log(data)
    })
})

//获取社团类型列表
router.post('/getClubtypeList', (req, res, next) => {
  clubtype
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
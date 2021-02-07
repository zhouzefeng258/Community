var express = require('express');
var router = express.Router();
var lunbotu = require('../model/index').lunbotu
var user = require('../model/index').wxUser
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')

//新增轮播图
router.post('/addLunbotu', (req, res, next) => {
  console.log(req.body)
  if (req.body.imagePath === '') {
    res.send({
      code: 400,
      message: "参数不全"
    })
  }
  lunbotu.create({
    imagePath: req.body.imagePath
  }).then(data => {
    if (data.id) {
      res.send({
        code: 200,
        message: '增加图片成功'
      })
    } else {
      res.send({
        code: 400,
        message: '增加图片失败'
      })
    }
  }).catch(err => {
    console.log(err)
  })
})


//获取轮播图列表
router.post('/getLunbotuList', (req, res, next) => {
  const currentPage = req.body.currentPage
  const pagesize = req.body.pagesize
  const serchData = req.body.serchData
  if (currentPage === '' || pagesize === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  let serchdata = {}
  lunbotu
    .findAndCountAll({
      offset: (currentPage - 1) * pagesize,
      limit: pagesize
    })
    .then(result => {
      if (result) {
        console.log(result.rows)
        res.send({
          code: 200,
          total: result.count,
          currentPage: currentPage,
          pagesize: pagesize,
          list: result.rows
        })
      }
    }).catch(data => {
      console.log(data)
    })
})

//删除轮播图
router.post('/deleteLunbotu', (req, res, next) => {
  let id = Number(req.body.id)
  if (id === '') {
    res.send({
      code: 400,
      message: '您没有选择要删除的数据'
    })
  }
  lunbotu.destroy({
    where: {
      id: id
    }
  }).then(data => {
    if (data) {
      res.send({
        code: 200,
        message: '删除成功'
      })
    } else {
      res.send({
        code: 400,
        message: '删除失败'
      })
    }
  })
})



module.exports = router;
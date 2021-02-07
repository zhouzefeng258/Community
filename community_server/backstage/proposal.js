var express = require('express');
var router = express.Router();
var proposal = require('../model/index').proposal
var user = require('../model/index').wxUser
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')


//获取建议列表
router.post('/getProposalList', (req, res, next) => {
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
  if (serchData.user_phone != '') {
    serchdata['user_phone'] = { $like: '%' + serchData.user_phone + '%' }
  }
  if (serchData.user_email != '') {
    serchdata['user_email'] = { $like: '%' + serchData.user_email + '%' }
  }
  proposal
    .findAndCountAll({
      where: serchdata,
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

//删除建议
router.post('/deleteProposal', (req, res, next) => {
  console.log(req.body)
  let id = Number(req.body.id)
  if (id === '') {
    res.send({
      code: 400,
      message: '您没有选择要删除的数据'
    })
  }
  proposal.destroy({
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
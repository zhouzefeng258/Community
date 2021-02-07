var express = require('express');
var router = express.Router();
var proposal = require('../model/index').proposal
var user = require('../model/index').wxUser
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')

// 添加用户建议
router.post('/addProposal', (req, res, next) => {
  console.log(req.body)
  if (req.body.user_phone === '' || req.body.user_email === '' || req.body.user_proposal === '') {
    res.send({
      code: 400,
      message: "参数不全"
    })
  }
  proposal.create({
    user_phone: req.body.user_phone,
    user_email: req.body.user_email,
    user_proposal: req.body.user_proposal
  }).then(data => {
    if (data.id) {
      res.send({
        code: 200,
        message: '您的建议我们已经收到，如有必要我们将会联系您'
      })
    } else {
      res.send({
        code: 400,
        message: '服务器异常'
      })
    }
  }).catch(err => {
    console.log(err)
  })
})


module.exports = router;
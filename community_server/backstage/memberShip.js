var express = require('express');
var router = express.Router();
var memberShip = require('../model/index').memberShip
var user = require('../model/index').wxUser
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')

//加入社团审批
router.post('/Approval', (req, res, next) => {
  console.log(req.body.applyData)
  let { clubName, openid } = req.body.applyData
  let type = req.body.type
  console.log()
  if (clubName === '' || openid === '' || type === '') {
    res.send({
      code: 400,
      message: "参数不全"
    })
  }
  let messageBody = {
    "thing2": {
      "value": req.body.activityName
    },
    "thing5": {
      "value": req.body.address
    },
    "thing9": {
      "value": req.body.clubName
    },
    "date4": {
      "value": req.body.startTime
    }
  }
  user.findOne({
    where: {
      openid: openid, [Op.or]: [{ communityName: '' }, { communityName: null }]
    }
  }).then(data => {
    if (data) {
      console.log('第一处')
      memberShip.update({ type: '已通过' }, { where: { openid: openid, clubName: clubName } }).then(data => {
        if (data) {
          user.update({ communityName: clubName }, {
            where: {
              openid: openid, [Op.or]: [{ communityName: '' }, { communityName: null }]
            }
          }).then(data => {
            console.log('第二处')
            if (data) {
              res.send({
                code: 200,
                message: '操作成功',
              })
            } else {
              res.send({
                code: 500,
                message: '设置用户信息时失败',
              })
            }
          }).catch(err => {
            console.log(err)
            res.send({
              code: 500,
              message: err
            })
          })
        } else {
          res.send({
            code: 500,
            message: '设置记录时失败',
          })
        }
      }).catch(err => {
        console.log(err)
        res.send({
          code: 500,
          message: err
        })
      })
    } else {
      memberShip.update({ type: '未通过' }, { where: { openid: openid, clubName: clubName } }).then(data => {
        console.log('第三处')
        if (data) {
          res.send({
            code: 400,
            message: '该用户已加入社团',
          })
        } else {
          res.send({
            code: 500,
            message: '系统异常',
          })
        }
      }).catch(err => {
        console.log(err)
        res.send({
          code: 500,
          message: err
        })
      })
    }
  }).catch(err => {
    console.log(err)
    res.send({
      code: 500,
      message: err
    })
  })
})


//获取审批列表
router.post('/getMemberShipApprovalList', (req, res, next) => {
  const currentPage = req.body.currentPage
  const pagesize = req.body.pagesize
  const serchData = req.body.serchData
  if (currentPage === '' || pagesize === '' || serchData.type === '' || serchData.clubName === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  let serchdata = {}
  if (serchData.name != '') {
    serchdata['name'] = { $like: '%' + serchData.name + '%' }
  }
  if (serchData.clubName != '') {
    serchdata['clubName'] = { $like: serchData.clubName }
  }
  if (serchData.studentId != '') {
    serchdata['studentId'] = { $like: '%' + serchData.studentId + '%' }
  }
  if (serchData.type != '') {
    if (serchData.type === '其他') {
      serchdata['type'] = { [Op.or]: ['已通过', '未通过', '已取消'] }
    } else {
      serchdata['type'] = { $like: serchData.type }
    }
  }
  memberShip
    .findAndCountAll({
      where: serchdata,
      offset: (currentPage - 1) * pagesize,
      limit: pagesize
    })
    .then(result => {
      console.log(result)
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

//删除审批记录
router.post('/deleteMemberShip', (req, res, next) => {
  let id = Number(req.body.id)
  if (id === '') {
    res.send({
      code: 400,
      message: '您没有选择要删除的数据'
    })
  }
  memberShip.destroy({
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
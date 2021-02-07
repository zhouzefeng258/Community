var express = require('express');
var router = express.Router();
var communityApproval = require('../model/index').communityApproval
var clubinfo = require('../model/index').clubinfo
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')

// 发起创建社团的申请
router.post('/createdCommunity', (req, res, next) => {
  if (req.body.clubName === '' || req.body.president === '' || req.body.studentId === '' || req.body.teacher === '' || req.body.Reason === '' || req.body.clubType === '' || req.body.department === '') {
    res.send({
      code: 400,
      message: '缺少参数'
    })
  }
  clubinfo.findOne({ where: { [Op.or]: [{ clubName: req.body.clubName }, { studentId: req.body.studentId }] } }).then(data => {
    if (data) {
      res.send({
        code: 400,
        message: '申请失败，该社团以被注册或者该学号已经注册过社团'
      })
    } else {
      communityApproval
        .findOrCreate({ where: { clubName: req.body.clubName, studentId: req.body.studentId, type: 1 }, defaults: { clubName: req.body.clubName, president: req.body.president, studentId: req.body.studentId, teacher: req.body.teacher, Reason: req.body.Reason, clubType: req.body.clubType, department: req.body.department, type: 1 } })
        .then(([communityApproval, created]) => {
          if (created) {
            res.send({
              code: 200,
              message: '提交申请成功，请您耐心等待审核结果',
              id: communityApproval.Id
            })
          } else {
            res.send({
              code: 400,
              message: '申请失败，该社团以被申请或者该学号已经申请过社团'
            })
          }
        })
    }
  })

})
// 后台获取审核数据
router.post('/getApproveList', function (req, res, next) {
  const currentPage = req.body.currentPage
  const pagesize = req.body.pagesize
  const serchData = req.body.serchData
  if (currentPage === '' || pagesize === '' || serchData.type === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  let serchdata = {}
  if (serchData.type != '') {
    serchdata['type'] = { $like: serchData.type }
  }
  if (serchData.clubName != '') {
    serchdata['clubName'] = { $like: '%' + serchData.clubName + '%' }
  }
  if (serchData.president != '') {
    serchdata['president'] = { $like: '%' + serchData.president + '%' }
  }
  communityApproval
    .findAndCountAll({
      where: serchdata,
      offset: (currentPage - 1) * pagesize,
      limit: pagesize
    })
    .then(result => {
      if (result) {
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
// 根据学号查询审核结果
router.post('/getAuditResults', function (req, res, next) {
  if (req.body.studentId === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  communityApproval.findOne({ where: { studentId: req.body.studentId } }).then(data => {
    if (data) {
      if (data.type === 1) {
        res.send({
          code: 400,
          message: '您的申请还在审核中,请耐心等待',
        })
      } else if (data.type === 2) {
        res.send({
          code: 200,
          message: '成功',
        })
      } else {
        res.send({
          code: 400,
          message: '您的申请出现了些异常',
        })
      }
    } else {
      res.send({
        code: 400,
        message: '未查询到该学号的申请记录'
      })
    }
  })
})
// 社团审批
router.post('/Approved', function (req, res, next) {
  let { id, clubName, studentId, clubType, department, president, teacher } = req.body.clubInfo
  if (req.body.type === '' || id === '' || clubName === '' || studentId === '' || clubType === '' || department === '' || president === '' || teacher === '') {
    res.send({
      code: 400,
      message: '缺少参数'
    })
  }
  if (req.body.type == 'pass') {
    clubinfo.findOrCreate({
      where: { clubName: clubName, studentId: studentId }, defaults: {
        clubIcon: '',
        clubName: clubName,
        studentId: studentId,
        clubType: clubType,
        department: department,
        qqNumber: '',
        clubIntro: '',
        starTotal: 1,
        evaluationTimes: 1,
        president: president,
        teacher: teacher,
        show: 2
      }
    }).then(([data, created]) => {
  
      if (created) {
        communityApproval.update({ type: 2 }, { where: { id: id } }).then(data => {
          if (data) {
            res.send({
              code: 200,
              message: '操作成功'
            })
          } else {
            res.send({
              code: 400,
              message: '该社团已经过审批'
            })
          }
        }).catch((data) => {
          console.log(data)
          res.send({
            code: 400,
            message: '系统异常，操作失败'
          })
        })
      } else {
        res.send({
          code: 400,
          message: '系统异常，操作失败'
        })
      }
    }).catch((data) => {
      console.log(data)
      res.send({
        code: 400,
        message: '系统异常，操作失败'
      })
    })

  } else if (req.body.type == 'fail') {
    communityApproval.update({ type: 3 }, { where: { id: id } }).then(data => {
      if (data) {
        res.send({
          code: 200,
          message: '操作成功'
        })
      } else {
        res.send({
          code: 400,
          message: '系统异常，操作失败'
        })
      }
    }).catch((data) => {
      console.log(data)
      res.send({
        code: 400,
        message: '系统异常，操作失败'
      })
    })
  } else {
    res.send({
      code: 400,
      message: '参数不正确'
    })
  }
})
// 删除审批记录
router.post('/deleteClubAuditRecord', (req, res, next) => {
  let id = Number(req.body.id)
  if (id === '') {
    res.send({
      code: 400,
      message: '您没有选择要删除的数据'
    })
  }
  communityApproval.destroy({
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
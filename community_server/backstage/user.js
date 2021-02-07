var express = require('express');
var router = express.Router();
var user = require('../model/index').wxUser
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')

// 获取用户列表
router.post('/getUserList', (req, res, next) => {
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
  if (serchData.nickName != '') {
    serchdata['nickName'] = { $like: '%' + serchData.nickName + '%' }
  }
  if (serchData.name != '') {
    serchdata['name'] = { $like: '%' + serchData.name + '%' }
  }
  if (serchData.communityName != '') {
    serchdata['communityName'] = { $like: serchData.communityName }
  }
  if (serchData.class != '') {
    serchdata['class'] = { $like: '%' + serchData.class + '%' }
  }
  if (serchData.department != '') {
    serchdata['department'] = { $like: '%' + serchData.department + '%' }
  }
  if (serchData.studentId != '') {
    serchdata['studentId'] = { $like: '%' + serchData.studentId + '%' }
  }
  if (serchData.jurisdiction != '') {
    serchdata['jurisdiction'] = { $like: serchData.jurisdiction }
  }
  user
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
    }).catch(err => {
      console.log(err)
      res.send({
        code: 400,
        message: '系统异常'
      })
    })
})
// 不需要添加微信用户，获取不到openid
// 修改用户信息 只能修改除了微信接口获取的数据
router.post('/updatedUser', (req, res, next) => {
  let wxUserInfo = req.body.wxUserInfo
  if (wxUserInfo.id === '' || wxUserInfo.name === '' || wxUserInfo.sex === '' || wxUserInfo.department === '' || wxUserInfo.class === '' || wxUserInfo.studentId === '' || wxUserInfo.communityName === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  user.update({ name: wxUserInfo.name, class: wxUserInfo.class, sex: wxUserInfo.sex, department: wxUserInfo.department, studentId: wxUserInfo.studentId }, { where: { id: wxUserInfo.id } }).then(data => {
    if (data) {
      console.log(data)
      res.send({
        code: 200,
        message: '更新成功'
      })
    } else {
      res.send({
        code: 400,
        message: '更新失败'
      })
    }
  })
})

// 删除用户
router.post('/deleteUser', (req, res, next) => {
  let id = Number(req.body.id)
  if (id === '') {
    res.send({
      code: 400,
      message: '您没有选择要删除的数据'
    })
  }
  user.destroy({
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

// 将用户踢出社团 社团管理员使用
router.post('/qiutCLub', (req, res, next) => {
  let id = Number(req.body.id)
  if (id === undefined || id === '') {
    res.send({
      code: 400,
      message: '没选择要踢出社团的用户'
    })
  }
  user.update({ communityName: '', jurisdiction: 0 }, { where: { id: id } }).then(data => {
    if (data) {
      res.send({
        code: 200,
        message: '退出成功'
      })
    } else {
      res.send({
        code: 400,
        message: '请求失败'
      })
    }
  }).catch(err => {
    console.log(err)
  })
})


module.exports = router;
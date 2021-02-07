var express = require('express');
var router = express.Router();
var clubinfo = require('../model/index').clubinfo
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')

// 获取社团列表
router.post('/getCommunityInfoList', function (req, res, next) {
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
  if (serchData.clubName != '') {
    serchdata['clubName'] = { $like: '%' + serchData.clubName + '%' }
  }
  if (serchData.president != '') {
    serchdata['president'] = { $like: '%' + serchData.president + '%' }
  }
  clubinfo
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
// 编辑社团信息
router.post('/updateCommunityInfo', (req, res, next) => {
  let { clubId, clubName, clubIcon, clubType, department, qqNumber, clubIntro, president, studentId, teacher, show } = req.body.CommunityInfo
  console.log(show)
  // console.log({ clubId, clubName, clubIcon, clubType, clubStar, department, qqNumber, clubIntro, president, studentId, teacher })
  if (clubId === '' || clubName === '' || clubIcon === '' || clubType === '' || department === '' || qqNumber === '' || clubIntro === '' || president === '' || studentId === '' || teacher === '' || show === '') {
    console.log('出错了')
    res.send({
      code: 400,
      message: '参数不足'
    })
  }
  clubinfo.update({ clubName: clubName, clubIcon: clubIcon, clubType: clubType, department: department, qqNumber: qqNumber, clubIntro: clubIntro, president: president, studentId: studentId, teacher: teacher, show: show }, { where: { clubId: clubId } }).then(data => {
    if (data) {
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
  }).catch(error => {
    console.log(error)
    res.send({
      code: 400,
      message: '更新失败',
      reason: error
    })
  })

})
// 删除社团
router.post('/deleteCommunityInfo', (req, res, next) => {
  let id = Number(req.body.id)
  if (id === '') {
    res.send({
      code: 400,
      message: '您没有选择要删除的数据'
    })
  }
  clubinfo.destroy({
    where: {
      clubId: id
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
  }).catch(error => {
    res.send({
      code: 400,
      message: '删除失败',
      err: error
    })
  })
})
// 根据学号获得单个社团信息
router.post('/getCommunityInfoByStuentdId', (req, res, next) => {
  if (req.body.studentId === '') {
    res.send({
      code: 400,
      message: "参数不全"
    })
  }
  clubinfo.findOne({ where: { studentId: req.body.studentId } }).then(data => {
    if (data) {
      res.send({
        code: 200,
        message: "数据获取成功",
        data: data,
      })
    } else {
      res.send({
        code: 400,
        message: "没有找到数据",
      })
    }
  }).catch(err => {
    res.send({
      code: 400,
      message: "系统异常"
    })
  })
})




module.exports = router;
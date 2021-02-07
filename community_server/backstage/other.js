var express = require('express');
var router = express.Router();
var clubtype = require('../model/index').clubtype
var department = require('../model/index').department
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')


//获取部门列表
router.post('/getDepartment', (req, res, next) => {
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
router.post('/getClubtype', (req, res, next) => {
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

// 分页获取社团类型列表
router.post('/getClubtypeList', (req, res, next) => {
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
  clubtype
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

// 分页获取院/系列表列表
router.post('/getDepartmentList', (req, res, next) => {
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
  department
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

//新增社团类型
router.post('/addClubtype', (req, res, next) => {
  console.log(req.body)
  if (req.body.clubtype === '') {
    res.send({
      code: 400,
      message: "参数不全"
    })
  }
  clubtype.findOrCreate({ where: { clubtype: req.body.clubtype }, defaults: { clubtype: req.body.clubtype } }).
    then(([result, created]) => {
      if (created) {
        res.send({
          code: 200,
          message: "添加成功",
          id: result.id
        })
      } else {
        res.send({
          code: 400,
          message: "添加失败"
        })
      }
    }).catch(err => {
      console.log(err)
    })
})
//新增分院/系
router.post('/addDepartment', (req, res, next) => {
  console.log(req.body)
  if (req.body.department === '') {
    res.send({
      code: 400,
      message: "参数不全"
    })
  }
  department.findOrCreate({ where: { department: req.body.department }, defaults: { department: req.body.department } }).
    then(([result, created]) => {
      if (created) {
        res.send({
          code: 200,
          message: "添加成功",
          id: result.id
        })
      } else {
        res.send({
          code: 400,
          message: "添加失败"
        })
      }
    }).catch(err => {
      console.log(err)
    })
})

// 删除社团类型
router.post('/deleteClubtype', (req, res, next) => {
  let id = Number(req.body.id)
  if (id === '') {
    res.send({
      code: 400,
      message: '您没有选择要删除的数据'
    })
  }
  clubtype.destroy({
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
// 删除分院类型
router.post('/deleteDepartment', (req, res, next) => {
  let id = Number(req.body.id)
  if (id === '') {
    res.send({
      code: 400,
      message: '您没有选择要删除的数据'
    })
  }
  department.destroy({
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
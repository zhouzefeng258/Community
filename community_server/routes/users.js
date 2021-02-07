var express = require('express');
var router = express.Router();
var User = require('../model/index').user
const Sequelize = require('sequelize')
const Op = Sequelize.Op

/* GET users listing. */
// 注册接口
router.post('/reg', function (req, res, next) {
  if (req.body.userName === '' || req.body.passWord === '' || req.body.Name === '' || req.body.Sex === '' || req.body.Tel === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  User
    .findOrCreate({ where: { Admin_Username: req.body.userName }, defaults: { Admin_Username: req.body.userName, Admin_Password: req.body.passWord, Admin_Name: req.body.Name, Admin_Sex: req.body.Sex, Admin_Tel: req.body.Tel } })
    .then(([user, created]) => {
      if (created) {
        res.send({
          code: 200,
          message: '完善成功',
          id: user.Admin_ID
        })
      } else {
        res.send({
          code: 400,
          message: '该用户已存在'
        })
      }
    })
})

// 分页加模糊查询获取数据
router.post('/getList2', function (req, res, next) {
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
  if (serchData.Admin_ID != '') {
    serchdata['Admin_ID'] = { $like: '%' + serchData.Admin_ID + '%' }
  }
  if (serchData.Admin_Username != '') {
    serchdata['Admin_Username'] = { $like: '%' + serchData.Admin_UserName + '%' }
  }
  if (serchData.Admin_Password != '') {
    serchdata['Admin_Password'] = {
      $like: '%' + serchData.Admin_Password + '%'
    }
  }
  if (serchData.Admin_Name != '') {
    serchdata['Admin_Name'] = { $like: '%' + serchData.Admin_Name + '%' }
  }
  if (serchData.Admin_Sex != '') {
    serchdata['Admin_Sex'] = serchData.Admin_Sex
  }
  if (serchData.Admin_Tel != '') {
    serchdata['Admin_Tel'] = {
      $like: '%' + serchData.Admin_Tel + '%'
    }
  }
  User
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
    });
})
// 登陆接口
router.post('/Login', (req, res, next) => {
  let { userName, passWord,ju } = req.body
  if (userName === '' || passWord === '') {
    res.send({
      code: 0,
      message: '登陆失败,账号密码为空'
    })
  }
  User.findAll({
    where: {
      userName: userName,
      passWord: passWord
    }
  }).then(data => {
    if (data) {
      res.send({
        code: 1,
        message: '登陆成功',
        list: data
      })
    } else {
      res.send({
        code: 0,
        message: '登陆失败,该用户不存在'
      })
    }
  })
})

// 更新数据接口

router.post('/updateUser', (req, res, next) => {
  let { id, userName, passWord, Name, Sex, Tel } = req.body
  if (id === '') {
    res.send({
      code: 400,
      message: '您没有选择要编辑的数据'
    })
  }
  User.update({ Admin_Name: Name, Admin_Username: userName, Admin_Password: passWord, Admin_Sex: Sex, Admin_Tel: Tel }, { where: { Admin_ID: id } }).then(data => {
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
  })

})

// 删除数据接口
router.post('/deleteUser', (req, res, next) => {
  let id = Number(req.body.Admin_ID)
  if (id === '') {
    res.send({
      code: 400,
      message: '您没有选择要删除的数据'
    })
  }
  User.destroy({
    where: {
      Admin_ID: id
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

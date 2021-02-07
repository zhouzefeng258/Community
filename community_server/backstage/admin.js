var express = require('express');
var router = express.Router();
var User = require('../model/index').user
var clubinfo = require('../model/index').clubinfo
const Sequelize = require('sequelize')
const Op = Sequelize.Op


// 以下是接口涉及到的方法
// 1.查找学号对应的社团信息
// async function findClubBystudentId (studentId) {
//   await clubinfo.findOne({ where: { studentId: studentId } }).then(data => {
//     if (data) {
//       return data
//     } else {
//       return false
//     }
//   }).catch(err => {
//     console.log(err)
//   })
// }
// 2. 根据学号删除用户数据
// async function deleteAdminbyStudentId (userName) {
//   await User.destroy({
//     where: {
//       userName: userName
//     }
//   }).then(data => {
//     return data
//   }).catch(err => {
//     console.log(err)
//   })
// }

/* GET users listing. */
// 添加用户
router.post('/addAdmin', function (req, res, next) {
  if (req.body.userName === '' || req.body.passWord === '' || req.body.name === '' || req.body.jurisdiction === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  if (req.body.jurisdiction === 2) {
    clubinfo.findOne({ where: { studentId: req.body.studentId, president: req.body.name } }).then(data => {
      if (data) {
        User
          .findOrCreate({ where: { userName: req.body.userName, studentId: req.body.studentId }, defaults: { username: req.body.userName, passWord: req.body.passWord, studentId: req.body.studentId, name: req.body.name, jurisdiction: 2, clubName: data.clubName } })
          .then(([user, created]) => {
            if (created) {
              res.send({
                code: 200,
                message: '注册成功',
                id: user.id
              })
            } else {
              res.send({
                code: 400,
                message: '注册失败,用户名或学号已被注册'
              })
            }
          })
      } else {
        res.send({
          code: 400,
          message: "请输入在申请社团时填入的学号和名字"
        })
      }

    }).catch(err => {
      console.log(err)
    })
  } else {
    User
      .findOrCreate({ where: { userName: req.body.userName }, defaults: { username: req.body.userName, passWord: req.body.passWord, name: req.body.name, jurisdiction: 1, studentId: null, clubName: null } })
      .then(([user, created]) => {
        if (created) {
          res.send({
            code: 200,
            message: '注册成功',
            id: user.id
          })
        } else {
          res.send({
            code: 400,
            message: '注册失败,该用户以被注册'
          })
        }
      })
  }

})

// 分页加模糊查询获取数据
router.post('/getAdminList', function (req, res, next) {
  const currentPage = req.body.currentPage
  const pagesize = req.body.pagesize
  const serchData = req.body.serchData
  if (currentPage === '' || pagesize === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  console.log(serchData)
  let serchdata = {}
  if (serchData.userName != '') {
    serchdata['userName'] = { $like: '%' + serchData.userName + '%' }
  }
  if (serchData.name != '') {
    serchdata['name'] = { $like: '%' + serchData.Admin_ID + '%' }
  }
  if (serchData.studentId != '') {
    serchdata['studentId'] = { $like: '%' + serchData.studentId + '%' }
  }
  if (serchData.clubName != '') {
    serchdata['clubName'] = { $like: '%' + serchData.clubName + '%' }
  }
  if (serchData.jurisdiction != '') {
    serchdata['jurisdiction'] = { $like: serchData.jurisdiction }
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


// 更新数据接口
router.post('/updateAdmin', (req, res, next) => {
  let { id, userName, passWord, name, studentId, jurisdiction, clubName } = req.body
  if (id === '') {
    res.send({
      code: 400,
      message: '您没有选择要编辑的数据'
    })
  }
  if (jurisdiction === 1) {
    User.update({ name: name, userName: userName, passWord: passWord, studentId: null, jurisdiction: jurisdiction, clubName: null }, { where: { id: id } }).then(data => {
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
  } else {
    User.update({ name: name, userName: userName, passWord: passWord, studentId: studentId, jurisdiction: jurisdiction, clubName: clubName }, { where: { id: id } }).then(data => {
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
  }


})

// 删除数据接口
router.post('/deleteAdmin', (req, res, next) => {
  let id = Number(req.body.id)
  if (id === '') {
    res.send({
      code: 400,
      message: '您没有选择要删除的数据'
    })
  }
  User.destroy({
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
// 登陆接口
router.post('/Login', (req, res, next) => {
  let { userName, passWord, jurisdiction } = req.body
  jurisdiction = Number(jurisdiction)
  if (userName === '' || passWord === '' || jurisdiction === '') {
    res.send({
      code: 0,
      message: '登陆失败'
    })
  }
  User.findOne({
    where: {
      userName: userName,
      passWord: passWord,
      jurisdiction: jurisdiction
    }
  }).then(async data => {
    if (data) {
      let adminInfo = data
      if (adminInfo.jurisdiction === 2) {
        await clubinfo.findOne({ where: { studentId: adminInfo.studentId } }).then(data => {
          if (data) {
            res.send({
              code: 1,
              message: '登陆成功',
              list: adminInfo
            })
          } else {
            User.destroy({
              where: {
                userName: adminInfo.userName
              }
            }).then(data => {
              if (data) {
                res.send({
                  code: 0,
                  message: '登陆失败,该账户已被删除，或者该账户对应的社团以被删除'
                })
              } else {
                res.send({
                  code: 0,
                  message: '登陆失败，系统出现异常'
                })
              }
            }).catch(err => {
              console.log(err)
            })
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        res.send({
          code: 1,
          message: '登陆成功',
          list: adminInfo
        })
      }
    } else {
      res.send({
        code: 0,
        message: '登陆失败,该用户不存在'
      })
    }
  }).catch(err => {
    console.log(err)
  })
})
// 注册接口
router.post('/reg', function (req, res, next) {
  if (req.body.userName === '' || req.body.passWord === '' || req.body.studentId === '') {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  clubinfo.findOne({ where: { studentId: req.body.studentId } }).then(data => {
    if (data) {
      User
        .findOrCreate({ where: { userName: req.body.userName, studentId: req.body.studentId }, defaults: { username: req.body.userName, passWord: req.body.passWord, studentId: req.body.studentId, name: req.body.name, jurisdiction: 2, clubName: data.clubName } })
        .then(([user, created]) => {
          if (created) {
            res.send({
              code: 200,
              message: '注册成功',
              id: user.id
            })
          } else {
            res.send({
              code: 400,
              message: '注册失败,用户名或学号已被注册'
            })
          }
        })
    } else {
      res.send({
        code: 400,
        message: "该学号无法注册账户"
      })
    }

  }).catch(err => {
    console.log(err)
  })

})






module.exports = router;

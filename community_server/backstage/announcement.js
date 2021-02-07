var express = require('express');
var router = express.Router();
var announcement = require('../model/index').announcement
var user = require('../model/index').wxUser
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var request = require('request')

//新增社团公告
router.post('/addAnnouncement', (req, res, next) => {
  console.log(req.body)
  if (req.body.clubName === '' || req.body.issuer === '' || req.body.announcement === '' || req.body.announcementTitle === '') {
    res.send({
      code: 400,
      message: "参数不全"
    })
  }
  announcement.create({
    clubName: req.body.clubName,
    issuer: req.body.issuer,
    announcement: req.body.announcement,
    announcementTitle: req.body.announcementTitle,
    isTop: 0,
  }).then(data => {
    if (data.id) {
      res.send({
        code: 200,
        message: '发布公告成功'
      })
    } else {
      res.send({
        code: 400,
        message: '发布公告失败'
      })
    }
  }).catch(err => {
    console.log(err)
  })
})


//获取公告列表
router.post('/getAnnouncementList', (req, res, next) => {
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
    serchdata['clubName'] = { $like: serchData.clubName }
  }
  if (serchData.announcementTitle != '') {
    serchdata['announcementTitle'] = { $like: '%' + serchData.announcementTitle + '%' }
  }
  announcement
    .findAndCountAll({
      where: serchdata,
      order: [['isTop', 'DESC']],
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

//删除公告
router.post('/deleteAnnouncement', (req, res, next) => {
  console.log(req.body.id)
  let id = Number(req.body.id)
  if (id === '') {
    res.send({
      code: 400,
      message: '您没有选择要删除的数据'
    })
  }
  announcement.destroy({
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
// 编辑公告
router.post('/editAnnouncement', (req, res, next) => {
  if (req.body.id === '' || req.body.clubName === '' || req.body.issuer === '' || req.body.announcement === '' || req.body.announcementTitle === '' || req.body.isTop === '') {
    res.send({
      code: 400,
      message: "参数不全"
    })
  }
  announcement.update({ announcementTitle: req.body.announcementTitle, clubName: req.body.clubName, issuer: req.body.issuer, announcement: req.body.announcement, isTop: req.body.isTop }, { where: { id: req.body.id } }).then(data => {
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
// 置顶公告1
// router.post('/Topping', (req, res, next) => {
//   if (req.body.id === '', req.body.oldId === '') {
//     res.send({
//       code: 400,
//       message: '参数错误'
//     })
//   } announcement.update({ isTop: 0 }, { where: { id: req.body.oldId } }).then(data => {
//     if (data) {
//       announcement.update({ isTop: 1 }, { where: { id: req.body.id } }).then(data => {
//         if (data) {
//           res.send({
//             code: 200,
//             message: '置顶成功'
//           })
//         } else {
//           res.send({
//             code: 400,
//             message: '置顶失败'
//           })
//         }
//       })
//     } else {
//       res.send({
//         code: 400,
//         message: '置顶失败'
//       })
//     }
//   })

// })
// 置顶公告2
router.post('/Topping', (req, res, next) => {
  console.log(req.body)
  if (req.body.id === '') {
    res.send({
      code: 400,
      message: '参数错误'
    })
  }
  announcement.update({ isTop: 0 }, { where: { isTop: 1, clubName: req.body.clubName } }).then(data => {
    if (data) {
      console.log(data)
      announcement.update({ isTop: 1 }, { where: { id: req.body.id } }).then(data => {
        if (data) {
          res.send({
            code: 200,
            message: '置顶成功'
          })
        } else {
          res.send({
            code: 400,
            message: '置顶失败'
          })
        }
      })
    } else {
      res.send({
        code: 400,
        message: '置顶失败'
      })
    }
  }).catch(err => {
    console.log(err)
  })

})
// 取消置顶
router.post('/qiutTopping', (req, res, next) => {
  if (req.body.id === '') {
    res.send({
      code: 400,
      message: '参数错误'
    })
  }
  announcement.update({ isTop: 0 }, { where: { id: req.body.id } }).then(data => {
    if (data) {
      res.send({
        code: 200,
        message: '取消成功'
      })
    } else {
      res.send({
        code: 400,
        message: '取消失败'
      })
    }
  })
})
module.exports = router;
const express = require('express');
const router = express.Router();
const news = require('../model/index').news
const Sequelize = require('sequelize')
const Op = Sequelize.Op
router.post('/addNews', (req, res, next) => {
  let { newsTitle, newsImage, newsSource, newsContent } = req.body.news
  if (newsTitle === "" || newsImage === "" || newsSource === "" || newsContent === "") {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  news.findOrCreate({ where: { newsTitle: newsTitle }, defaults: { newsTitle: newsTitle, newsImage: newsImage, newsSource: newsSource, newsContent: newsContent } }).then(([data, created]) => {
    if (created) {
      res.send({
        code: 200,
        message: "添加成功",
        data: data.newsId
      })
    } else {
      res.send({
        code: 400,
        message: '添加失败'
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
router.post('/getNewsList', (req, res, next) => {
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
  if (serchData.newsTitle != '') {
    serchdata['newsTitle'] = { $like: '%' + serchData.newsTitle + '%' }
  }
  if (serchData.starTime !== null && serchData.endTime !== null) {
    console.log(1)
    serchdata['createdAt'] = { [Op.between]: [serchData.starTime, serchData.endTime] }
  } else if (serchData.starTime !== null && serchData.endTime === null) {
    console.log(2)
    let now = new Date()
    serchdata['createdAt'] = { [Op.between]: [serchData.starTime, now] }
  } else if (serchData.starTime === null && serchData.endTime !== null) {
    console.log(3)
    serchdata['createdAt'] = { [Op.lte]: serchData.endTime }
  }
  if (serchData.newsSource != '') {
    serchdata['newsSource'] = { $like: '%' + serchData.newsSource + '%' }
  }
  // if (serchData.Admin_Name != '') {
  //   serchdata['Admin_Name'] = { $like: '%' + serchData.Admin_Name + '%' }
  // }
  news
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
router.post('/updateNews', (req, res, next) => {
  let { newsId, newsTitle, newsImage, newsSource, newsContent } = req.body.news
  if (newsId === "" || newsTitle === "" || newsImage === "" || newsSource === "" || newsContent === "") {
    res.send({
      code: 400,
      message: '参数不全'
    })
  }
  news.update({ newsTitle: newsTitle, newsImage: newsImage, newsSource: newsSource, newsContent: newsContent }, { where: { newsId: newsId } }).then(data => {
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
  }).catch(err => {
    console.log(err)
    res.send({
      code: 400,
      message: '系统异常'
    })
  })
})
router.post('/deleteNews', (req, res, next) => {
  let id = Number(req.body.id)
  if (id === '') {
    res.send({
      code: 400,
      message: '您没有选择要删除的数据'
    })
  }
  news.destroy({
    where: {
      newsId: id
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
  }).catch(err => {
    console.log(err)
    res.send({
      code: 400,
      message: '系统异常'
    })
  })
})




module.exports = router;
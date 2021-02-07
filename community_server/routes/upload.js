const express = require('express')
let router = express.Router();
const multer = require('multer')
const fs = require('fs')
const path = require('path')
//single是单图片上传，多图片上传 array ,single里面就是上传图片的key值 
//和图片相关的是req.file 
// app.use('/public', express.static(path.join(__dirname, './www')))

router.post('/uploadImg', multer().single('img'), (req, res) => {
  let { buffer, mimetype } = req.file;
  let fileName = (new Date()).getTime() + parseInt(Math.random() * 3435) + parseInt(Math.random() * 6575);
  let fileType = mimetype.split('/')[1];
  let filePath = path.join(__dirname, '/public/images/uploadImg')
  let apath = `http://localhost:3000/public/images/uploadImg/${fileName}.${fileType}`
  fs.writeFile(`./public/images/uploadImg/${fileName}.${fileType}`, buffer, (data) => {
    if (data) {
      res.send({ code: 400, msg: "上传失败" })
    } else {
      res.send({ code: 200, msg: "上传成功", imgPath: apath })
    }
  })
})


module.exports = router;

// components/actItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    actId: {
      type: Number,
      value: 1,
    },
    url: {
      type: String,
      value: 'http://localhost:3000/wx',
    },
    actType:{
      type:String,
      value:'进行中',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    actData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getActData: function() {
      var that = this
      console.log(that.data.actId)
      console.log(that.data.actType)
      wx.request({
        url: this.data.url + '/activity/getOneAvt',
        method: 'POST',
        data: {
          actId: that.data.actId,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
          if (res.data.code == 200) {
            that.setData({
              actData:res.data.list
            })
            console.log(that.data.actData)
            that.setData({
              // ["actData.createdAt"]: that.dateFormat("YYYY-mm-dd HH:MM", that.data.actData.createdAt),
              ["actData.startTime"]: that.dateFormat("YYYY-mm-dd HH:MM", that.data.actData.startTime),
              // ["actData.updatedAt"]: that.dateFormat("YYYY-mm-dd HH:MM", that.data.actData.updatedAt)
            })
          } else {
            console.log('出错了')
          }
        }
      })
    },
    // 时间转换函数
    dateFormat: function (fmt, time) {
      let date = new Date(time);
      console.log(date)
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
      };
      console.log(fmt)
      return fmt;
    },
  },
  // 组件进入页面节点树
  attached: function () {
    this.getActData()
  },
})

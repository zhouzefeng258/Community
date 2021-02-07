Component({
  properties: {
    swiperList: {
      type: Array,
      value: [ // 默认数据（可以从引用组件处的属性传入该属性值）
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=524661168,971104595&fm=26&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2162464902,1813581798&fm=26&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2197586356,1203513576&fm=15&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=957308583,1357713210&fm=26&gp=0.jpg"
      ]
    }
  },
  data: {
    currentIndex: 0  // 初始高亮下标
  },
  methods: {
    /* 这里实现控制自定义轮播指示点高亮 */
    swiperChange(e) {
      this.setData({
        currentIndex: e.detail.current
      })
    }
    
  } 
})

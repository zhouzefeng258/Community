let menus = {
  menuItem: [
    // {
    //   index: '1',
    //   name: '样例',
    //   url: '/index',
    //   icon: 'el-icon-message',
    //   Jurisdiction: 0,
    //   children: [
    //     {
    //       index: '1-1',
    //       name: '表格',
    //       url: '/index/item1-1',
    //       Jurisdiction: 1
    //     }, {
    //       index: '1-2',
    //       name: '选项二',
    //       url: '/index/item1-2',
    //       Jurisdiction: 1
    //     }, {
    //       index: '1-3',
    //       name: '选项三',
    //       url: '/index/item1-3',
    //       Jurisdiction: 0
    //     }
    //   ]
    // },
    {
      index: '2',
      name: '社团管理',
      url: '/index',
      icon: 'el-icon-message',
      Jurisdiction: 0,
      children: [
        {
          index: '2-1',
          name: '社团审批',
          url: '/index/communityApproval',
          Jurisdiction: 1
        },
        {
          index: '2-2',
          name: '全部社团',
          url: '/index/communityInfo',
          Jurisdiction: 1,
          children: [
            {
              index: '2-2-1',
              name: '修改社团信息',
              url: '/index/communityInfo/editCommunityInfo'
            }
          ]
        }, {
          index: '2-3',
          name: '我的社团',
          url: '/index/myCommuntiyInfo',
          Jurisdiction: 2
        },
        {
          index: '2-4',
          name: '加入社团审批',
          url: '/index/clubMemberApproval',
          Jurisdiction: 2
        },
        {
          index: '2-5',
          name: '成员管理',
          url: '/index/clubMember',
          Jurisdiction: 2
        },
        {
          index: '2-6',
          name: '社团公告',
          url: '/index/announcement',
          Jurisdiction: 0
        }
      ]
    },
    {
      index: '3',
      name: '新闻管理',
      url: '/index',
      icon: 'el-icon-message',
      Jurisdiction: 1,
      children: [
        {
          index: '3-1',
          name: '发布新闻',
          url: '/index/distributeNews',
          Jurisdiction: 1
        },
        {
          index: '3-2',
          name: '全部新闻',
          url: '/index/newsList',
          Jurisdiction: 1,
          children: [
            {
              index: '3-2-1',
              name: '编辑新闻',
              url: '/index/newsList/editNews'
            }
          ]
        }
      ]
    },
    {
      index: '4',
      name: '活动管理',
      url: '/index',
      icon: 'el-icon-message',
      Jurisdiction: 0,
      children: [
        // {
        //   index: '3-1',
        //   name: '发布新闻',
        //   url: '/index/distributeNews',
        //   Jurisdiction: 1
        // },
        {
          index: '4-1',
          name: '全部活动',
          url: '/index/activityList',
          Jurisdiction: 0,
          children: [
            {
              index: '4-1-1',
              name: '编辑活动',
              url: '/index/activityList/editActivity'
            }
          ]
        },
        {
          index: '4-2',
          name: '活动审批',
          url: '/index/activityApproval',
          Jurisdiction: 1,
          children: [
            {
              index: '4-2-1',
              name: '查看活动',
              url: '/index/activityApproval/viewActivityInfo'
            }
          ]
        }, {
          index: '4-3',
          name: '发布活动',
          url: '/index/distributeActivity',
          Jurisdiction: 2
        }, {
          index: '4-4',
          name: '报名记录',
          url: '/index/activityRecord',
          Jurisdiction: 0
        }

      ]
    }, {
      index: '5',
      name: '用户管理',
      url: '/index/wxUserList',
      icon: 'el-icon-message',
      Jurisdiction: 1
    }, {
      index: '6',
      name: '管理员管理',
      url: '/index/administrators',
      icon: 'el-icon-message',
      Jurisdiction: 1
    }, {
      index: '7',
      name: '社团类型管理',
      url: '/index/clubType',
      icon: 'el-icon-message',
      Jurisdiction: 1
    }, {
      index: '8',
      name: '院系管理',
      url: '/index/Department',
      icon: 'el-icon-message',
      Jurisdiction: 1
    }, {
      index: '9',
      name: '轮播图管理',
      url: '/index/lunbotu',
      icon: 'el-icon-message',
      Jurisdiction: 1
    }, {
      index: '10',
      name: '用户反馈',
      url: '/index/proposal',
      icon: 'el-icon-message',
      Jurisdiction: 1
    }
  ]
}
export default menus

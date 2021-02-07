import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/admin/login.vue'),
      children: [
        {
          path: '/',
          name: 'log',
          component: () => import('../components/admin/log.vue')
        },
        {
          path: '/reg',
          name: 'log',
          component: () => import('../components/admin/reg.vue')
        }
      ]
    }, {
      path: '/create',
      name: 'Create',
      component: () => import('../views/admin/createSocieties.vue')
    }, {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          meta: {
            index: '0',
            breadcrumb: [{ path: '/index', name: '首页' }]
          },
          path: '/index',
          name: 'shouye',
          component: () => import('../views/admin/shouye.vue')
        },
        {
          meta: {
            index: '2-1',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/communityApproval', name: '社团审批' }]
          },
          path: '/index/communityApproval',
          name: '社团审批',
          component: () => import('../views/community/communityApproval.vue')
        },
        {
          meta: {
            index: '2-2',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/communityInfo', name: '全部社团' }]
          },
          path: '/index/communityInfo',
          name: '全部社团',
          component: () => import('../views/community/communityInfo.vue')
        },
        {
          meta: {
            index: '2-2-1',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/communityInfo', name: '全部社团' }, { path: '/index/communityInfo/editCommunityInfo', name: '修改社团信息' }]
          },
          path: '/index/communityInfo/editCommunityInfo',
          name: '修改社团信息',
          component: () => import('../views/community/editCommunityInfo.vue')
        },
        {
          meta: {
            index: '2-3',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/myCommuntiyInfo', name: '我的社团' }]
          },
          path: '/index/myCommuntiyInfo',
          name: '我的社团',
          component: () => import('../views/community/myCommuntiyInfo.vue')
        },
        {
          meta: {
            index: '2-4',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/clubMemberApproval', name: '加入社团审批' }]
          },
          path: '/index/clubMemberApproval',
          name: '加入社团审批',
          component: () => import('../views/community/clubMemberApproval.vue')
        },
        {
          meta: {
            index: '2-5',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/clubMember', name: '社团成员' }]
          },
          path: '/index/clubMember',
          name: '社团成员',
          component: () => import('../views/community/clubMember.vue')
        },
        {
          meta: {
            index: '2-6',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/announcement', name: '社团公告' }]
          },
          path: '/index/announcement',
          name: '社团公告',
          component: () => import('../views/community/announcement.vue')
        },
        { // 以下为新闻模块页面
          meta: {
            index: '3-1',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/distributeNews', name: '发布新闻' }]
          },
          path: '/index/distributeNews',
          name: '发布新闻',
          component: () => import('../views/news/distributeNews.vue')
        },
        {
          meta: {
            index: '3-2',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/newsList', name: '全部新闻' }]
          },
          path: '/index/newsList',
          name: '全部新闻',
          component: () => import('../views/news/newsList.vue')
        },
        {
          meta: {
            index: '3-2-1',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/newsList', name: '全部新闻' }, { path: '/index/newsList/editNews', name: '编辑新闻' }]
          },
          path: '/index/newsList/editNews',
          name: '编辑新闻',
          component: () => import('../views/news/editNews.vue')
        },
        { // 以下为活动模块页面
          meta: {
            index: '4-1',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/activityList', name: '全部活动' }]
          },
          path: '/index/activityList',
          name: '全部活动',
          component: () => import('../views/activity/activityList.vue')
        },
        {
          meta: {
            index: '4-1-1',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/activityList', name: '全部活动' }, { path: '/index/activityList/editActivity', name: '编辑活动' }]
          },
          path: '/index/activityList/editActivity',
          name: '编辑活动',
          component: () => import('../views/activity/editActivity.vue')
        },
        {
          meta: {
            index: '4-2',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/activityApproval', name: '活动审批' }]
          },
          path: '/index/activityApproval',
          name: '活动审批',
          component: () => import('../views/activity/activityApproval.vue')
        },
        {
          meta: {
            index: '4-2-1',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/activityApproval', name: '活动审批' }, { path: '/index/activityApproval/viewActivityInfo', name: '查看活动' }]
          },
          path: '/index/activityApproval/viewActivityInfo',
          name: '查看活动',
          component: () => import('../views/activity/viewActivityInfo.vue')
        },
        {
          meta: {
            index: '4-3',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/distributeActivity', name: '发布活动' }]
          },
          path: '/index/distributeActivity',
          name: '发布活动',
          component: () => import('../views/activity/distributeActivity.vue')
        },
        {
          meta: {
            index: '4-4',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/activityRecord', name: '活动记录' }]
          },
          path: '/index/activityRecord',
          name: '发布活动',
          component: () => import('../views/activity/activityRecord.vue')
        },
        {
          meta: {
            index: '5',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/wxUserList', name: '用户管理' }]
          },
          path: '/index/wxUserList',
          name: '用户管理',
          component: () => import('../views/wxUser/wxUserList.vue')
        },
        {
          meta: {
            index: '6',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/administrators', name: '管理员管理' }]
          },
          path: '/index/administrators',
          name: '管理员管理',
          component: () => import('../views/administrators/administrators.vue')
        }, {
          meta: {
            index: '7',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/clubType', name: '用户反馈' }]
          },
          path: '/index/clubType',
          name: '社团类型管理',
          component: () => import('../views/other/clubType.vue')
        }, {
          meta: {
            index: '8',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/Department', name: '用户反馈' }]
          },
          path: '/index/Department',
          name: '分院管理',
          component: () => import('../views/other/Department.vue')
        }, {
          meta: {
            index: '9',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/lunbotu', name: '轮播图管理' }]
          },
          path: '/index/lunbotu',
          name: '轮播图管理',
          component: () => import('../views/lunbotu/lunbotu.vue')
        }, {
          meta: {
            index: '10',
            breadcrumb: [{ path: '/index', name: '首页' }, { path: '/index/proposal', name: '用户反馈' }]
          },
          path: '/index/proposal',
          name: '用户反馈',
          component: () => import('../views/administrators/proposal.vue')
        }
      ]
    }
  ]
})

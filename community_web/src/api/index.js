import axios from 'axios'

// export let address = 'http://localhost:3000'
export let address = 'http://154.8.182.159:3000'
// 图片上传或者文件上传类接口
// 图片
export const uploadImg = params => { return axios.post(address + '/upload/uploadImg', params, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 实验接口
export const getlist = params => { return axios.post(address + '/user/getList', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }

export const getlist2 = params => { return axios.post(address + '/user/getList2', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
export const updateUser = params => { return axios.post(address + '/user/updateUser', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
export const deleteUser = params => { return axios.post(address + '/user/deleteUser', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }

// 后台登陆接口
export const Login = params => { return axios.post(address + '/backstage/admin/Login', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 注册账号
export const register = params => { return axios.post(address + '/backstage/admin/reg', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 社团模块
// 社团创建申请接口
export const createdClub = params => { return axios.post(address + '/backstage/communityApproval/createdCommunity', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 获取待审核的社团申请列表
export const getApproveList = params => { return axios.post(address + '/backstage/communityApproval/getApproveList', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 查询审核结果
export const getAuditResults = params => { return axios.post(address + '/backstage/communityApproval/getAuditResults', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 社团审核操作接口
export const clubApproved = params => { return axios.post(address + '/backstage/communityApproval/Approved', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 删除社团审核记录
export const deleteClubAuditRecord = params => { return axios.post(address + '/backstage/communityApproval/deleteClubAuditRecord', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 获取社团信息接口
export const getCommunityInfoList = params => { return axios.post(address + '/backstage/communityInfo/getCommunityInfoList', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 更新社团信息接口
export const updateCommunityInfo = params => { return axios.post(address + '/backstage/communityInfo/updateCommunityInfo', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 删除社团接口
export const deleteCommunityInfo = params => { return axios.post(address + '/backstage/communityInfo/deleteCommunityInfo', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 获取我的社团信息的接口
export const getCommunityInfoByStuentdId = params => { return axios.post(address + '/backstage/communityInfo/getCommunityInfoByStuentdId', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 新闻模块
// 添加新闻
export const addNews = params => { return axios.post(address + '/backstage/news/addNews', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 获取新闻列表
export const getNewsList = params => { return axios.post(address + '/backstage/news/getNewsList', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 编辑新闻
export const updateNews = params => { return axios.post(address + '/backstage/news/updateNews', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 删除新闻
export const deleteNews = params => { return axios.post(address + '/backstage/news/deleteNews', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 获取活动信息
// 获取活动列表
export const getActivityList = params => { return axios.post(address + '/backstage/activitiy/getActivityList', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 申请举办活动
export const addActivity = params => { return axios.post(address + '/backstage/activitiy/addActivity', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 审批活动
export const activityApproval = params => { return axios.post(address + '/backstage/activitiy/activityApproval', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 修改活动信息
export const updatedActivity = params => { return axios.post(address + '/backstage/activitiy/updatedActivity', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 删除活动
export const deleteActivity = params => { return axios.post(address + '/backstage/activitiy/deleteActivity', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 获取活动的报名记录
export const getActivitieEnrollList = params => { return axios.post(address + '/backstage/activitieEnroll/getActivitieEnrollList', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 删除报名记录
export const deleteActivitieEnroll = params => { return axios.post(address + '/backstage/activitieEnroll/deleteActivitieEnroll', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 用户相关
// 获取用户列表
export const getUserList = params => { return axios.post(address + '/backstage/wxUser/getUserList', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 编辑用户信息
export const updatedUser = params => { return axios.post(address + '/backstage/wxUser/updatedUser', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 删除用户
export const deleteWxUser = params => { return axios.post(address + '/backstage/wxUser/deleteUser', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 将用户踢出社团
export const quitClub = params => { return axios.post(address + '/backstage/wxUser/qiutCLub', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 管理员模块
// 获取管理员信息
export const getAdminList = params => { return axios.post(address + '/backstage/admin/getAdminList', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 增加管理员
export const addAdmin = params => { return axios.post(address + '/backstage/admin/addAdmin', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 删除管理员
export const deleteAdmin = params => { return axios.post(address + '/backstage/admin/deleteAdmin', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 修改管理员信息
export const editAdmin = params => { return axios.post(address + '/backstage/admin/updateAdmin', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 加入社团的审核模块
// 加入社团审批
export const memberApproval = params => { return axios.post(address + '/backstage/MemberShip/Approval', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 获取社团审批列表
export const getMemberShipApprovalList = params => { return axios.post(address + '/backstage/MemberShip/getMemberShipApprovalList', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 删除审批记录
export const deleteMemberShip = params => { return axios.post(address + '/backstage/MemberShip/deleteMemberShip', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 轮播图相关
// 获取轮播图列表篇
export const getLunbotuList = params => { return axios.post(address + '/backstage/lunbotu/getLunbotuList', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 上传新的轮播图
export const addLunbotu = params => { return axios.post(address + '/backstage/lunbotu/addLunbotu', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 删除轮播图
export const deleteLunbotu = params => { return axios.post(address + '/backstage/lunbotu/deleteLunbotu', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 社团公告模块
// 添加公告
export const addAnnouncement = params => { return axios.post(address + '/backstage/announcement/addAnnouncement', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 获取公告列表
export const getAnnouncementList = params => { return axios.post(address + '/backstage/announcement/getAnnouncementList', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 编辑公告
export const editAnnouncement = params => { return axios.post(address + '/backstage/announcement/editAnnouncement', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 删除列表
export const deleteAnnouncement = params => { return axios.post(address + '/backstage/announcement/deleteAnnouncement', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 置顶公告
export const Topping = params => { return axios.post(address + '/backstage/announcement/Topping', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 取消置顶公告
export const quitTopping = params => { return axios.post(address + '/backstage/announcement/qiutTopping', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 用户反馈模块
// 获取用户反馈列表
export const getProposalList = params => { return axios.post(address + '/backstage/proposal/getProposalList', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 删除用户反馈
export const deleteProposal = params => { return axios.post(address + '/backstage/proposal/deleteProposal', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 社团类型管理相关接口
// 获取社团类型（带分页）
export const getClubtypeList = params => { return axios.post(address + '/backstage/other/getClubtypeList', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 增加社团类型
export const addClubtype = params => { return axios.post(address + '/backstage/other/addClubtype', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 删除社团类型
export const deleteClubtype = params => { return axios.post(address + '/backstage/other/deleteClubtype', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 院/系管理相关接口
// 获取院/系（带分页）
export const getDepartmentList = params => { return axios.post(address + '/backstage/other/getDepartmentList', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 增加院/系
export const addDepartment = params => { return axios.post(address + '/backstage/other/addDepartment', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 删除院/系
export const deleteDepartment = params => { return axios.post(address + '/backstage/other/deleteDepartment', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 选项框中的社团类型以及分院获取
// 社团类型
export const getClubtype = params => { return axios.post(address + '/backstage/other/getClubtype', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }
// 分院/系
export const getDepartment = params => { return axios.post(address + '/backstage/other/getDepartment', params, { headers: { 'Content-Type': 'application/json' } }).then(res => { return res.data }).catch(error => { console.log(error) }) }

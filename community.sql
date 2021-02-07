/*
 Navicat Premium Data Transfer

 Source Server         : msaql
 Source Server Type    : MySQL
 Source Server Version : 50610
 Source Host           : localhost:3306
 Source Schema         : community

 Target Server Type    : MySQL
 Target Server Version : 50610
 File Encoding         : 65001

 Date: 23/05/2020 15:12:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activitieenroll
-- ----------------------------
DROP TABLE IF EXISTS `activitieenroll`;
CREATE TABLE `activitieenroll`  (
  `recordId` int(11) NOT NULL AUTO_INCREMENT,
  `activityId` int(11) NOT NULL,
  `activityName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `openid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `studentId` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `clubId` int(11) NOT NULL,
  `clubName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ActivityType` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `startTime` datetime(0) NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`recordId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of activitieenroll
-- ----------------------------
INSERT INTO `activitieenroll` VALUES (12, 7, '第二届王者校园争霸赛', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '周泽锋', '0701160135', 1, '电竞社', '进行中', '2020-05-23 16:00:00', '2020-05-22 17:50:13', '2020-05-22 17:50:13');

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity`  (
  `activityId` int(11) NOT NULL AUTO_INCREMENT,
  `activityName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `activityImage` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `clubName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ActivityLeader` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `startTime` datetime(0) NULL DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ActivityIntro` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `totalNumber` int(10) NULL DEFAULT NULL,
  `surplusNumber` int(10) NULL DEFAULT NULL,
  `ActivityType` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `approvalStatus` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`activityId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES (4, '第一届LOL院内友谊赛', 'http://localhost:3000/public/images/uploadImg/1589978128822.jpeg', '电竞社', '周泽锋', '2020-05-23 16:00:00', '南区14幢教学楼25室', '比赛形式为5V5的形式比赛自由参加，自愿报名的形式。在杨梅处登记名单及参赛项目。为保证等效实力，组建队伍由抽签决定，每团队5人。\n', 10, 10, '进行中', '已通过', '2020-05-20 12:39:47', '2020-05-23 01:14:10');
INSERT INTO `activity` VALUES (5, '测试1', 'http://localhost:3000/public/images/uploadImg/1589980996454.jpeg', '电竞社', '测试1', '2020-05-18 16:00:00', '测试1', '测试活动', 20, 20, '已结束', '待审批', '2020-05-20 13:23:33', '2020-05-20 13:23:33');
INSERT INTO `activity` VALUES (6, '测试2', 'http://localhost:3000/public/images/uploadImg/1589981035404.jpeg', '电竞社', '测试2', '2020-05-18 16:00:00', '测试地点', '顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶', 20, 20, '已结束', '待审批', '2020-05-20 13:24:15', '2020-05-20 13:24:15');
INSERT INTO `activity` VALUES (8, '“藏龙杯”校园摄影比赛', 'http://localhost:3000/public/images/uploadImg/1590158027465.jpeg', '摄影社', '周泽锋', '2020-05-23 14:33:05', '元培学校内', '大赛分摄像组与摄影两个小组，同时都是以“我的趣味大学生活”为主题，内容要求积极向\n.上，照片与视频要具代表意义，看照片与视频要让人看出里面蕴藏的故事。\n', 5, 5, '已结束', '已通过', '2020-05-22 14:35:33', '2020-05-22 14:35:48');
INSERT INTO `activity` VALUES (9, 'fffffff', 'http://localhost:3000/public/images/uploadImg/1590196470344.jpeg', '电竞社', 'yyyy', '2020-05-22 16:00:00', 'yyyy', 'ddddddddddddd', 5, 5, '已结束', '已通过', '2020-05-23 01:14:32', '2020-05-23 01:16:27');

-- ----------------------------
-- Table structure for announcement
-- ----------------------------
DROP TABLE IF EXISTS `announcement`;
CREATE TABLE `announcement`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clubName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `announcementTitle` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `issuer` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `announcement` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `isTop` int(1) NULL DEFAULT 0,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of announcement
-- ----------------------------
INSERT INTO `announcement` VALUES (2, '电竞社', '测试公告2', '周泽锋', '为丰富大学生的日常生活，活跃校园气氛，加强校园文化建设，锻炼学生能力，社团联合会积极鼓励广大学生建立学生社团。\n\n现阶段新社团申报已结束，经资料审核、对负责人答辩及主席团考量，由校团委老师做出决定，现将结果公布如下：\n\n社团对大学以及学生的发展非常重要，希望广大学生积极参与社团的建立与发展。此次落选未成立的社团申请人请不要灰心，积极努力，争取下次通过。通过的社团要发挥社团应有的作用，望共同努力！', 0, '2020-05-18 16:21:27', '2020-05-23 01:12:59');
INSERT INTO `announcement` VALUES (3, '电竞社', '社团宣传方案征稿', '周泽锋', ' 春林初盛，草木萌动。最是春光里，长歌纵酒，说不尽风华年少；燕语细呢喃，倚栏杆，宣纸摹悲欢。煮一壶茶，道尽沧海桑田，三千世事均可感念。字词无声，却诉说着无数精彩故事，让我们将情感融入笔端，用笔墨唤起心中的光。春风十里，我们在盼你投稿而来！', 0, '2020-05-18 16:21:32', '2020-05-22 15:47:57');
INSERT INTO `announcement` VALUES (5, '电竞社', '测试公告', '周泽锋', '根据《武汉大学学生社团管理条例》（武大学工字〔2018〕30号）的相关规定，经学生社团发起人申请、相关资料审查、报院团委研究审核，现通过武汉大学信息管理学院学生“文华之声”俱乐部的成立申请事宜，即日起开始试运行。现将相关信息予以公告：\n\n社团名称：武汉大学信息管理学院学生“文华之声”俱乐部\n\n社团介绍：\n\n文华图专历史悠远，它是武汉大学信息管理学院的开端。它从远处走来，为我们诉说信管院的前世今生。“文华之声”愿为文华图专发声，为信管院一代代的学识渊博的学者、积极向上的学子发声。因此本社团的使命是：普及和传播学院院史院情，不仅要为国内历史最悠久的信息管理学院守史，更要传承与弘扬文华精神，为学院发展贡献力量。社团内部有社长一人、副社长一人及社员若干名。\n\n社团成员名单：\n\n社长：关越\n\n副社长：吴炳婷\n\n社员：冯曾妍、金红梅、李茜、唐婷芳、姜佳慧、余文瑶 、崔玥玥\n\n \n\n特此公告\n\n共青团武汉大学信息管理学院委员会\n\n2018年12月29日', 0, '2020-05-18 16:47:49', '2020-05-20 18:00:22');
INSERT INTO `announcement` VALUES (6, '摄影社', '摄影比赛开始公告', '高元', '<p><strong>活动引言：</strong></p><p>有爱在我们身边，只是我们有没有发现它。家中充满爱;有家是快乐的，无论是家人给予你爱，还是你给予家人爱，你都会觉得非常开心。 家中充满爱，父母无时无刻地关心我们，爱护我们，只要是我们受到一点点伤害，他们都会十分心痛。而同时，我们看见父母辛苦的时候，也会无私地帮助他们，希望减轻他们的负担。以报答他们对我们的爱。万家园陪您一起成长用相机留下“大家”最美的瞬间.</p><p><strong>一、活动主题</strong>： “家和、家美”</p><p><strong> 二、活动时间</strong>： XX年7月1日——XX年9月30日(交作品时间)</p><p><strong>　三、主办单位</strong>：万家园木门北京分公司</p><p><strong>四、策划承办单位</strong>：万家园木门策划部</p><p><strong>五、活动对象</strong>：万家园木门的新老客户</p><p><strong>　六、参赛方式</strong>&nbsp;： 摄影作品征集</p><p><strong>　七、活动目的：</strong></p><p>为了回馈新老客户，为了今后能更好的服务大家。提高万家园木门的产品质量，售后质量。和感恩大家对我们产品的支持与厚爱.</p><p><strong> 八、作品要求</strong>：</p><p>① 所拍照片内容以家和、家美、为主题。</p><p>② 拍摄角度自由把握。</p><p>③ 照片可以是单照也可以是组照。如果是组照参赛，则一组作品控制在3-5张，组照作品可以是不同角度的同处，也可以是相关联的多处景观。</p><p>④ 另付与内容相关的照片介绍，不限字数，可以是由画面讲解您与万家园的不解之缘。</p><p>⑤ 条件允许的话请大家用单反机或专业相机、卡片机(市面上常见数码相机)拍摄，或是有效像素在500万以上的手机。</p><p>⑥ 作品要求绝对原创，发现偷袭或者网上载录的取消比赛资格。</p><p>⑦ 照片不得通过电脑修饰，照片以(.raw或者.jpg)格式，并发于万家园的邮箱。</p><p><strong> 九、评奖标准及评审团队</strong></p><p>1.由万家园设计部的专业人员以及摄影部成员，针对作品的清晰度、角度、内容等方面进行评选。</p><p>2.评选时间10月1日至10月7日如果您中奖我们会以短信和电话的形式通知您，本活动不收取任何费用。</p><p><strong> 十、奖项设置</strong></p><p>本次大赛设置一、二、三等奖和优秀奖;</p><p>一等奖1名(现金1000);</p><p>二等奖1名(现金500);</p><p>三等奖1名(现金200);</p><p>优秀奖若干名(创意格子)。</p><p>注：获奖的照片将于XX年10月7日以后在万家园多处宣传栏处悬挂式的方式晒照片。</p>', 1, '2020-05-22 14:39:34', '2020-05-22 15:03:20');
INSERT INTO `announcement` VALUES (7, '电竞社', 'ddddddddddd', '周泽锋', '<p>dddddddddddddddddddddddddddddddddddd</p>', 1, '2020-05-23 01:12:55', '2020-05-23 01:12:59');

-- ----------------------------
-- Table structure for clubinfo
-- ----------------------------
DROP TABLE IF EXISTS `clubinfo`;
CREATE TABLE `clubinfo`  (
  `clubId` int(11) NOT NULL AUTO_INCREMENT,
  `clubName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `clubIcon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `clubType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `starTotal` int(12) NULL DEFAULT 1,
  `evaluationTimes` int(12) NULL DEFAULT 1,
  `department` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `qqNumber` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `clubIntro` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `president` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `studentId` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `teacher` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `show` int(1) NULL DEFAULT 2,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`clubId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of clubinfo
-- ----------------------------
INSERT INTO `clubinfo` VALUES (1, '电竞社', 'http://localhost:3000/public/images/uploadImg/1590196329624.jpeg', '其他类', 26, 7, '信息与机电工程分院', '258888888', '\nhhhhhhhh', '谢大海', '0701160135', '高大山', 1, '2020-05-13 05:08:33', '2020-05-23 01:12:04');
INSERT INTO `clubinfo` VALUES (2, '摄影社', 'http://localhost:3000/public/images/uploadImg/1589977245686.jpeg', '艺术类', 1, 1, '语言和文学分院', '122222222', '  摄影社团本着“团结、进取、求实、创新”的宗旨，是一个立足于创造性与个性思维相结合的艺术形态，其主要以DV、拍照和文字结合展现文化风采，崇尚艺术与审美。摄影社团是你梦想的殿堂，是你快乐成长的天地，是你交友的乐园。摄影社团成立于2010年，虽然成立的时间不长，虽然他还很年轻，但是近年来，不断培养了一批批摄影方面的优秀人才，成就了不少摄影爱好者的摄影梦，让梦想在摄影社团起航。', '高元', '0701160134', '任五五', 1, '2020-05-13 05:32:30', '2020-05-20 12:31:02');
INSERT INTO `clubinfo` VALUES (3, '筑梦空间协会', 'http://localhost:3000/public/images/uploadImg/1589977661144.jpeg', '其他类', 18, 5, '语言和文学分院', '1017429598', '我们的社团叫“筑梦空间”协会，发起人是建筑学专业。我们一心为丰富校园文化生活，提高专业影响力，为热爱建筑学的学子提供- -个交流学习的空间，同时展示自我，给自己-一个锻炼交流的机会，提升自我，服务他人。\n', '周泽锋', '0701160132', '郑其', 1, '2020-05-16 02:19:52', '2020-05-22 15:30:45');
INSERT INTO `clubinfo` VALUES (4, '测试社团1', '', '文学类', 1, 1, '信息与机电工程分院', '', '', '测试人', '0111111111', '测试1', 2, '2020-05-23 01:15:19', '2020-05-23 01:15:19');

-- ----------------------------
-- Table structure for clubtype
-- ----------------------------
DROP TABLE IF EXISTS `clubtype`;
CREATE TABLE `clubtype`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clubtype` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of clubtype
-- ----------------------------
INSERT INTO `clubtype` VALUES (1, '科技类');
INSERT INTO `clubtype` VALUES (2, '艺术类');
INSERT INTO `clubtype` VALUES (3, '其他类');
INSERT INTO `clubtype` VALUES (4, '文学类');
INSERT INTO `clubtype` VALUES (5, '体育类');

-- ----------------------------
-- Table structure for communityapproval
-- ----------------------------
DROP TABLE IF EXISTS `communityapproval`;
CREATE TABLE `communityapproval`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clubName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `president` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `studentId` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `teacher` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Reason` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `clubType` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `department` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` int(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of communityapproval
-- ----------------------------
INSERT INTO `communityapproval` VALUES (1, '电竞社', '周泽锋', '0701160135', '余周周', '水水水水水水水水水水水水水水水水水水水', '文学类', '信息与机电工程分院', 2);
INSERT INTO `communityapproval` VALUES (3, '文学社', '周则对', '0701160134', '啊哈哈哈', '顶顶顶顶顶', '文学类', '语言和文学分院', 2);
INSERT INTO `communityapproval` VALUES (5, '测试社团1', '测试人', '0111111111', '测试1', '只是测试', '文学类', '信息与机电工程分院', 2);
INSERT INTO `communityapproval` VALUES (6, '测试社团2', '测试人2', '0111111112', '测试2', '只是测试', '艺术类', '语言和文学分院', 3);
INSERT INTO `communityapproval` VALUES (7, '棋艺社', '测试', '0111111113', '测试', '只是测试', '艺术类', '经济与管理分院', 1);
INSERT INTO `communityapproval` VALUES (8, '无人机社', '随便社', '0701160125', '测试用', '测试用', '科技类', '语言文学分院', 1);

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES (1, '信息与机电工程分院');
INSERT INTO `department` VALUES (2, '语言文学分院');
INSERT INTO `department` VALUES (3, '服装与艺术分院');
INSERT INTO `department` VALUES (5, '工商管理分院');
INSERT INTO `department` VALUES (6, '医药与健康分院');

-- ----------------------------
-- Table structure for ht_admin
-- ----------------------------
DROP TABLE IF EXISTS `ht_admin`;
CREATE TABLE `ht_admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `passWord` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `studentId` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `clubName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `jurisdiction` int(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of ht_admin
-- ----------------------------
INSERT INTO `ht_admin` VALUES (1, 'admin', '周泽锋', 'admin', NULL, NULL, 1);
INSERT INTO `ht_admin` VALUES (4, 'admin1234', '周泽锋', 'admin1234', '0701160135', '电竞社', 2);
INSERT INTO `ht_admin` VALUES (6, 'admin123', '高元', 'admin123', '0701160134', '摄影社', 2);
INSERT INTO `ht_admin` VALUES (7, 'admin222', '周泽锋', 'admin222', '0701160132', '筑梦空间协会', 2);

-- ----------------------------
-- Table structure for lunbotu
-- ----------------------------
DROP TABLE IF EXISTS `lunbotu`;
CREATE TABLE `lunbotu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imagePath` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of lunbotu
-- ----------------------------
INSERT INTO `lunbotu` VALUES (1, 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=524661168,971104595&fm=26&gp=0.jpg');
INSERT INTO `lunbotu` VALUES (2, 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2162464902,1813581798&fm=26&gp=0.jpg');
INSERT INTO `lunbotu` VALUES (3, 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2197586356,1203513576&fm=15&gp=0.jpg');
INSERT INTO `lunbotu` VALUES (5, 'http://localhost:3000/public/images/uploadImg/1590196698652.png');

-- ----------------------------
-- Table structure for membership
-- ----------------------------
DROP TABLE IF EXISTS `membership`;
CREATE TABLE `membership`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `studentId` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `openid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `clubName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reason` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 70 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of membership
-- ----------------------------
INSERT INTO `membership` VALUES (5, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '顶顶顶顶顶顶顶顶顶顶', '已通过', '2020-05-10 13:07:08', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (8, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'sssssssssssssssssssssssssssssssss', '已通过', '2020-05-10 13:47:04', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (9, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'ddddddddddddddddddddddddddd', '已通过', '2020-05-10 14:38:19', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (11, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'wwwwwwwwwww', '已通过', '2020-05-10 14:45:25', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (12, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '顶顶顶顶顶顶顶', '已通过', '2020-05-10 14:49:56', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (13, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'fffffffffff', '已通过', '2020-05-10 14:54:35', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (14, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'ddddddddddddddddddddddd', '已通过', '2020-05-10 14:56:40', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (18, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '顶顶顶顶顶顶顶顶顶顶', '已通过', '2020-05-16 01:43:09', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (19, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '顶顶顶顶顶顶顶顶顶顶顶', '已通过', '2020-05-16 02:10:06', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (20, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃呃', '已通过', '2020-05-16 02:23:25', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (21, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦', '已通过', '2020-05-16 02:54:08', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (22, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '顶顶顶顶顶顶顶顶顶顶顶顶顶', '已通过', '2020-05-16 06:53:19', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (23, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '文学社', '烦烦烦烦烦烦烦烦烦烦烦烦', '已通过', '2020-05-16 06:56:28', '2020-05-16 17:14:24');
INSERT INTO `membership` VALUES (24, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '顶顶顶顶顶顶顶顶顶顶顶', '已通过', '2020-05-16 15:30:45', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (25, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'dddddddddddddddddddddddd', '已通过', '2020-05-16 15:58:42', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (26, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'ddddddddddddddddddddddddddddd', '已通过', '2020-05-16 16:01:17', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (27, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'dddddddddddd', '已通过', '2020-05-16 16:02:44', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (28, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'ddddddddddddddddddddd', '已通过', '2020-05-16 16:15:12', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (29, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '顶顶顶顶顶顶顶的', '已通过', '2020-05-16 16:18:15', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (30, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'ssssssssssssssssssss', '已通过', '2020-05-16 16:19:52', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (31, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'dddddddddddddddd1', '已通过', '2020-05-16 16:24:24', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (32, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'dddddddddddddddddd', '已通过', '2020-05-16 16:26:18', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (33, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'ffffffffffffffffffffffffff', '已通过', '2020-05-16 16:29:01', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (34, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'dddddddddddddddddd', '已通过', '2020-05-16 16:29:39', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (35, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'fffffffffffffffffffffffffffff', '已通过', '2020-05-16 16:30:09', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (36, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '文学社', 'ddddddddddddddddd', '已通过', '2020-05-16 16:31:20', '2020-05-16 17:14:24');
INSERT INTO `membership` VALUES (37, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'ddddddddddddddd', '已通过', '2020-05-16 16:33:56', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (38, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'dddddddddddddddddd', '已通过', '2020-05-16 16:35:19', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (39, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '帆帆帆帆帆帆帆帆帆帆烦烦烦', '已通过', '2020-05-16 16:38:57', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (40, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'dddddddddddddd', '已通过', '2020-05-16 16:40:19', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (41, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶', '已通过', '2020-05-16 16:42:46', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (42, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'fffffffffffffffffffffffff', '已通过', '2020-05-16 16:47:49', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (43, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'fffffffffffffffffffffffffff', '已通过', '2020-05-16 16:52:12', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (44, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '反对顶顶顶顶顶', '已通过', '2020-05-16 16:56:17', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (45, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'ffffffffffffffffff', '已通过', '2020-05-16 17:06:59', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (46, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '反反复复烦烦烦烦烦烦烦烦烦', '已通过', '2020-05-16 17:13:03', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (47, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '文学社', '烦烦烦烦烦烦烦烦烦烦烦烦', '已通过', '2020-05-16 17:13:49', '2020-05-16 17:14:24');
INSERT INTO `membership` VALUES (48, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'ffffffffffffff', '已通过', '2020-05-16 17:18:30', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (49, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'dddddddddddddddd', '已通过', '2020-05-16 17:19:41', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (50, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'dddddddddddddd', '已通过', '2020-05-18 17:27:23', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (51, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'dddddddddddddd', '已通过', '2020-05-20 13:29:38', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (52, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '顶顶顶顶顶顶顶的', '已通过', '2020-05-20 16:18:27', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (53, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '顶顶顶顶的', '已通过', '2020-05-20 16:18:58', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (54, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '顶顶顶顶顶顶顶的', '已通过', '2020-05-20 16:23:33', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (55, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '顶顶顶顶顶顶顶顶顶顶的', '已通过', '2020-05-20 18:24:24', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (56, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '顶顶顶顶顶顶顶的', '已通过', '2020-05-22 13:19:27', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (57, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '顶顶顶顶顶顶顶顶顶顶的的', '已通过', '2020-05-22 13:22:28', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (58, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '顶顶顶顶的', '已通过', '2020-05-22 13:24:34', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (59, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '帆帆帆帆', '已通过', '2020-05-22 13:35:20', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (60, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '端到点', '已通过', '2020-05-22 14:03:22', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (61, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '摄影社', '顶顶顶顶', '已通过', '2020-05-22 14:36:12', '2020-05-22 15:03:35');
INSERT INTO `membership` VALUES (63, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '摄影社', 'ddddddddddddddddddd', '已通过', '2020-05-22 15:03:29', '2020-05-22 15:03:35');
INSERT INTO `membership` VALUES (64, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '筑梦空间协会', 'ddddddddddddd', '已通过', '2020-05-22 15:09:48', '2020-05-22 15:09:55');
INSERT INTO `membership` VALUES (65, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'ddddddddd', '已通过', '2020-05-22 15:43:32', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (66, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'ffffffff', '已通过', '2020-05-22 15:53:02', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (67, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '端到点的1', '已通过', '2020-05-23 01:08:26', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (68, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', 'd端到点的1', '已通过', '2020-05-23 01:12:28', '2020-05-23 01:13:33');
INSERT INTO `membership` VALUES (69, '周泽锋', '0701160135', 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', '电竞社', '端到点的', '已通过', '2020-05-23 01:13:26', '2020-05-23 01:13:33');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news`  (
  `newsId` int(11) NOT NULL AUTO_INCREMENT,
  `newsTitle` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `newsImage` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `newsSource` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `newsContent` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`newsId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES (1, '学院召开校友工作推进会', 'http://localhost:3000/public/images/uploadImg/1589979440015.png', '（来源：校友联络办公室　周叔炜／文、摄）', '<p>为进一步推进校友工作，加强学院与校友之间的联系，充分发挥校友在母校建设与发展中的重要作用，促进学院和校友的共同发展，5月22日上午，学院在图书馆813会议室召开校友工作推进会。学院院长沈红卫，相关职能部门负责人和各分院（副）书记参加会议，会议由院党委委员、纪委书记俞国芬主持。</p><p><br></p><p><br></p><p class=\"ql-align-center\"><img src=\"http://www.ypc.edu.cn/__local/A/6C/61/C5F9064CD8909F08496617F5AD5_C56B37D2_C958.jpg\" width=\"500\"></p><p><br></p><p> 俞国芬首先感谢学院各部门对校友工作的支持，并对新出台的《绍兴文理学院元培学辽关于进一步加强和改进校友工作的若干意见》文件从指导思想、组织保障、工作举措等三方面进行解读。她指出，校友工作是学院整体工作的重要组成部分，也是学院使命与功能的社会化延伸。校友既是体现办学水平的重要指标，也是建设发展的宝贵资源和重要力量。 她强调，校友工作要始终围绕三个方面进行推进，一是要进一步凝聚校友工作的共识；二是要进一步创新校友工作的方式；三是要进一步凝练提升校友工作的成果。</p><p> 沈红卫充分肯定了前期校友工作取得的成绩，并对下一阶段校友工作提出了要求。他指出，校友是学院发展最宝贵的资源和财富，校友工作更是学院工作的重要方面之一。重视校友工作、做好校友工作,对于推动学院事业快速发展,具有重要意义：一是校友是学院品牌力、社会美誉度的重要载体，一个学校好不好，关键是看学生好不好，最终是看校友在社会上的口碑和影响力；二是校友是学院办学的重要资源和资产，是学院有形或无形中依靠和依托的资源和资产；三是校友工作是学院其他工作的依托，可以通过校友的组织，依靠校友的力量来推进学院的招生、创就业等工作。他强调，各单位要高度重视，充分认识校友工作的重要地位和作用，将校友工作作为一项长期工作，贯穿于日常工作中。沈红卫对下一阶段校友工作提出三点要求：一是要用心，各单位要创新工作方法，密切联系校友，主动作为，形成长效机制；二是要用情，要真诚地为广大校友提供优质服务，积极引导校友集智、集心、集力回馈母校；三是要用力，要全面构建具有学院特色的校友工作新格局，用力谋划，合力思考，共同把校友工作做得更加出色，更加出彩。</p><p> 会上，校友工作领导小组办公室负责人简要总结学院2019年校友工作取得的成绩，并对2020年的校友工作从四个方面进行部署。会议还就建立地方校友服务中心、行业校友组织以及其他日常校友工作进行了交流。</p><p><br></p><p class=\"ql-align-center\"><br></p>', '2020-05-20 12:57:30', '2020-05-22 14:18:06');
INSERT INTO `news` VALUES (2, '不负春光，建筑工程分院防疫复学进行时', 'http://localhost:3000/public/images/uploadImg/1589979551369.jpeg', '建筑工程分院媒体中心 郑丽琴/文 吴邵晗/摄', '<p>	绿草为坪，蓝天为幕，繁花为篱，从5月6日起至11日，元培学子错峰开学，时隔120余天，建筑工程分院的同学们在元培再次重逢。为保障师生健康平安复学，分院通过采取一系列有效举措，齐心战“疫”，随处可见的防疫标语和免洗洗手液、教学楼内设立的临时隔离点、及时消毒的教室……全力为学生平安返校保驾护航。</p><p>	</p><p class=\"ql-align-center\"><img src=\"http://www.ypc.edu.cn/__local/B/97/C1/19A4A064DB1003426A62AE9C2B0_74D77FB7_1CE62.jpg\" width=\"500\"></p><p class=\"ql-align-center\">各站点接站工作</p><p><br></p><p class=\"ql-align-center\"><img src=\"http://www.ypc.edu.cn/__local/1/EB/62/10AEBA80E808E2DBDE9B87CA3F2_B643BCA5_BB12.jpg\" width=\"500\"></p><p class=\"ql-align-center\"><img src=\"http://www.ypc.edu.cn/__local/4/9B/16/82CBC52D4E18EE779F7839A4068_1668A9A4_5F3D.jpg\" width=\"500\"></p><p class=\"ql-align-center\">同学们、家长们感谢学院</p><p>	</p><p>	连日来，为了尽可能减少同学们在回校途中对外接触，学院在绍兴北站、市客运中心、市客运西站、柯桥客运中心、奥体中心（私家车接驳点）设置了服务站点。负责接站的分院郑国环老师、胡绍泉老师等按照要求，测量体温、检查健康码和入校码等，以确保同学们身体健康，检查完后，带领同学们有序排队坐上回学校的大巴。此外，考虑到学生行李多的情况，分院在北门、大学生活动中心及宿舍楼下也安排了志愿者，帮助返校同学搬运行李，最大程度使学生返校更加便捷与安全。</p><p>	</p><p class=\"ql-align-center\"><img src=\"http://www.ypc.edu.cn/__local/9/8C/D2/ACC2A6A415CECF73C5C96FECB0D_64D364D0_187A4.jpg\" width=\"500\"></p><p class=\"ql-align-center\"><img src=\"http://www.ypc.edu.cn/__local/3/6B/CB/20E30E8A1585B6C3A1CD44447E8_B6E00C55_1F75F.jpg\" width=\"500\"></p><p class=\"ql-align-center\"><img src=\"http://www.ypc.edu.cn/__local/8/12/2F/B28BC94EE8F02CED19E3EC721BA_AB855567_21C27.jpg\" width=\"500\"></p><p class=\"ql-align-center\">建筑工程分院志愿者风采</p><p><br></p><p>	为切实做好学院开学期间疫情防控工作，落实好联防联控机制，分院及早着手，组织学生党员团员开展志愿服务。学生志愿者们迎接着来自五湖四海的同学安全返校，他们主动接过大件行李送至寝室一件不少，烈日当头他们汗如雨下却始终洋溢微笑。进入校门口，他们积极组织安全引导、查验健康码；报到处，他们核对证件与秩序维护；测温点，他们指引同学们按顺序大间距排队测温、派发健康安全包；宿舍前，他们自发为同学们搬卸运送行李；食堂里，他们坚守“1米安全线”，用心守护舌尖上的安全；楼梯口，他们严把防疫安全出口关，严禁外来人员出入。青年志愿者们用真情服务谱写了疫情防控的青春之歌，用自己的实际行动引领青年大学生做好复学复课这道“必答题”。</p><p>	</p><p class=\"ql-align-center\"><img src=\"http://www.ypc.edu.cn/__local/8/E0/59/C83A5A8D7DC4E529A6E5836FDDA_A24B0D77_11EF5.jpg\" width=\"500\"></p><p class=\"ql-align-center\"><img src=\"http://www.ypc.edu.cn/__local/7/B6/C5/4FBA9B9790C6A7F945D74EBAE98_17839F31_1B2F4.jpg\" width=\"500\"></p><p class=\"ql-align-center\">领导走访学生公寓</p><p><br></p><p>	为了守好师生进入校园前的最后一道关口，建筑工程分院的老师们坚持摸清底数、关口前移，对每一名返校的师生都精准掌握其具体的返校日期、交通方式、航班航次等基本信息，做到底数清、情况明、管得住，把防控措施精准到每个时段、落实到每个细节。5月11日下午，学院纪委书记、建筑工程分院联系领导俞国芬与分院领导、辅导员一同走访学生公寓，查看寝室有关情况，询问同学们在返校方面存在的问题，对同学们的线下上课的进度进行深入了解。俞国芬强调，班主任要多了解同学们在寝室的生活、学习情况，多关心同学，同时要加强宿舍管理，增派辅导员、志愿者，引导学生养成良好卫生习惯。加强课堂管理，科学调整安排教学，引导教师遵守课堂纪律并建议采取线下答疑解惑的方式来填补线上教学的不足。</p><p><br></p>', '2020-05-20 12:59:49', '2020-05-20 12:59:49');
INSERT INTO `news` VALUES (3, 'gggg', 'http://localhost:3000/public/images/uploadImg/1590196554637.jpeg', 'hhhhhh', '<p>bbbbbbbbbbbbbbbbbbbbb</p>', '2020-05-23 01:15:56', '2020-05-23 01:15:56');

-- ----------------------------
-- Table structure for proposal
-- ----------------------------
DROP TABLE IF EXISTS `proposal`;
CREATE TABLE `proposal`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_proposal` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of proposal
-- ----------------------------
INSERT INTO `proposal` VALUES (1, '1017777777', '2555555@qq.com', '顶顶顶顶顶顶顶顶顶顶的');

-- ----------------------------
-- Table structure for wx_user
-- ----------------------------
DROP TABLE IF EXISTS `wx_user`;
CREATE TABLE `wx_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nickName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatarUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `department` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `class` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `studentId` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `communityName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `jurisdiction` int(1) NULL DEFAULT 0,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of wx_user
-- ----------------------------
INSERT INTO `wx_user` VALUES (5, 'oZ4Xs4vCNcng71FJCqQTnIddYJhU', 'zf', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJK6YbSM5Qzdl8peLfqS25LK8BVrsBfDkbAnBiar2uajibknDciazV30bE9MtdGcPKo08fx6MpgRkqdg/132', '周泽锋', '男', '信息与机电工程分院', '计算机161', '0701160135', '电竞社', 0, '2020-05-23 01:10:54', '2020-05-23 01:13:33');

-- ----------------------------
-- Event structure for updateActtype
-- ----------------------------
DROP EVENT IF EXISTS `updateActtype`;
delimiter ;;
CREATE EVENT `updateActtype`
ON SCHEDULE
EVERY '1' MINUTE STARTS '2020-01-01 00:00:00'
DO update activity SET ActivityType= "已结束" where  startTime < NOW() and approvalStatus = "已通过";
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;

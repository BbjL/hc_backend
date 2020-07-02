import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/Home'
import TeamGroups from '../pages/TeamGroups/TeamGroups'                         //查看组别
import AddGroup from '../pages/AddGroup/AddGroup'                                 //添加或更新组别
import TeamMembers  from '../pages/TeamMembers/TeamMembers'                     //查看成员
import UploadAndDateMems  from '../pages/UploadAndDateMems/UploadAndDateMems' //添加更新成员
import Regulation from '../pages/Regulation/Regulation'                   //团队制度
import Introduce from '../pages/Introduce/Introduce'                      //团队简介
import Resource from '../pages/Resource/Resource'                         //查看资源
import AddResource from '../pages/AddResouce/AddResouce'                  //添加资源
import VideoUpload from '../pages/VideoUpload/VideoUpload'                //视频上传
import VideoUpdate from '../pages/VideoUpdate/VideoUpdate'                // 视频更新
import Elegants from '../pages/Elegants/Elegants.vue'
import ElegantUpload from '../pages/ElegantUpload/ElegantUpload'          //团队风采上传
import ElegantUpdate from '../pages/ElegantUpdate/ElegantUpdate'          //团队风采更新
import TeamSurrounding from '../pages/TeamSurrounding/TeamSurrounding'    //团队氛围
import TeamHonor from '../pages/TeamHonor/TeamHonor'                        //团队奖项
import UploadHonor from '../pages/UploadHonor/UploadHonor'                  //上传团队奖项
import Login from '../pages/Login/Login'                                  //登陆界面
import TeamProjects from '../pages/TeamProjects/TeamProjects'                                  //登陆界面
import UploadProjects from '../pages/UploadProjects/UploadProjects'                                  //登陆界面
import Email from '../pages/Email/Email'                                  //登陆界面
import Garbage from '../pages/Garbage/Garbage'                //回收站

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',//设置默认指向的路径
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path:'/categroup',      //查看分组
      name:'categroup',
      component:TeamGroups,
    },
    {
      path:'/addteam',      //添加分组
      name:'AddTeam',
      component:AddGroup
    },
    {
      path:'/teammembers',        //查看成员
      name:'teammembers',
      component:TeamMembers
    },
    {
      path:'/uploadmems/:id',             //添加成员 、更新成员信息
      name:'uploadmems',
      component:UploadAndDateMems,
    },
    {
      path:'/regulation',             //团队信息 -> 管理制度
      name:'regulation',
      component:Regulation,
    },
    {
      path:'/videoupload',             //团队视频上传
      name:'videoupload',
      component:VideoUpload,
    },
    {
      path:'/videoupdate',             //团队视频更新
      name:'videoupdate',
      component:VideoUpdate,
    },
    {
      path:'/elegants',             //所有风采
      name:'elegants',
      component:Elegants,
    },
    {
      path:'/elegantupload',             //团队风采上传
      name:'elegantupload',
      component:ElegantUpload,
    },
    {
      path:'/elegantupdate',             //团队风采更新
      name:'elegantupdate',
      component:ElegantUpdate,
    },
    {
      path:'/introduce',             //团队基本信息
      name:'introduce',
      component:Introduce,
    },
    {
      path:'/resource',             //团队资源显示
      name:'resource',
      component:Resource,
    },
    {
      path:'/addresource',             //添加团队资源
      name:'addresource',
      component:AddResource,
    },
    {
      path:'/teamsurrounding',             //团队氛围
      name:'teamsurrounding',
      component:TeamSurrounding,
    },
    {
      path:'/teamhonor',             //团队氛围
      name:'teamhonor',
      component:TeamHonor,
    },
    {
      path:'/uploadhonor',             //团队氛围
      name:'uploadhonor',
      component:UploadHonor,
    },
    {
      path:'/teamprojects',             //团队氛围
      name:'teamprojects',
      component:TeamProjects,
    },
    {
      path:'/uploadprojects',             //团队项目
      name:'uploadprojects',
      component:UploadProjects,
    },
    {
      path:'/email',             //网页消息
      name:'email',
      component:Email,
    },
    {
      path:'/garbage',             //网页消息
      name:'garbage',
      component:Garbage,
    },
  ]
})



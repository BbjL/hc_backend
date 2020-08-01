import Vue from 'vue'
import Router from 'vue-router'
import Layout from  '@/layout/index'

Vue.use(Router);

const router  = [
  {
    path: '/',
    redirect: '/home',//设置默认指向的路径
    meta:{noShow:true}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login/index'),
    meta:{noShow:true , notReqLogin:true}
  },
  {
    path: '/404',
    name: 'error',
    component: () => import('../pages/404/index'),
    meta:{noShow:true ,notReqLogin:true}
  },
  // home
  {
    path: '/home',
    name: 'home',
    component: Layout,
    redirect:'/home/all',
    meta:{ noShow:true },
    children:[
      {
        path:'/home/all',
        component:() => import('../pages/home/Home'),
        meta:{}
      },
    ]
  },
  // 团队信息
  {
    path: '/message',
    name: 'message',
    component: Layout,
    meta:{ title:"团队信息", icon: 'el-icon-s-management' ,affix:true  },
    children:[
      {
        path:'/message/resource',
        component:() => import( '../pages/resource/Resource'),
        meta:{title :'实验室资源 '},

      },
      {
        path:'/message/regulation',
        component:() =>import('../pages/regulation/Regulation'),
        meta:{title :'管理制度 '},
      }
    ]
  },
  // 团队视频
  {
    path: '/video',
    name: 'video',
    component: Layout,
    redirect:'/video/all',
    meta:{ title:"科研视频", icon: 'el-icon-video-camera-solid' ,affix:true  },
    children:[
      {
        path:'/video/all',
        component:() => import( '../pages/videos/index' ),
        meta:{title :'视频列表 '}
      },
      {
        path:'/video/edit',
        component:() => import( '../pages/videos/edit/index' ),
        meta:{title :'视频上传 ' , noShow:true}
      },
      {
        path:'/video/detail',
        component:() => import( '../pages/videos/detail/index' ),
        meta:{title :'详细内容', noShow:true }
      },
    ]
  },
  // 团队风采
  {
    path: '/teamele',
    name: 'teamele',
    component: Layout,
    redirect:'/teamele/all',
    meta:{ title:"团队风采", icon: 'el-icon-picture' ,affix:true  },
    children:[
      {
        path:'/teamele/all',
        component:() => import( '../pages/elegant/index.vue'),
        meta:{title :'所有列表 '}
      },
      {
        path:'/teamele/edit',
        component:() => import( '../pages/elegant/edit' ),
        meta:{title :'上传风采 ',noShow:true}
      },
    ]
  },
  // 团队氛围
  {
    path: '/surround',
    name: 'surround',
    redirect:'/surround/all',
    meta:{title:'团队氛围', icon: 'el-icon-s-promotion' ,affix:true  },
    component: Layout,
    children:[
      {
        path:'/surround/all',
        component:() => import('../pages/surround/index' ),
      },
      {
        path:'/surround/edit',
        component:() => import('../pages/surround/edit/index' ),
        meta:{title:'编辑氛围' , noShow:true}
      }
    ]
  },
  // 团队项目
  {
    path: '/projects',
    name: 'projects',
    redirect:'/projects/all',
    meta:{title:'团队项目', icon: 'el-icon-s-order' ,affix:true  },
    component: Layout,
    children:[
      {
        path:'/projects/all',
        component:() => import('../pages/projects/index' ),
        meta:{title :'项目列表 '}
      },
      {
        path:'/projects/edit',
        component:() => import('../pages/projects/edit/index' ),
        meta:{title :'编辑项目 ' , noShow:true  }
      }
    ]
  },
  //团队成员
  {
    path: '/members',
    name: 'members',
    redirect:'/members/all',
    meta:{title:'团队成员', icon: 'el-icon-user-solid' ,affix:true  },
    component: Layout,
    children:[
      {
        path:'/members/all',
        component:() => import('../pages/members/index'  ),
        meta:{title :'成员列表 '}
      },
      { //添加或者更新成员
        path:'/members/edit',
        component:() => import('../pages/members/edit'),
        meta:{title :'编辑成员 ', noShow:true}
      }
    ]
  },
  //团队组别
  {
    path: '/groups',
    name: 'groups',
    redirect:'/groups/all',
    meta:{title:'团队组别', icon: 'el-icon-s-order' ,affix:true  },
    component: Layout,
    children:[
      {
        path:'/groups/all',
        component:() => import('../pages/groups' ),
        meta:{title :'组别列表 '}
      },
      {
        path:'/groups/edit',
        component:() => import('../pages/groups/edit' ),
        meta:{title :'编辑组别 ', noShow:true}
      }
    ]
  },
  //团队奖项
  {
    path: '/awards',
    name: 'awards',
    redirect:'/awards/all',
    meta:{title:'团队奖项', icon: 'el-icon-s-order' ,affix:true  },
    component: Layout,
    children:[
      {
        path:'/awards/all',
        component:() => import('../pages/awards' ),
        meta:{title :'奖项列表 '}
      },
      { //添加或者更新成员
        path:'/awards/edit',
        component:() => import('../pages/awards/edit'),
        meta:{title :'编辑奖项 ', noShow:true}
      }
    ]
  },
  //网站消息
  {
    path: '/email',
    name: 'email',
    redirect:'/email/all',
    meta:{title:'网站消息', icon: 'el-icon-message-solid' ,affix:true  },
    component: Layout,
    children:[
      {
        path:'/email/all',
        component:() => import('../pages/emails' ),
      }
    ]
  },
  //回收站
  // {
  //   path: '/garbage',
  //   name: 'garbage',
  //   redirect:'/garbage/all',
  //   meta:{title:'回收站', icon: 'el-icon-delete-solid' ,affix:true  },
  //   component: Layout,
  //   children:[
  //     {
  //       path:'/garbage/all',
  //       component:() => import('../pages/Garbage/Garbage'),
  //       meta:{}
  //     }
  //   ]
  // },
  {
    path:'*',
    redirect:'/404',
    meta:{noShow:true}
  }
]

export default new Router({
  routes:router
})



import Vue from 'vue'
import Router from 'vue-router'
import Layout from  '@/layout/index'

Vue.use(Router);

const router  = [
  {
    path: '/',
    redirect: '/login',//设置默认指向的路径
    meta:{noShow:true}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login/Login'),
    meta:{noShow:true}
  },
  // 团队信息
  {
    path: '/message',
    name: 'message',
    component: Layout,
    meta:{ title:"团队信息", icon: 'documentation' ,affix:true  },
    children:[
      {
        path:'/message/resource',
        component:() => import( '../pages/Resource/Resource'),
        meta:{title :'实验室资源 '}
      },
      {
        path:'/message/regulation',
        component:() =>import('../pages/Regulation/Regulation'),
        meta:{title :'管理制度 '}
      }
    ]
  },
  // 团队视频
  {
    path: '/video',
    name: 'video',
    component: Layout,
    meta:{ title:"团队视频", icon: 'documentation' ,affix:true  },
    children:[
      {
        path:'/video/all',
        component:() => import( '../pages/VideoUpdate/VideoUpdate' ),
        meta:{title :'所有视频 '}
      },
      {
        path:'/video/update',
        component:() => import( '../pages/VideoUpdate/VideoUpdate' ),
        meta:{title :'视频更新 ' , noShow:true}
      },
      {
        path:'/video/videoupload',
        component:() => import('../pages/VideoUpload/VideoUpload'  ),
        meta:{title :'视频上传 '}
      }
    ]
  },
  // 团队风采
  {
    path: '/teamele',
    name: 'teamele',
    component: Layout,
    redirect:'/teamele',
    meta:{ title:"团队风采", icon: 'documentation' ,affix:true  },
    children:[
      {
        path:'/teamele/all',
        component:() => import( '../pages/Elegants/Elegants.vue'),
        meta:{title :'所有风采 '}
      },
      {
        path:'/teamele/update',
        component:() => import( '../pages/ElegantUpdate/ElegantUpdate' ),
        meta:{title :'风采更新 ',noShow:true}
      },
      {
        path:'/teamele/upload',
        component:() => import('../pages/ElegantUpload/ElegantUpload' ),
        meta:{title :'风采上传 '}
      }
    ]
  },
  // 团队氛围
  {
    path: '/teamsurrounding',
    name: 'teamsurrounding',
    redirect:'/teamsurrounding/detail',
    meta:{title:'团队氛围', icon: 'documentation' ,affix:true  },
    component: Layout,
    children:[
      {
        path:'/teamsurroundingl/detail',
        component:() => import('../pages/TeamSurrounding/TeamSurrounding' ),
        meta:{title :'团队氛围 '}
      }
    ]
  },
  // 团队项目
  {
    path: '/projects',
    name: 'projects',
    redirect:'/projects/all',
    meta:{title:'团队项目', icon: 'documentation' ,affix:true  },
    component: Layout,
    children:[
      {
        path:'/projects/all',
        component:() => import('../pages/TeamProjects/TeamProjects' ),
        meta:{title :'所有项目 '}
      },
      {
        path:'/projects/upload',
        component:() => import('../pages/UploadProjects/UploadProjects' ),
        meta:{title :'项目上传 '}
      }
    ]
  },
  //团队成员
  {
    path: '/teammembers',
    name: 'teammembers',
    redirect:'/teammembers/all',
    meta:{title:'团队成员', icon: 'documentation' ,affix:true  },
    component: Layout,
    children:[
      {
        path:'/teammembers/all',
        component:() => import('../pages/TeamMembers/TeamMembers'  ),
        meta:{title :'成员信息 '}
      },
      { //添加或者更新成员
        path:'/teammembers/upload',
        component:() => import('../pages/UploadAndDateMems/UploadAndDateMems'),
        meta:{title :'成员上传 '}
      }
    ]
  },
  //团队组别
  {
    path: '/groups',
    name: 'groups',
    redirect:'/groups/all',
    meta:{title:'团队组别', icon: 'documentation' ,affix:true  },
    component: Layout,
    children:[
      {
        path:'/groups/all',
        component:() => import('../pages/TeamGroups/TeamGroups' ),
        meta:{title :'所有组别 '}
      },
      { //添加或者更新成员
        path:'/groups/upload',
        component:() => import('../pages/AddGroup/AddGroup'),
        meta:{title :'组别上传 ', noShow:true}
      }
    ]
  },
  //团队奖项
  {
    path: '/honor',
    name: 'honor',
    redirect:'/honor/all',
    meta:{title:'团队奖项', icon: 'documentation' ,affix:true  },
    component: Layout,
    children:[
      {
        path:'/honor/all',
        component:() => import('../pages/TeamHonor/TeamHonor'  ),
        meta:{title :'所有奖项 '}
      },
      { //添加或者更新成员
        path:'/honor/upload',
        component:() => import('../pages/UploadHonor/UploadHonor'),
        meta:{title :'奖项上传 '}
      }
    ]
  },
  //网站消息
  {
    path: '/email',
    name: 'email',
    redirect:'/email/all',
    meta:{title:'网站消息', icon: 'documentation' ,affix:true  },
    component: Layout,
    children:[
      {
        path:'/email/all',
        component:() => import('../pages/Email/Email' ),
        meta:{title :'所有消息 '}
      }
    ]
  },
  //回收站
  {
    path: '/garbage',
    name: 'garbage',
    redirect:'/garbage/all',
    meta:{title:'回收站', icon: 'documentation' ,affix:true  },
    component: Layout,
    children:[
      {
        path:'/garbage/all',
        component:() => import('../pages/Garbage/Garbage'),
        meta:{title :'回收站 '}
      }
    ]
  }
]

export default new Router({
  routes:router
})




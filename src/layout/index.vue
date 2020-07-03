<template>
    <!--<router-view v-if="$route.path == '/login'"></router-view>-->
    <el-container v-if="$route.path !='/login'" style="height:100%; border-right: 1px solid #eee;border-left:0;" >
        <el-menu class="el-menu-vertical-demo"
                 background-color="rgb(0, 21, 41)"
                 text-color="#fff"
                 active-text-color="#fff"
                 menu-trigger="#2D8CF0"
                 unique-opened
                 :router="true"
                 :collapse="isCollapse">
          <router-link to="/home"> <h3 class="tit" v-show="!isCollapse">海创团队</h3></router-link>
          <router-link to="/home"> <h3 class="tit" v-show="isCollapse">HC</h3></router-link>
          <p class="tit-divi">Main</p>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span slot="title">团队信息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/message/resource">实验室资源</el-menu-item>
              <el-menu-item index="/message/regulation">管理制度</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-video-camera-solid"></i>
              <span slot="title">团队视频</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index='/video/videoupdate'>所有视频</el-menu-item>
              <el-menu-item index=/video/videoupload'>视频上传</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-picture"></i>
              <span slot="title">团队风采</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index='/teamele/all'>所有风采</el-menu-item>
              <el-menu-item index='/teamele/upload'>风采上传</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index='/teamsurroundingl/detail'>
            <i class="el-icon-s-promotion"></i>
            <span slot="title">团队氛围</span>
          </el-menu-item>
          <el-menu-item index="/teamprojects" >
            <i class="el-icon-s-order"></i>
            <span slot="title">团队项目</span>
          </el-menu-item>
          <el-submenu index="4" >
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">团队成员</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index='/teammembers/all'>成员信息</el-menu-item>
              <el-menu-item index='/teammembers/upload'>成员上传</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index='/groups/all'>
            <i class="el-icon-s-order"></i>
            <span slot="title">团队组别</span>
          </el-menu-item>
          <el-submenu index="6" >
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span slot="title">团队奖项</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index='/honor/all'>所有奖项</el-menu-item>
              <el-menu-item index='/honor/upload?id=0'>上传奖项</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index='/email/all'>
            <i class="el-icon-message-solid"></i>
            <span slot="title">网站消息</span>
          </el-menu-item>
          <el-menu-item index='/garbage/all'>
            <i class="el-icon-delete-solid"></i>
            <span slot="title">回收站</span>
          </el-menu-item>
        </el-menu>
        <el-container class="content-right">
          <el-header style=" text-align: right" class="content-header">
            <el-radio-group v-model="isCollapse" class="slide-toggle">
              <el-radio-button :label="true" v-show="!isCollapse"><i class="el-icon-s-fold"></i></el-radio-button>
              <el-radio-button :label="false" v-show="isCollapse"><i class="el-icon-s-unfold"></i></el-radio-button>
            </el-radio-group>
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon-setting"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><router-link to="/login">退出登录</router-link></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-header>
          <el-main >
            <router-view/>
          </el-main>
          <el-footer style="height: 30px;text-align: center;background-color: #eee;font-size:12px;color:#222;line-height: 30px;">
            copyright ©2018-©2019 海创团队 All Rights Reserved
          </el-footer>
        </el-container>
      </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {

  }
}
</script>

<style>
.el-header {
color: #333;
background-color: #fff;
height:30px !important;
line-height: 30px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
width: 200px;
min-height: 400px;
}
.el-submenu__title i,.el-menu-item i{
color:white !important;
}
.el-submenu__title:hover,.el-menu-item:focus, .el-menu-item:hover {
outline: 0;
background-color: #3a8ee6 !important;
}
.el-menu-item.is-active {
color: #409EFF;
background: #3a8ee6 !important;
}
.el-radio-button__inner{
border: none;
padding: 5px 10px;
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
  .el-menu-vertical-demo
    .tit
      font-family: TencentSansw3;
      margin-top 20px
      font-size 24px
      color: #ffffff
      text-align center
    .tit-divi
      font-weight: 700;
      color: #adb5bd;
      font-size: .9rem;
      text-transform: uppercase;
      letter-spacing: .1em;
      margin-left: 10px;
      margin-top: 10px;
      margin-bottom: 10px;
  .content-right
    background rgb(245, 247, 249)
    .content-header
      position relative
      .tit
        font-family TencentSansw7
        color: #333
      .slide-toggle
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        border: 1px solid #DCDFE6;
        border-radius 4px
</style>

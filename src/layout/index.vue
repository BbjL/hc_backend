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
          <el-submenu :index="index.toString()" v-for="(route,index) in routes" :key="route.path">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span slot="title">{{route.meta.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="child.path" :key="child.path" v-for="child in route.children">{{child.meta.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
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
import router from '@/router/index'
import { mapState , mapActions }  from 'vuex'
export default {
  data() {
    return {
      isCollapse: false,
      routes:[]
    };
  },
  computed:{
  },
  mounted(){
    this.$store.dispatch('sliderRoutes');
    this.routes = this.$store.state.sliderRoutes.routes
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

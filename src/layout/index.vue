<template>
    <el-container v-if="$route.path !='/login'" style="height:100%; border-right: 1px solid #eee;border-left:0;" >

      <slider :is-collapse="isCollapse"/>

      <el-container class="content-right">

          <el-header style="height: 60px" class="content-header">

            <el-radio-group v-model="isCollapse" class="slide-toggle">
              <el-radio-button :label="true" v-show="!isCollapse"><i class="el-icon-s-fold"></i></el-radio-button>
              <el-radio-button :label="false" v-show="isCollapse"><i class="el-icon-s-unfold"></i></el-radio-button>
            </el-radio-group>


            <Bread class="bread-crumb" :crumbs="getBreadCrumbs()"/>

            <el-dropdown trigger="click" class="header-right">
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon-setting"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><router-link to="/login">退出登录</router-link></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

          </el-header>

          <el-main >
            <transition
              name="fade"
              type="transition"
              :appear="true">
              <router-view/>
            </transition>
          </el-main>

          <el-footer style="height: 30px;text-align: center;background-color: #eee;font-size:12px;color:#222;line-height: 30px;">
            copyright ©2018-©2019 海创团队 All Rights Reserved
          </el-footer>
        </el-container>

    </el-container>
</template>

<script>
import slider from './components/slider'
import Bread from '@/components/Bread/Bread'
export default {
  components:{slider,Bread},
  data() {
    return {
      isCollapse: false,
      routes:[]
    };
  },
  methods:{
    /**
    *  获取面包屑导航路由
    * */
    getBreadCrumbs(){

      let matched = this.$route.matched.filter( route => route.meta&&route.meta.title)
      const first = matched[0]

      if(!this.isHome(first)){
        matched = [{path:'/home' , meta:{title:'主页'} }].concat(matched)
      }

      return matched
    },

    /**
     * 判断是否含有主页路由
     *
     * */
    isHome(route){

      const name = route && route.name

      if (!name) {
        return false
      }

      return name.trim().toLocaleLowerCase() === '主页'.toLocaleLowerCase()
    }

  },


}
</script>

<style>
.el-header {
color: #333;
background-color: #fff;
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

.fade-leave{
  opacity: 0;
  transform: translateX(30px);
}
.fade-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all .8s;
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
      display flex
      align-items:center;
      .tit
        font-family TencentSansw7
        color: #333
      .slide-toggle
        border: 1px solid #DCDFE6;
        border-radius 4px
        margin-right:30px
      .header-right
        position absolute
        right 30px
</style>

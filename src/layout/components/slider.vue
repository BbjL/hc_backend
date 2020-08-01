<template>
  <el-menu class="el-menu-vertical-demo"
           background-color="rgb(6 55 90)"
           text-color="#fff"
           active-text-color="#fff"
           menu-trigger="#2D8CF0"
           unique-opened
           :router="true"
           :collapse="isCollapse">
    <h3 class="tit" v-if="!isCollapse" @click="$router.push({name:'home'})" >海创团队</h3>
    <h3 class="tit" v-else   @click="$router.push({name:'home'})">HC</h3>
    <p class="tit-divi">Main</p>

    <sliderMeau :routes="routes" />

  </el-menu>
</template>

<script>
import sliderMeau from './sliderMeau'
export default {
    name: "slider",
    components:{sliderMeau },
    props:['isCollapse'],
    data(){
      return {
        routes:[],
      }
    },
    mounted(){
      this.$store.dispatch('sliderRoutes');
      this.routes = this.$store.state.sliderRoutes.routes
    },
    methods:{

    }
}
</script>

<style lang="stylus">
  .el-menu-vertical-demo
    .tit
      font-family: TencentSansw3;
      margin-top 20px
      font-size 24px
      color: #ffffff
      text-align center
      white-space nowrap
      cursor pointer
    .tit-divi
      font-weight: 700;
      color: #adb5bd;
      font-size: .9rem;
      text-transform: uppercase;
      letter-spacing: .1em;
      margin-left: 10px;
      margin-top: 10px;
      margin-bottom: 10px;
</style>

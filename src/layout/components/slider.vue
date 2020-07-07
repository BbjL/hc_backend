<template>
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

    <sliderMeau v-for="(route,index) in routes" :key="route.path" :route="route" :index="index.toString()"/>

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
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

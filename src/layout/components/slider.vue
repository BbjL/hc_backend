<template>
  <el-menu class="el-menu-vertical-demo"
           background-color="rgb(0, 21, 41)"
           text-color="#fff"
           active-text-color="#fff"
           menu-trigger="#2D8CF0"
           unique-opened
           :router="true"
           :collapse="isCollapse">
    <h3 class="tit" v-if="!isCollapse">海创团队</h3>
    <h3 class="tit" v-else>HC</h3>
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


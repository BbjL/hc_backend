<template>
  <fragment>
    <template v-for="route in routes">

      <el-submenu v-if="route.children&&route.children.length > 1" :index="route.path" :key="route.path" >
        <template slot="title" >
          <i :class="route.meta.icon"></i>
          <span  slot="title">{{route.meta.title}}</span>
        </template>
        <el-menu-item-group>
          <slider-meau v-if="hasChildren(route.children) " :routes = route.children></slider-meau>
          <meauItem v-else  :routes="route.children" />
          <!--<meauItem v-else  :childRoutes="child" v-for="child in route.children" :key="child.path"/>-->
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item v-else :index="route.path">
        <i :class="route.meta.icon"></i>
        <span slot="title">{{route.meta&&route.meta.title === ''?route.children[0].meta.title:route.meta.title}}</span>
      </el-menu-item>

    </template>
  </fragment>
</template>

<script>
import meauItem from './meauItem'
export default {
    name: "sliderMeau",
    components:{meauItem},
    props:['routes' , 'index'],
    data(){
      return {
        count:0
      }
    },
    methods:{
      hasChildren(routes){
        //遍历数组所有，每一个是否含有children
        //有就返回true
        const flag = routes.some(route => route.children)

        return flag
      }
    }
}
</script>


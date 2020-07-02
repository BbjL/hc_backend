<template>
  <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: path1 }" v-if="$route.path === '/categroup'||'/addteam'">{{locational1}}</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: path2}" v-if="locational2">{{locational2}}</el-breadcrumb-item>
    <el-breadcrumb-item v-if="locational3">{{locational3}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
    export default {
        name: "bread",
        props:{
          locational1:String,
          locational2:String,
          locational3:String,
          path1:String,
          path2:String
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .bread
    margin-bottom:20px
</style>

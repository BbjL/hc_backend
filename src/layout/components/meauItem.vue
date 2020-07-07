<template>
  <el-menu-item :index="childRoutes.path" >{{childRoutes.meta.title}}</el-menu-item>
</template>

<script>
export default {
    name: "meauItem",
    props:['childRoutes']
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

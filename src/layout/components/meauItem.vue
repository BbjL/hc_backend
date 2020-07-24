<template>
  <fragment>
    <el-menu-item v-for="route in routes" :index="route.path" :key="route.path">{{route.meta.title}}</el-menu-item>
  </fragment>
</template>

<script>
export default {
    name: "meauItem",
    props:['routes']
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

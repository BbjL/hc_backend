<template>
    <div>
      <Bread locational1="团队信息" locational2="团队简介"/>
      <div class="tab-wrapper">
        <el-tabs v-model="introTab" @tab-click="handleClick">
          <el-tab-pane label="所有资源" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="上传资源" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="群组二维码" name="third">新生群二维码</el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
  import Bread from '../../components/Bread/Bread'
  export default {
      name: "introduce",
      components:{Bread},
      data() {
        return {
          introTab: 'second'
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

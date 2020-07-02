<template>
    <div>
      <Bread locational1="回收站 "/>
      <div class="garbage-content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="团队资源" name="first" ><teamSource v-if="activeName=='first'"/></el-tab-pane>
          <el-tab-pane label="团队制度" name="second"><regulations v-if="activeName=='second'"/></el-tab-pane>
          <el-tab-pane label="团队风采" name="third"><elegants v-if="activeName=='third'"/></el-tab-pane>
          <el-tab-pane label="团队氛围" name="fourth"><surrounding v-if="activeName=='fourth'"/></el-tab-pane>
          <el-tab-pane label="团队项目" name="fifth"><projects v-if="activeName=='fifth'"/></el-tab-pane>
          <el-tab-pane label="团队成员" name="sixth"><members v-if="activeName=='sixth'"/></el-tab-pane>
          <el-tab-pane label="团队组别" name="seventh"><groups v-if="activeName=='seventh'"/></el-tab-pane>
          <el-tab-pane label="团队奖项" name="eighth"><awards v-if="activeName=='eighth'"/></el-tab-pane>
          <el-tab-pane label="网站消息" name="ninth"><messages v-if="activeName=='ninth'"/></el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
  import Bread from '../../components/Bread/Bread'
  import teamSource from './source/source'
  import regulations from './regulations/regulations'
  import projects from './projects/projects'
  import elegants from './elegants/elegants'
  import surrounding from './surrounding/surrounding'
  import members from './members/members'
  import groups from './groups/groups'
  import awards from './awards/awards'
  import messages from './messages/messages'
  export default {
    components:{Bread,teamSource,regulations,projects,elegants,surrounding,members,groups,awards,messages},
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
        console.log(this.activeName);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .garbage-content
    background-color white
    padding 15px
</style>

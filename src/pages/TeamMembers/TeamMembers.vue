<template>
    <div>
      <div class="tab-wrapper">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="所有成员" name="first">
            <MemsTable tableType="1" v-if="First"/>
          </el-tab-pane>
          <el-tab-pane label="未分组成员" name="second">
            <MemsTable tableType="2" v-if="Second"/>
          </el-tab-pane>
          <el-tab-pane label="离开成员" name="third">
            <MemsTable tableType="3" v-if="Third"/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
  import Bread from '../../components/Bread/Bread'
  import MemsTable from '../../components/MemsTable/MemsTable'
  import {reqTeams} from '../../api/index'
  export default {
        name: "MemberHome",
        components:{Bread,MemsTable},
        data() {
          return {
            First:true,
            Second:false,
            Third:false,
            activeName: 'first',
          };
        },
        methods: {
          handleClick(tab, event) {   //实现实时局部刷新
            console.log(tab, event);
            if(tab.name == 'first'){
              this.First = true;
              this.Second = false;
              this.Third = false;
            }else if(tab.name == 'second'){
              this.First = false;
              this.Second = true;
              this.Third = false;
            }else{
              this.First = false;
              this.Second = false;
              this.Third = true;
            }
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

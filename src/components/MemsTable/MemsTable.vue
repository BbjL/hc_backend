<template>
  <div>
    <div class="leave-search" v-if="tableType==='3'||tableType==='1'">
      <el-radio v-if="tableType==='1'" v-model="radio" @change="choiceGroup()" label="全部" >所有成员</el-radio>
      <el-radio v-model="radio" @change="choiceGroup(item.id)" :label="item.groupName" v-for="(item,index) in groups" :key="index">
        {{item.groupName}}
      </el-radio>
    </div>
    <el-table
      :data="tableData.filter(data => !search || data.memName.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="成员姓名"
        prop="memName">
      </el-table-column>
      <el-table-column
        label="成员专业"
        prop="memMajorZh">
      </el-table-column>
      <el-table-column
        label="成员组别"
        prop="memGroupZh">
      </el-table-column>
      <el-table-column
        label="成员方向"
        prop="memDirectZh">
      </el-table-column>
      <el-table-column
        label="成员状态"
        prop="memIsenable">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.memIsenable"
            active-value="1"
            @change="memStatusChange($event , scope.row.id , scope.row.memName)"
            inactive-value="0">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="加入时间"
        prop="memBegin">
      </el-table-column>
      <el-table-column
        label="退出时间"
        prop="memEnd">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini"  placeholder="搜索成员"/>
        </template>
        <template slot-scope="scope">
          <router-link :to="{name:'uploadmems' , params:{id:scope.row.id}} " >
            <el-button
              size="mini"
              round
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </router-link>
          <el-button
            size="mini"
            round
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      hide-on-single-page
      layout="prev, pager, next"
      @current-change="pageChange"
      :page-count	="totalPages">
    </el-pagination>
  </div>
</template>

<script>
    import {updateMemStatus ,reqAllMems,reqNotGroup,reqTeams,reqLeaveMems,reqGroupMems ,reqAllEnableMems} from '../../api/index'
    export default {
        name: "AllMemsTable",
        props:['tableType'],
        data() {
          return {
            radio: '全部',        //选择分组
            groups:[],        //获取分组
            tableData: [],     //表格数据
            totalPages:0,      //页数
            search: '',        //搜索
            memStatus:true,       //成员状态
            isGroupCate:false   //是否选择按组获取
          };
        },
        mounted(){
          this.init()
        },
        methods: {
          handleEdit(index, row) {  // index 表格索引  row 对应行的信息
            console.log(row.id);
            // this.$router.push('/uploadmems/'+row.id)
          },

          handleDelete(index, row) {
            console.log(index, row);
          },

          //按分组搜索成员
          async choiceGroup(group='all'){
            console.log('组别id='+group);
            let tableData = '';
            if(group =='all'){
              this.isGroupCate = false;
              this.init();
              return
            }
            //分组查询初始化显示
            if(this.tableType === '1'){
              this.isGroupCate = group;
              tableData = await reqGroupMems(group);
              console.log(tableData);
              if(tableData.status == 200 ){
                this.tableData = tableData.obj.content;
                this.totalPages = tableData.obj.totalPages;      //总页数
              }
            }else if(this.tableType === '3'){
              this.isGroupCate = group;
              tableData = await reqLeaveMems(group);
              console.log(tableData);
              if(tableData.status == 200){
                this.tableData = tableData.obj;
                this.totalPages = 1;      //总页数
              }
            }
          },

          //获取分组
          async getGroup(){
            const allGroup = await reqTeams();
            this.groups = allGroup.obj;
          },

          //初始化
          async init(){
            let mems = '';
            if(this.tableType === '1'){                 //查看全部成员
              this.getGroup();
              mems = await reqAllEnableMems();
            }else if(this.tableType === '2'){           //查看未分组成员
              mems = await reqNotGroup();
            }else if(this.tableType === '3'){           //查看离开人员
              this.getGroup();
              return
            }
            if(mems.status == 200){
              this.totalPages = mems.obj.totalPages;      //总页数
              this.tableData = mems.obj.content
            }
          },

          //选择页数
          async pageChange(currentPage){        //根据传送过来的tableType初始化内容
            let mems = '';
            const _group = this.isGroupCate;
            if(this.tableType === '1'){                 //查看全部成员
              _group?mems=await reqGroupMems(_group,currentPage):mems = await reqAllEnableMems(currentPage)
            }else if(this.tableType === '2'){           //查看未分组成员
              const _group = this.isGroupCate;
              _group?mems=await reqLeaveMems(_group,currentPage):mems = await reqNotGroup(currentPage);
            }else if(this.tableType === '3'){           //查看离开人员
              return
            }
            this.totalPages = mems.obj.totalPages;      //总页数
            this.tableData = mems.obj.content
          },


          //成员状态改变
          async memStatusChange(currentValue,id,name){//当前状态   成员id   成员名字
            let currentBoolean = '';
            let alertType = ''
            currentValue == 1 ? currentBoolean = '未离开':currentBoolean = "离开";
            currentValue == 1 ? alertType = 'success':alertType = 'warning';
            //发送修改状态请求
            const result = await updateMemStatus(id,currentValue);
            if(result.status == 200 ){
              this.$message({type:alertType ,message:`已将${name}状态修改为${currentBoolean}!`});
            }else{
              this.$message({type:'error',  message:`修改${name}状态失败!`});
            }
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .leave-search
    text-align right
</style>

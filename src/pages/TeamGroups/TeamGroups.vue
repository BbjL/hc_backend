<template>
    <div class="teams-info">
      <router-link :to="{path:'/addteam' , query:{id:0}}" >
        <el-button class="submit-team" type="primary" icon="el-icon-plus">添加组别</el-button>
      </router-link>
      <el-row class="edit-table">
        <el-table
          :data="tableData"
          style="width: 100%"
          :stripe="false ">
          <el-table-column
            prop="groupName"
            label="组名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="groupIntro"
            label="简介"
            width="280">
            <template slot-scope="scope">
              <!-- v-html="scope.row.groupIntro.slice(0,20)"-->
              <p class="ellipsis" style="cursor: pointer;color:#409EFF" @click="readMore(scope.$index)">
                {{tableData[scope.$index].groupIntro.replace(/\<[\s\S]*?\>/gm , '').slice(0,100)}}<!--去除标签保留内容-->
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="groupHead"
            label="封面"
            width="180">
            <template slot-scope="scope">
              <el-image
                style="width: 50px; height: 50px"
                :src="'http://47.112.132.177:8084/group/showimg/{id}?id='+scope.row.id"
                :preview-src-list="['http://47.112.132.177:8084/group/showimg/{id}?id='+ scope.row.id]">
              </el-image>
            </template>
          </el-table-column>
          <!--<el-table-column-->
            <!--label="是否显示"-->
            <!--width="180"-->
            <!--prop="memIsenable">-->
            <!--<template slot-scope="scope">-->
              <!--<el-switch-->
                <!--v-model="scope.row.groupIsenabled"-->
                <!--active-value="1"-->
                <!--@change="groupStatusChange($event , scope.row.id , scope.row.groupName)"-->
                <!--inactive-value="0">-->
              <!--</el-switch>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="groupIsenabled"-->
            <!--label="是否显示"-->
            <!--width="180">-->
            <!--<template slot-scope="scope">-->
              <!--<p>{{scope.row.groupIsenabled == 1?'是':'否'}}</p>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <router-link :to="{path:'/addteam' , query:{id:scope.row.id}}">
                <el-button
                  size="mini"
                  round
                  icon="el-icon-edit"
                  type="">修改</el-button>
              </router-link>
              <el-button
                size="mini"
                round
                icon="el-icon-delete"
                type=""
                @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!--dialog-->
      <el-dialog title="组别介绍" :visible.sync="dialogFormVisible">
        <div class="dialog_article" v-html="dialogContent"></div>
        <div slot="footer" class="dialog-footer"></div>
      </el-dialog>
    </div>
</template>

<script>
  import {updateGroupStatus,reqDelete ,reqGroupAllno,reqGroups} from '../../api/index'
  import Bread from '../../components/Bread/Bread'
    export default {
        name: "Cate_group",
        components:{Bread},
        data() {
          return {
            tableData: [],
            contentIndex:0,
            dialogFormVisible: false,
            dialogContent:'',
            formLabelWidth: '120px'
          }
        },

        mounted(){
            this.getTable()
        },

        methods: {
          //请求表格数据
          async getTable(){
            const data =await reqGroups(1,1000);
            this.tableData = data.obj;
            console.log(this.tableData);
          },


          handleEdit(index, row) {
            console.log(index, row);
          },

          async handleDelete(index, row) {//index 表格索引   row一行的信息
            this.$confirm('确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async () => {
              const result = await reqDelete(row.id);
              if(result.status == 200){
                this.$message({message:"'删除成功！'",type:'success' })
              }else{
                this.$message({message:"'系统出错！'",type:'success' })
              }
              this.getTable();
            }).catch(() => {
              this.$message('取消操作！');
            });
          },

          //组别状态改变
          async groupStatusChange(currentValue,id,name){//当前状态   成员id   成员名字
            let currentBoolean = '';
            let alertType = ''
            currentValue == 1 ? currentBoolean = '不可用':currentBoolean = '可用';
            currentValue == 1 ? alertType = 'success':alertType = 'warning';
            //发送修改状态请求
            const result = await updateGroupStatus(id,currentValue);
            if(result.status == 200 ){
              this.$message({type:alertType,message:`已将状态修改为${currentBoolean}!`});
            }else{
              this.$message({type:'error',  message:`修改状态失败!`});
            }
          },

          readMore(index){
            this.contentIndex = index;
            this.dialogFormVisible=true;
            this.dialogContent = this.tableData[index].groupIntro;
          }
        }
    }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .teams-info
    position relative
    .submit-team
      position absolute
      right 0
      top -10px
    .dialog_article
      letter-spacing 2px
      line-height 20px
      max-height 500px
      overflow-y auto
      width 100%
</style>

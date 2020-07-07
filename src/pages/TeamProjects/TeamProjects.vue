<template>
  <div class="teams-info">
    <router-link :to="{path:'/uploadprojects' , query:{id:0}}" >
      <el-button class="submit-team" type="primary" icon="el-icon-plus">添加项目</el-button>
    </router-link>
    <el-row class="edit-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :stripe="false ">
        <el-table-column
          prop="proDate"
          label="项目日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="proName"
          label="项目名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="proGrgoupZh"
          label="项目组别"
          width="180">
        </el-table-column>
        <el-table-column
          prop="proDetail"
          label="项目介绍"
          width="280">
          <template slot-scope="scope">
            <p class="ellipsis" style="cursor: pointer;color:#409EFF" @click="readMore(scope.$index)">
              {{tableData[scope.$index].proDetail.replace(/\<[\s\S]*?\>/gm , '').slice(0,100)}}<!--去除标签保留内容-->
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="groupHead"
          label="项目图片"
          width="180">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="'http://47.112.132.177:8084/pro/showimg/{id}?id='+scope.row.id"
              :preview-src-list="['http://47.112.132.177:8084/pro/showimg/{id}?id='+ scope.row.id]">
            </el-image>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--label="是否显示"-->
          <!--prop="delFlag">-->
          <!--<template slot-scope="scope">-->
            <!--<el-switch-->
              <!--v-model="scope.row.delFlag"-->
              <!--:active-value="1"-->
              <!--@change="projectStatusChange($event , scope.row.id)"-->
              <!--:inactive-value="0">-->
            <!--</el-switch>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="{path:'/uploadprojects' , query:{id:scope.row.id}}">
              <el-button
                size="mini"
                round
                icon="el-icon-edit"
                type="">修改</el-button>
            </router-link>
            <el-button
              size="mini"
              round
              @click="deleteItem(scope.row.id)"
              icon="el-icon-delete"
              type="">删除</el-button>
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
  import {updateProjectStatus,reqTeams,reqAllProjects} from '../../api/index'
  import Bread from '../../components/Bread/Bread'
  export default {
    name: "TeamProjects",
    components:{Bread},
    data() {
      return {
        tableData: [],
        contentIndex:0,
        dialogFormVisible: false,
        dialogContent:'',
        formLabelWidth: '120px',
        formData:new FormData()
      }
    },
    mounted(){
      this.getTable()
    },
    methods: {
      //请求表格数据
      async getTable(){
        const data =await reqAllProjects(0,1,100);
        if(data.status == 200) {
          this.tableData = data.obj.content;
        }
      },

      //点击编辑响应
      handleEdit(index, row) {
        console.log(index, row);
      },

      /**
       * 删除选项
       * */
      async deleteItem(id){
        console.log(id);
        this.$confirm('确定删除？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          (async ()=>{
            this.formData.append('id' , id);
            this.formData.append('delFlag' , 1);
            const result = await updateProjectStatus(this.formData);
            if(result.status == 200 ){
              this.$message({type:'success' ,message:`删除成功！`});
              this.getTable()                                                 //删除成功刷新页面
            }else{
              this.$message({type:'error',  message:`系统出错!`});
            }
          })();

        }).catch(()=>{
            this.$message({type:'info',  message:`取消操作!`});
        })
      },

      //  改变状态
      // async projectStatusChange(status,id){
      //   let currentBoolean = '';
      //   let alertType = ''
      //   status == 1 ? currentBoolean = '不显示':currentBoolean = "显示";
      //   status == 1 ? alertType = 'success':alertType = 'warning';
      //   this.formData.append('id' , id);
      //   this.formData.append('delFlag' , status);
      //   const result = await updateProjectStatus(this.formData);
      //   if(result.status == 200 ){
      //     this.$message({type:alertType ,message:`已将状态修改为${currentBoolean}!`});
      //   }else{
      //     this.$message({type:'error',  message:`修改状态失败!`});
      //   }
      // },

      /**
       * 模态框响应
       * @index  选项id
       * */
      readMore(index){
        this.contentIndex = index;
        this.dialogFormVisible=true;
        this.dialogContent = this.tableData[index].proDetail;
      }
    }
  }
</script>

<style scoped>
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

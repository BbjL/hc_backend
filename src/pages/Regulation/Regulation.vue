<template>
    <div>
      <Bread locational1="团队信息" locational2="规章制度"/>
      <div class="tab-wrapper">
　        <el-tabs v-model="reguTab" @tab-click="handleClick">
            <el-tab-pane label="所有规章" name="first">
              <el-table
                ref="singleTable"
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="150"
                  label="序号">
                </el-table-column>
                <el-table-column
                  property="insituContent"
                  align="left"
                  label="内容">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="180"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      round
                      icon="el-icon-edit"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      round
                      icon="el-icon-edit"
                      @click="handleDelete(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="添加规章" name="second">
              <el-form label-position="top" label-width="80px">
                <el-form-item label="新的规章内容">
                  <el-input
                    v-model="uploadContent"
                    :clearable="true"
                    maxlength="15"
                    show-word-limit></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitRegu">上传</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
         </el-tabs>
      </div>
    </div>
</template>

<script>
  import {reqRegu,updateRegu,uploadRegu ,deleteRegu} from '../../api/index'
  import Bread from '../../components/Bread/Bread'
  export default {
      name: "Regulation",
      components:{Bread},
      data() {
        return {
          reguTab: 'first',
          tableData: [],          //所有规章制度
          uploadContent:''        //添加规章制度
        };
      },
      mounted(){
        this.init();
      },
      methods: {
        //点击tab
        handleClick(tab, event) {
          // console.log(tab, event);
        },
        //初始化显示
        async init(){
          const regulations = await reqRegu();
          this.tableData = regulations.obj;
          console.log(regulations);
        },
        //点击修改
        handleEdit(index, row) {      //index 表格序号   row行内容
          this.$prompt('请输入修改内容', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            (async ()=>{
              const updateResu = await updateRegu(row.id,value);
              console.log(updateResu);
              if(updateResu.status === 200){
                this.$message({type: 'success', message: '修改成功！'});
                this.init()
              }else{
                this.$message({type: 'error', message: '修改失败！'});
              }
            })();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        },
        //上传新规章
        submitRegu(){
          this.$confirm('确认上传吗？' , '提示' ,{
            type:'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(()=>{
            (async ()=>{
              const uplaodData = this.uploadContent;
              const uploadResu =  await uploadRegu(uplaodData);
              console.log(uploadResu);
              if(uploadResu.status === 200){
                this.$message({type: 'success', message: uploadResu.msg});
                this.uploadContent = ''
                this.init()
              }else{
                this.$message({type: 'error', message: uploadResu.msg});
              }
            })();
          }).catch(()=>{
            this.$message({type: 'info', message: '取消上传'});
          })
        },

        /**
         * 删除制度
         *@item   选中项
         * */
        async handleDelete(item){
          const _id = item.id;
          this.$confirm('确定要删除嘛？' ,'提示' ,{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            (async ()=>{
              const result =  await deleteRegu(_id)
              if(result.status == 200){
                this.init();
                this.$message({type:'success',  message:`删除成功！!`});
              }else{
                this.$message({type:'success',  message:`系统出错!`});
              }
            })();
          }).catch(()=>{
            this.$message('取消操作！')
          })
        }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

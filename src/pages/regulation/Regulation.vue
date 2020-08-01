<template>
    <div>
      <div class="filter-container">
        <el-input v-model="listQuery.title" placeholder="内容" style="width: 200px;" class="filte r-item"  @keyup.enter.native="handleFilter" />
        <el-date-picker
          v-model="listQuery.time"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="dialogUploadFormVisible = true">
          添加
        </el-button>
      </div>


      <el-table
          ref="singleTable"
          :data="tableData"
          v-loading="loading"
          stripe
          fit
          border
          highlight-current-row
          style="width: 100%">
          <el-table-column
            type="index"
            align="center"
            width="80"
            label="序号">
          </el-table-column>
          <el-table-column
            property="lastUpdateTime"
            align="center"
            width="150"
            sortable
            label="更新时间">
          </el-table-column>
          <el-table-column
            property="insituContent"
            align="left"
            label="内容">
          </el-table-column>
          <el-table-column
            property="lastUpdateBy"
            align="center"
            width="100"
            label="By">
          </el-table-column>
          <el-table-column
            align="center"
            width="250"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
                修改
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>


      <el-dialog title="制度制定"  :visible.sync="dialogUploadFormVisible">
        <el-form :model="uploadContent"  ref="uploadContent" :rules="rules">
          <el-form-item required label="上传人员" :label-width="formLabelWidth" prop="subBy">
            <el-input v-model="uploadContent.subBy" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item required label="上传内容" :label-width="formLabelWidth" prop="subContent">
            <el-input v-model="uploadContent.subContent" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogUploadFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="formValidate('uploadContent')">确 定</el-button>
        </div>
      </el-dialog>


      <el-dialog title="修改制度" :visible.sync="dialogUpdateFormVisible">
        <el-form :model="updateContent" >
          <el-form-item  label="修改人员" :label-width="formLabelWidth" >
            <el-input v-model="updateContent.subBy" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  label="修改内容" :label-width="formLabelWidth" >
            <el-input v-model="updateContent.subContent" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogUpdateFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitUpdate()">确 定</el-button>
        </div>
      </el-dialog>


    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
      name: "Regulation",
      data() {
        return {
          listQuery: {
            title:'',
            time:''
          },
          initData:[],        //初始数据
          tableData: [],          //表格显示的数据
          updateContent:{         //修改制度
            id:'',
            subContent:'',
            subBy:''
          },
          uploadContent:{         //添加规章制度
            subContent:'',
            subBy:''
          } ,
          rules:{
            subContent:{ required: true, message: '请输入内容' },
            subBy:{ required: true, message: '请输入上传人员姓名' },
          },

          dialogUploadFormVisible:false,
          dialogUpdateFormVisible:false,
          formLabelWidth:'120px',
          loading: false
        };
      },
      mounted(){
        this.getAllRegu();
      },
      methods: {

        ...mapActions([
          'getRegu',
          'addRegu',
          'removeRegu',
          'updateRegu'
        ]),

        /**
         * 提交校验
         * */
        formValidate(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.handleCreate()
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },

        /**
         *修改团队制度
         * */
        handleEdit(item) {      //index 表格序号   row行内容
          console.log(item)
          this.dialogUpdateFormVisible = true;

          this.updateContent.id = item.id;
          this.updateContent.subBy = item.lastUpdateBy
          this.updateContent.subContent = item.insituContent
        },

        /**
         * 提交修改
         * */
        submitUpdate(id){
          this.dialogUpdateFormVisible = false

          const updateForm = {
            id:this.updateContent.id,
            lastUpdateBy:this.updateContent.subBy,
            insituContent:this.updateContent.subContent,
            lastUpdateTime:this.$getFormatTime()
          }

          this.updateRegu(updateForm)
            .then(res => {
              if(res.status&&res.status === 200){
                this.getAllRegu();
                this.$notify({type:'success', message:'修改成功'});
              }else{
                this.$notify({type:'error', message:'修改失败'});
              }
            })
            .catch(err => {
              console.log(err)
              this.$notify({type:'error', message:'服务器出错'});
            })
        },


        /**
         * 删除制度
         *@item   选中项
         * */
        handleDelete(item){

          this.$confirm('是否确认删除？, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            this.removeRegu(item.id)
              .then(res => {
                if(res.status&&res.status === 200){
                  this.getAllRegu()
                  this.$notify({type:'success', message:'删除成功'})
                }else{
                  this.$notify({type:'error', message:'删除失败'})
                }
              })
              .catch(err => {
                console.log(err)
                this.$notify({type:'error', message:'服务器出错'})
              })
          })
        },

        /**
         * 过滤表格
         * */
        handleFilter(){
          const _title = this.listQuery.title === ''? '':this.listQuery.title.toLowerCase();
          const _time = this.listQuery.time === ''? '': this.listQuery.time.toLocaleDateString().replace(/\//g , '-');
          const isBlank = !(_title||_time);

          const filterResult = this.initData.filter(item => {
              return isBlank||(_title&&item.insituContent.toLowerCase().includes(_title))||(_time&&item.lastUpdateTime.includes(_time))
          })

          this.tableData = filterResult
        },

        /**
         * 获取所有制度
         * */
        getAllRegu(){
          this.getRegu()
            .then(res => {
              console.log(res)
              if(res.status === 200)
                this.initData = this.tableData = res.obj
            })
            .catch(err => {
              console.log(err)
            })
        },

        /**
         * 添加
         * */
        handleCreate(){
          this.dialogUploadFormVisible = false

          const uploadForm = {
            lastUpdateBy:this.uploadContent.subBy,
            insituContent:this.uploadContent.subContent,
            lastUpdateTime:this.$getFormatTime()
          }

          this.addRegu(uploadForm)
            .then( res => {
              if(res.status&&res.status === 200){
                this.getAllRegu();
                this.$notify({type:'success' , message:'上传成功'})
              }
            })
            .catch( err => {
              console.log(err)
              this.$notify({type:'error' , message:'上传失败'})
            })
        }

      }
  }
</script>



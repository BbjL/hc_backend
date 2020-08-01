<template>
  <div class="upload-element" v-loading="loading">
    <el-form
      :model="ruleForm"
      :rules="id?updateRules:rules"
      ref="ruleForm"
      label-position="left">
      <el-row>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label-width="100px" label="文章标题：" prop="atmName">
            <el-input style="width: 300px" v-model="ruleForm.atmName " placeholder="输入标题" class="manage_input"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item  label-width="100px" label="作者："  prop="createBy">
            <el-input style="width: 300px" v-model="ruleForm.createBy " placeholder="作者姓名" class="manage_input"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item  prop="atmDetail" style="margin-bottom: 30px;">
        <Tinymce ref="editor" v-model="ruleForm.atmDetail" :height="400" />
      </el-form-item>


      <el-form-item v-if="!id">
        <el-button  type="primary" @click="submitForm('ruleForm')">立即上传</el-button>
      </el-form-item>
      <el-form-item v-else >
        <el-button type="primary" @click="updateForm('ruleForm')">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Tinymce from '@/components/Tinymce'

export default {
  name:'index',
  components:{ Tinymce},
  data() {
    return {
      id:this.$route.query.id,
      loading : false,
      groups:'',
      ruleForm: {
        atmName  : '',
        createBy : '',
        atmDetail : '',
        createTime  :'',
      },
      rules: {
        atmName: [
          {required: true, message: '请输入文章标题', trigger: 'blur'},
          {max: 20, message: '文章标题不能为空', trigger: 'blur'}
        ],
        createBy: [
          {required: true, message: '请输入作者命名', trigger: 'blur'}
        ],
        atmDetail: [
          {required: true, message: '请输入文章内容', trigger: 'blur'},
        ]
      },
      updateRules:{}
    }
  },
  mounted(){

    const _id = this.id
    if(_id){
      this.reqSurroundByID(_id)
        .then(res => {
          console.log(res)
          if(res.status === 200){
            this.ruleForm.atmName = res.obj.atmName
            this.ruleForm.createBy = res.obj.atmDetail
            this.ruleForm.atmDetail = res.obj.atmDetail
          }
        })
    }
  },
  methods:{
    ...mapActions([
      'updateEle',
      'uploadEle',
      'reqAllGroups',
      'reqEleByID',

      'reqSurroundByID',
      'updateSurround',
      'uploadSurround',
    ]),


    //校验表单
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.uploadForm()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    // //形成表单
    jointFormData(formName){
      let formData = new FormData()

      if(this.id){
        formData.append('id', this.id)
      }

      formData.append('atmName', this[formName].atmName)
      formData.append('createBy', this[formName].createBy)
      formData.append('createTime', this.$getFormatTime())
      formData.append('atmDetail', this[formName].atmDetail)

      return formData
    },

    // 上传表单
    uploadForm(){
      const formData = this.jointFormData('ruleForm')

      this.$confirm('此操作将上传文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.uploadSurround(formData)
          .then(res => {
            console.log(res)
            if(res.status === 200){
              this.$notify({type:'成功' ,message:'上传成功'})
            }
          })
          .catch(err =>{
            console.log(err)
            this.$notify({type:'error' ,message:'服务器错误'})
          })
      })


    },

    //提交修改
    updateForm(){
      const formData = this.jointFormData('ruleForm')

      this.$confirm('此操作将修改文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateSurround(formData)
          .then(res => {
            console.log(res)
            if(res.status === 200){
              this.$notify({type:'成功' ,message:'修改成功'})
            }
          })
          .catch(err =>{
            console.log(err)
            this.$notify({type:'error' ,message:'服务器错误'})
          })
      })
    }
  }
}
</script>

<style >
  video:focus{
    outline: 0;
  }
  input[type="file"] {
    display: none;
  }
  .upload-element{
    padding: 15px 0;
    width: 100%;
    background-color: white;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .article-textarea textarea{
    padding-right: 40px;
    resize: none;
    border: none ;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }

</style>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .word-counter
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;


  .upload-demo
    float left
  .video-preview
    float left
    margin-left: 40px
    height: 200px
    width:400px
    text-align center
    &::after
      content: ''
      display inline-block
      height 100%
      width 0
      vertical-align middle
    .upload-progress
      vertical-align middle

  .upload-demo
    float left
  .image-preview
    width: 200px;
    height: 200px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .image-preview-wrapper
      position: relative;
      width: 100%;
      height: 100%;
      .el-image
        height 100%
        img
          height: 100%;
    .image-preview-action
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      cursor: pointer;
      line-height: 200px;
      .el-icon-delete
        font-size: 36px;
    &:hover
      .image-preview-action
        opacity: 1;



</style>

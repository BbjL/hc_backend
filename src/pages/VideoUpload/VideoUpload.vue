<template>
  <div class="upload-element" v-loading="loading">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="视频名称" prop="videoName">
        <el-input v-model="ruleForm.videoName" class="manage_input"></el-input>
      </el-form-item>
      <el-form-item label="组别" prop="videoGroup">
        <el-select v-model="ruleForm.videoGroup" placeholder="选择组别">
          <el-option v-for="(item,index) in groups" :key="index" :label="item.groupName" :value="item.id" v-if="groups"/>
        </el-select>
      </el-form-item>
      <el-form-item label="录制时间" prop="createTime">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.createTime " style="width: 180px;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="上传时间" prop="updateTime">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.updateTime " style="width: 180px;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="视频详情" prop="videoDetail">
      </el-form-item>
      <div style="width: 90%;margin-left: 100px;margin-top: -30px;margin-bottom: 20px">
        <!--<div id="editor" style="height:300px;" ref="editor"/>-->
        <EditorTool  @editing="editing" :isClear="isClear" />
      </div>
      <el-form-item label="上传视频" ref="uploadElement" prop="video">
        <el-input v-model="ruleForm.video" v-if="false"></el-input>
        <el-upload
          class="avatar-uploader"
          style="float: left"
          ref="upload"
          :show-file-list="false"
          action="#"
          :before-upload="beforeUpload"
          :on-change="handleChange"
          :auto-upload="false"
          accept="video/*"
          :data="ruleForm">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <video
          controls
          aspectRatio="16:9"
          fluid
          width="200px"
          height="180px"
          ref="video"
          :style="{'display':isShow}"
        >
        </video>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="go">立即上传</el-button>
        <el-button @click="resetForm('ruleForm')">重置内容</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import E from 'wangeditor'
  import {reqGroups} from '../../api/index'
  import EditorTool from '../../components/EditorTool/EditorTool'
  export default {
    components:{EditorTool},
    data() {
      return {
        isClear:false ,       //清空编辑器内容
        loading : false,
        videoDetail: '',
        isShow:'none',
        groups:'',
        ruleForm: {
          content:'',         //编辑器内容
          videoDetail: '',
          video:'',
          videoName: '',
          uploadFile: '',
          videoGroup:'',
          updateTime :'',
          createTime  :'',
        },
        rules: {
          videoName: [
            {required: true, message: '请输入视频名称', trigger: 'blur'},
            {min: 0, message: '视频名称不能为空', trigger: 'blur'}
          ],
          videoGroup: [
            {required: true, message: '请输入视频组别', trigger: 'blur'},
            {min: 1, message: '组别不能为空', trigger: 'blur'}
          ],
          video: [
            {required: true, message: '请上传视频', trigger: 'blur'},
            {min: 0, message: '视频不能为空', trigger: 'blur'}
          ],
          createTime : [
            {required: true, message: '请选择录制时间', trigger: 'blur'},
          ],
          updateTime : [
            {required: true, message: '请选择新建时间', trigger: 'blur'},
          ],
          videoDetail: [{required: true}]
        }
      }
    },
    async mounted(){
      // this.editor = new E('editor')
      // this.editor.onchange = function () {
      //   this.videoDetail = this.$txt.html()
      // }
      // this.editor.create()
      var result = await reqGroups()
      this.groups = result.obj
      this.videoGroup = this.groups[0]
    },
    methods: {
      //编辑器通信
      editing(html,empty){ // html为接收的内容 empty判断内容是否为空
        this.ruleForm.content = html;
        if(empty ===1){     // 如果编辑器内容为空
          this.ruleForm.content = ''  // 将发送内容置为空
        }
        this.isClear = false;
      },

      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.isShow = 'none'
        this.$refs.video.src=''
        this.ruleForm.uploadFile=''
        // this.editor.$txt.html('')
        this.isClear = new Date().getDate();
      },

      handleChange (file, fileList) {
        this.$refs.video.src= URL.createObjectURL(file.raw)
        this.$refs.video.load()
        this.isShow = 'block'
        this.ruleForm.uploadFile = file.raw;
      },

      beforeUpload (file) {
      },

      formatDate(date){
        var year = date.getFullYear()
        if(date.getMonth()*1>=9){
          var month = date.getMonth()*1 +1
        }
        else
          var month = 0 + '' + (date.getMonth()*1 +1)
        if(date.getDate()*1>9)
          var day = date.getDate()
        else
          var day = 0 + '' + date.getDate()
        return year + '-' + month + '-' + day
      },

      go () {
        const {uploadFile,videoName,videoGroup,updateTime,createTime} = this.ruleForm
        if(videoName.trim()&&videoGroup&&this.ruleForm.content&&uploadFile&&updateTime&&createTime){
          this.loading = true
          var CTime = this.formatDate(createTime)
          var UTime = this.formatDate(updateTime)
          let param = new FormData() //创建form对象，私有，无法直接获取，只能通过get来查看其中的元素
          param.append('createTime',CTime)
          param.append('updateTime',UTime)
          param.append('uploadFile',uploadFile)
          param.append('videoDetail',this.ruleForm.content)
          param.append('videoGroup',videoGroup)
          param.append('videoName',videoName.trim())
          let config = {
            headers:{
              'Content-Type':'multipart/form-data',
            }
          }
          axios.post('http://47.112.132.177:8084/video/upload',param,config)
            .then(response=>{
              this.loading = false
              var result = response.data
              if(result.status == 200)    /*上传成功清空输入框*/
              {
                this.resetForm('ruleForm')
                // this.editor.$txt.html('')
                this.isClear = new Date().getDate();
                this.$message({
                  message: '上传成功',
                  type: 'success',
                  duration:'1000'
                });
              }else{
                this.$message({
                  message: '上传失败',
                  type: 'error',
                  duration:'1000'
                });
              }
            }).catch(err => console.log(err))
        }else{
          this.$message({
            message: '请输入完整信息',
            type: 'warning',
            duration:'1000'
          });
        }
      },
    }
  }
</script>
<style>
  video:focus{
    outline: 0;
  }
  .manage_textarea{
    width: 600px;
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

  .manage_input{
    width: 300px;
  }
  .manage_textarea{
    width: 800px;
  }
</style>

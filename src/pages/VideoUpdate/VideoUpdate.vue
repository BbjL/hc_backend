<template>
  <div class="upload-element" v-loading="loading">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="视频ID" prop="videoId">
        <el-input v-model="videoId" class="manage_input"></el-input>
      </el-form-item>
      <el-form-item label="视频名称" prop="videoName">
        <el-input v-model="ruleForm.videoName" class="manage_input"></el-input>
      </el-form-item>
      <el-form-item label="组别" prop="videoGroup">
        <el-select v-model="ruleForm.videoGroup" placeholder="选择组别">
          <el-option v-for="(item,index) in groups" :key="index" :label="item.groupName" :value="item.id" v-if="groups"/>
        </el-select>
      </el-form-item>
      <el-form-item label="录制时间" prop="date">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width:180px"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="视频详情" prop="videoDetail">
      </el-form-item>
      <div style="width: 90%;margin-left: 100px;margin-top: -30px;margin-bottom: 20px">
        <!--<div id="editor" style="height:300px;" ref="editor"></div>-->
        <EditorTool  @editing="editing" :isClear="isClear" :isUpdate="isUpdate" />
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
        <el-button type="primary" @click="go">立即修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置内容</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import {reqVideoDetails} from '../../api/index'
  import {reqGroups} from'../../api/index'
  import EditorTool from '../../components/EditorTool/EditorTool'
  export default {
    components:{EditorTool},
    data() {
      return {
        isUpdate:'',          //更新视频详情内容
        isClear:false,        //清空编辑器内容
        loading:false,
        videoId:'',
        videoDetail: '',
        isShow:'none',
        groups:'',
        ruleForm: {
          content:'',       //编辑器内容
          video:'',
          videoName: '',
          uploadFile: '',
          videoId:'',
          videoGroup:'',
          date:''
        },
        rules: {
          videoId: [
            {required: true, message: '请选择要修改的视频Id', trigger: 'blur'},
            {min: 1, message: '视频Id不能为空', trigger: 'blur'}
          ],
        }
      }
    },
    async mounted(){
      console.log(new Date().toLocaleDateString());
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

      resetForm (formName,type) {
        this.$refs[formName].resetFields()
        this.ruleForm.uploadFile=''
        this.isShow = 'none'
        if(!type)
          this.videoId = ''
        this.$refs.video.src = ''
        // this.editor.$txt.html('')
        this.isClear = new Date().getDate()
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
        const {uploadFile,videoName,videoGroup,videoId,date} = this.ruleForm
        if(videoId&&videoName.trim()&&videoGroup&&this.ruleForm.content&&uploadFile&&date){
          this.loading = true
          if(typeof videoGroup == 'string')
            var group = this.groups.filter(item=>item.groupName==videoGroup)[0].id
          else
            var group = videoGroup
          if(typeof date == 'object')
            var createTime = this.formatDate(date)
          else
            var createTime = date
          let param = new FormData(); //创建form对象，私有，无法直接获取，只能通过get来查看其中的元素
          param.append('id',videoId)
          param.append('createTime ',createTime)
          param.append('uploadFile',uploadFile)
          param.append('videoDetail',this.ruleForm.content)
          param.append('videoGroup',group)
          param.append('videoName',videoName.trim())
          let config = {
            headers:{
              'Content-Type':'multipart/form-data',
            }
          };
          axios.post('http://47.112.132.177:8084/video/update',param,config)
            .then(response=>{
              this.loading = false
              var result = response.data
              if(result.status == 200)    /*上传成功清空输入框*/
              {
                this.resetForm('ruleForm')
                this.isClear = new Date().getDate();
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration:'1000'
                });
              }else{
                this.$message({
                  message: '该视频序号不存在，修改失败',
                  type: 'error',
                  duration:'1000'
                });
              }
            }).catch(err => {
                this.loading = false
                this.$message({message: '系统出错!', type: 'error'});
            })
        }else{
          this.$message({
            message: '请输入需要修改的视频Id',
            type: 'warning',
            duration:'1000'
          });
        }
      },

      async reqVideo(){
        if(this.videoId){
          this.loading = true
          var result = await reqVideoDetails(this.videoId)
          if(result.status == 200){
            this.loading = false
            var obj = result.obj
            // this.editor.$txt.html(obj.videoDetail)
            this.ruleForm.content = this.isUpdate = obj.videoDetail
            this.ruleForm.date = obj.createTime
            this.ruleForm.videoGroup = this.groups.filter(item=>item.id== obj.videoGroup)[0].id
            this.ruleForm.videoName = obj.videoName
            this.ruleForm.video = obj.videoUrl
            this.ruleForm.uploadFile = obj.videoUrl
            this.$refs.video.src = 'http://47.112.132.177:8084/video/showVideo/' + this.videoId
            this.$refs.video.load()
            this.isShow = 'block'
          } else if(result.status == 500){
            this.loading = false
            this.$message({
              message: '没有对应ID的视频',
              type: 'warning',
              duration:'1000'
            });
          }else{
            this.$message({
              message: '网络出现错误',
              type: 'error',
              duration:'2000'
            });
          }
        }
      }
    },
    watch:{
      videoId(newval,oldval){
        this.resetForm('ruleForm',true)
        this.ruleForm.videoId = newval
        setTimeout(()=>{
          this.reqVideo()
        },300)
      }
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
    width: 100%;
    padding: 15px 0;
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

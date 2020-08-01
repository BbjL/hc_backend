<template>
  <div class="upload-element" v-loading="loading">
    <el-form
      :model="ruleForm"
      :rules="id?updateRules:rules"
      ref="ruleForm"
      label-position="left">
      <el-row>

        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label-width="100px" label="视频名称：" prop="videoName">
            <el-input style="width: 300px" v-model="ruleForm.videoName" placeholder="输入名称" class="manage_input"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item  label-width="70px" label="组别："  prop="videoGroup">
            <el-select :loading="!groups"  v-model="ruleForm.videoGroup" placeholder="选择组别" @change="selectedChange">
              <el-option v-for="(item,index) in groups" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label-width="100px" label="录制时间：" prop="createTime">
              <el-date-picker  type="date" placeholder="选择日期" v-model="ruleForm.createTime " style="width: 180px;"></el-date-picker>
          </el-form-item>
        </el-col>

      </el-row>

      <el-form-item label="简介：" label-width="70px"  prop="videoIntro" style="margin-bottom: 30px;">
          <el-input  v-model="ruleForm.videoIntro" :rows="1" type="textarea" class="article-textarea" autosize placeholder="简介内容" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
      </el-form-item>

      <el-form-item required prop="videoDetail" style="margin-bottom: 30px;">
        <Tinymce ref="editor" v-model="ruleForm.videoDetail" :height="400" />
      </el-form-item>

      <el-form-item prop="videoFile" required >
        <el-upload
          class="upload-demo"
          drag
          action=""
          :multiple="false"
          accept="video/*"
          :show-file-list="false"
          :on-change="beforeUploadVideo"
          :auto-upload="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将视频文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">请尽量上传.mp4文件</div>
        </el-upload>
        <div class="video-preview">
          <video
            ref="video"
            style="height: 100%;width: 100%;"
            v-show="videoFlag"
            aspectRatio="16:9"
            controls
            fluid>
          </video>
        </div>
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
import { mapActions , mapState } from 'vuex'

import Tinymce from '@/components/Tinymce'

export default {
  name:'index',
  components:{ Tinymce},
  data() {
    return {
      id:this.$route.query.id,
      loading : false,
      groups:'',
      videoFlag:false,
      videoUploadPercent:'',
      ruleForm: {
        videoName: '',      //名称
        videoDetail: '',    //详细介绍
        videoIntro:'',      //简介
        videoFile: '',      //视频文件
        videoGroup:'',      //所属组别id
        videoGroupZh:'',    //所属组别zh
        updateTime :'',
        createTime  :'',
      },
      rules: {
        videoName: [
          {required: true, message: '请输入视频名称', trigger: 'blur'},
          {max: 20, message: '视频名称不能为空', trigger: 'blur'}
        ],
        videoGroup: [
          {required: true, message: '请输入视频组别', trigger: 'blur'}
        ],
        videoIntro: [
          {required: true, message: '请输入简介', trigger: 'blur'},
          {min: 1, message: '组别不能为空', trigger: 'blur'},
          {max: 300, message: '简介不得超过300字', trigger: 'blur'}

        ],
        videoFile: [
          {required: true, message: '请上传视频', trigger: 'blur'},
        ],
        createTime: [
          {required: true, message: '请选择时间', trigger: 'blur'}
        ],
        videoUrl: [
          {required: true, message: '请上传视频', trigger: 'blur'}
        ],
        videoDetail: [{required: true}]

      },
      updateRules:{}
    }
  },
  mounted(){
    this.getGroups()

    const _id = this.id
    if(_id){
      this.reqVidByID(_id)
        .then(res => {
          console.log(res)
          if(res.status === 200){
            this.ruleForm.videoName = res.obj.videoName
            this.ruleForm.videoGroup = parseInt(res.obj.videoGroup)
            this.ruleForm.createTime = res.obj.createTime
            this.ruleForm.videoIntro = res.obj.videoIntro
            this.ruleForm.videoDetail = res.obj.videoDetail
            this.ruleForm.videoGroupZh = res.obj.videoGroupZh
            this.$refs['video'].src = this.BASE_URL + this.videos.vid_url  + _id
            this.videoFlag = true
          }
        })
     }
  },
  computed: {
    ...mapState(['BASE_URL' , 'videos']),

    contentShortLength() {
      return this.ruleForm.videoIntro.length
    },
  },
  methods:{
    ...mapActions([
      'updateVideo',
      'uploadVideo',
      'reqAllGroups',
      'reqVidByID'
    ]),

    //获取所有组别
    async getGroups(){
      let groupsArr = []

      this.reqAllGroups({})
        .then(res => {
          if(res.status === 200) {
            res.obj.forEach(item => {
              groupsArr.push({id:item.id , name:item.groupName})
            })
            console.log(groupsArr)
            this.groups = groupsArr
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    selectedChange(id){
      this.groups.forEach(item => {
        if(item.id === id){
          this.ruleForm.videoGroupZh = item.name
        }
      })
    },

    beforeUploadVideo(file) {
      this.videoFlag = true
      this.$refs['video'].src = URL.createObjectURL(file.raw)
      this.ruleForm.videoFile = file.raw
    },

    //校验表单
    submitForm(formName){
      console.log(this.ruleForm.videoGroup)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.uploadForm()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    //形成表单
    jointFormData(formName){
      let formData = new FormData()
      let createTime = ''

      if(this.id){
        formData.append('id', this.id)
      }

      try {
        createTime = this[formName].createTime.toLocaleDateString().replace(/\//g , '-')
      }catch (e) {
        createTime = this[formName].createTime
      }

      formData.append('videoName', this[formName].videoName)
      formData.append('videoGroup', this[formName].videoGroup)
      formData.append('videoGroupZh', this[formName].videoGroupZh)
      formData.append('createTime', createTime)
      formData.append('videoIntro', this[formName].videoIntro)
      formData.append('videoDetail',this[formName].videoDetail)
      formData.append('uploadFile', this[formName].videoFile)
      formData.append('updateTime', this.$getFormatTime())

      return formData
    },

    //提交变淡
    uploadForm(){
      const formData = this.jointFormData('ruleForm')
      this.uploadVideo(formData)
        .then(res => {
          console.log(res)
          if(res.status === 200){
            this.$notify({type:'错误' ,message:'服务器错误'})
          }
        })
        .catch(err =>{
          console.log(err)
          this.$notify({type:'error' ,message:'服务器错误'})
        })
    },

    //提交修改
    updateForm(){
      const formData = this.jointFormData('ruleForm')
      this.updateVideo(formData)
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
    }
  },
  watch:{
      $route: {
        handler:(to, from )=>{
          console.log(to.query)
        },
        // 深度观察监听
        deep: true
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


</style>

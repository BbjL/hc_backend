<template>
  <div class="upload-element" v-loading="loading">
    <el-form
      :model="ruleForm"
      :rules="id?updateRules:rules"
      ref="ruleForm"
      label-position="left">
      <el-row>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label-width="100px" label="奖项名：" prop="awardName">
            <el-input style="width: 300px" v-model="ruleForm.awardName  " placeholder="输入姓名" class="manage_input"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item  label-width="100px" label="所属组别："  prop="awardGroup">
            <el-select :loading="!groups"  v-model="ruleForm.awardGroup" placeholder="选择组别" >
              <el-option v-for="(item,index) in groups" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label-width="100px" label="加入时间：" prop="awardDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.awardDate" style="width: 180px;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="简介：" label-width="70px"  prop="awardDetail" style="margin-bottom: 30px;">
        <el-input v-model="ruleForm.awardDetail" :rows="1" type="textarea" class="article-textarea" autosize placeholder="简介内容" />
        <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
      </el-form-item>

      <el-form-item   prop="pre_img">
        <el-upload
          class="upload-demo"
          action=""
          :auto-upload="false"
          :on-change="changeImage"
          :multiple = 'false'
          :show-file-list = 'false'
          drag>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <!--preview-->
        <transition name="el-zoom-in-center">
          <div class="image-preview " v-show="ruleForm.pre_img">
            <div  class="image-preview-wrapper">
              <el-image
                :src="ruleForm.pre_img"
                class="image">
              </el-image>
              <div class="image-preview-action" >
                <i class="el-icon-delete" @click = "ruleForm.image = ruleForm.pre_img = ''"></i>
              </div>
            </div>
          </div>
        </transition>
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
      ruleForm: {
        awardName: '',
        awardGroup: '',
        awardDate:'',
        awardDetail: '',
        pre_img:'',
        image:''
      },
      rules: {
        awardName: [
          {required: true, message: '请输入奖项名', trigger: 'blur'}
        ],
        awardGroup: [
          {required: true, message: '请输入组别', trigger: 'blur'}
        ],
        awardDate:[
          {required: true, message: '请选择时间', trigger: 'blur'},
        ],
        memDetail: [
          {required: true, message: '请输入简介', trigger: 'blur'},
          {max: 300, message: '简介不得超过300字', trigger: 'blur'}
        ],
        pre_img: [
          {required: true, message: '请上传图片', trigger: 'blur'}
        ],
      },
      updateRules:{}
    }
  },
  mounted(){
    this.getGroups()

    const _id = this.id
    if(_id){
      this.reqAwardsByID(_id)
        .then(res => {
          console.log(res)
          if(res.status === 200){
            this.ruleForm.awardName = res.obj.awardName
            this.ruleForm.awardGroup = parseInt(res.obj.awardGroup)
            this.ruleForm.awardDetail = res.obj.awardDetail||''
            this.ruleForm.awardDate = res.obj.awardDate
            this.ruleForm.pre_img = this.BASE_URL + this.awards.awd_url  + _id
            console.log(this.BASE_URL + this.awards.awd_url  + _id)
          }
        })
    }
  },
  computed: {
    ...mapState(['BASE_URL' , 'awards']),

    contentShortLength() {
      if(this.ruleForm.memDetail){
        return this.ruleForm.memDetail.length
      }
    },
  },
  methods:{
    ...mapActions([
      'updateAward',
      'uploadAward',
      'reqAllGroups',
      'reqAwardsByID'
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

    //上传图片
    changeImage(file){
      this.ruleForm.pre_img = URL.createObjectURL(file.raw);
      this.ruleForm.image = file.raw;
    },

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
      let time = ''

      if(this.id){
        formData.append('id', this.id)
      }

      try {
        time = this[formName].awardDate.toLocaleDateString().replace(/\//g , '-')
      }catch (e) {
        time = this[formName].awardDate
      }

      formData.append('awardName', this[formName].awardName)
      formData.append('awardGroup', this[formName].awardGroup)
      formData.append('awardDetail',this[formName].awardDetail)
      formData.append('awardDate', time)
      formData.append('awardCt', this.$getFormatTime())
      formData.append('file', this[formName].image)

      return formData
    },

    // //提交变淡
    uploadForm(){
      const formData = this.jointFormData('ruleForm')

      this.$confirm('此操作将上传改成员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.uploadAward(formData)
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

      this.$confirm('此操作将修改该成员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateAward(formData)
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

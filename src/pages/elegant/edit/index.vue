<template>
  <div class="upload-element" v-loading="loading">
    <el-form
      :model="ruleForm"
      :rules="id?updateRules:rules"
      ref="ruleForm"
      label-position="left">
      <el-row>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label-width="100px" label="文章标题：" prop="articleName" >
            <el-input v-model="ruleForm.articleName " placeholder="输入标题" class="manage_input" style="width: 300px"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item  label-width="100px" label="获奖组别："  prop="articleGroup">
            <el-select :loading="!groups"  v-model="ruleForm.articleGroup" placeholder="选择组别" >
              <el-option v-for="(item,index) in groups" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label-width="100px" label="获奖时间：" prop="articleCt">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.articleCt " style="width: 180px;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label-width="100px" label="奖项名称：" prop="articleAward" >
            <el-input style="width: 300px" v-model="ruleForm.articleAward " placeholder="输入名称" class="manage_input"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item  label-width="100px" label="文章作者："  prop="articleAuthor">
            <el-input style="width: 300px" v-model="ruleForm.articleAuthor " placeholder="输入作者" class="manage_input"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-form-item label="简介：" label-width="70px"  prop="article_intro" style="margin-bottom: 30px;">
        <el-input v-model="ruleForm.article_intro" :rows="1" type="textarea" class="article-textarea" autosize placeholder="简介内容" />
        <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
      </el-form-item>

      <el-form-item  prop="articleContent" style="margin-bottom: 30px;">
        <Tinymce ref="editor" v-model="ruleForm.articleContent" :height="400" />
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
        articleName : '',
        articleGroup: '',
        articleCt :'',
        articleAward : '',
        articleAuthor:'',
        article_intro :'',
        articleContent  :'',
        articleUt :'',
        pre_img:'',
        image:''
      },
      rules: {
        articleName: [
          {required: true, message: '请输入文章标题', trigger: 'blur'},
          {max: 20, message: '文章标题不能为空', trigger: 'blur'}
        ],
        articleGroup: [
          {required: true, message: '请输入获奖组别', trigger: 'blur'}
        ],
        articleAward: [
          {required: true, message: '请输入奖项名称', trigger: 'blur'},
        ],
        articleCt: [
          {required: true, message: '请输入获奖时间', trigger: 'blur'},
        ],
        articleAuthor: [
          {required: true, message: '请输入作者', trigger: 'blur'},
        ],
        article_intro: [
          {required: true, message: '请输入简介', trigger: 'blur'},
          {max: 300, message: '简介不得超过300字', trigger: 'blur'}
        ],
        articleContent: [
          {required: true, message: '请输入文章内容', trigger: 'blur'}
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
      this.reqEleByID(_id)
        .then(res => {
          console.log(res)
          if(res.status === 200){
            this.ruleForm.articleName = res.obj.articleName
            this.ruleForm.articleGroup = parseInt(res.obj.articleGroup)
            this.ruleForm.articleCt = res.obj.articleCt
            this.ruleForm.articleAward = res.obj.articleAward
            this.ruleForm.articleAuthor = res.obj.articleAuthor
            this.ruleForm.article_intro = res.obj.article_intro||''
            this.ruleForm.articleContent = res.obj.articleContent
            this.ruleForm.articleUt = res.obj.articleUt
            this.ruleForm.pre_img = this.BASE_URL + this.elegants.ele_url  + _id
            console.log(this.BASE_URL + this.elegants.ele_url  + _id)
          }
        })
    }
  },
  computed: {
    ...mapState(['BASE_URL' , 'elegants']),

    contentShortLength() {
      return this.ruleForm.article_intro.length
    },
  },
  methods:{
    ...mapActions([
      'updateEle',
      'uploadEle',
      'reqAllGroups',
      'reqEleByID'
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
      let createTime = ''

      if(this.id){
        formData.append('id', this.id)
      }

      try {
        createTime = this[formName].articleCt.toLocaleDateString().replace(/\//g , '-')
      }catch (e) {
        createTime = this[formName].articleCt
      }

      formData.append('articleName', this[formName].articleName)
      formData.append('articleGroup', this[formName].articleGroup)
      formData.append('articleCt', createTime)
      formData.append('articleAward', this[formName].articleAward)
      formData.append('articleAuthor', this[formName].articleAward)
      formData.append('article_intro',this[formName].article_intro)
      formData.append('articleContent', this[formName].articleContent)
      formData.append('articleUt', this.$getFormatTime())
      formData.append('image', this[formName].image)

      return formData
    },

    // //提交变淡
    uploadForm(){
      const formData = this.jointFormData('ruleForm')
      this.uploadEle(formData)
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
    },

    //提交修改
    updateForm(){
      const formData = this.jointFormData('ruleForm')
      this.updateEle(formData)
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

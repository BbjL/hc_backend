<template>
  <div class="upload-element" v-loading="loading">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" enctype="multipart/form-data">
        <el-form-item label="比赛名称" prop="articleName" required>
          <el-input v-model="ruleForm.articleName" class="manage_input"></el-input>
        </el-form-item>
        <el-form-item label="成员名字" prop="articleAuthor" required>
          <el-input v-model="ruleForm.articleAuthor" class="manage_input"></el-input>
        </el-form-item>
        <el-form-item label="获得奖项" prop="articleAward" required>
          <el-input v-model="ruleForm.articleAward" class="manage_input"></el-input>
        </el-form-item>
        <el-form-item label="比赛时间" prop="articleCt">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.articleCt" style="width: 180px;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="上传时间" prop="articleUt">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.articleUt" style="width: 180px;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="比赛内容" prop="articleContent" required>
        </el-form-item>
        <div style="width: 90%;margin-left: 100px;margin-top: -60px;margin-bottom: 20px">
          <EditorTool  @editing="editing" :isClear="isClear" />
          <!--<div id="editor1" style="height:300px;" ref="editor"></div>-->
        </div>
        <el-form-item label="比赛图片" ref="uploadElement" prop="image">
          <el-upload
            class="avatar-uploader"
            ref="upload"
            :show-file-list="false"
            action=""
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :auto-upload="false"
            accept="image/*"
            :data="ruleForm">
            <img v-if="ruleForm.img" :src="ruleForm.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  import lrz from 'lrz'
  import EditorTool from '../../components/EditorTool/EditorTool'
  export default {
    components:{EditorTool},
    data() {
      return {
        isClear:false,      //是否清空编辑器内容
        loading: false,
        articleContent: '',
        article_intro:'',
        ruleForm: {
          content:'',       //编辑器内容
          articleAuthor: '',
          articleAward: '',
          articleName: '',
          image: '',
          img:'',
          articleCt:'',
          articleUt:''
        },
        rules: {
          articleName: [
            {required: true, message: '请输入风采名称', trigger: 'blur'},
            {min: 1, message: '风采名称不能为空', trigger: 'blur'}
          ],
          articleAuthor: [
            {required: true, message: '请输入成员名字', trigger: 'blur'},
            {min: 1, message: '成员不能为空', trigger: 'blur'}
          ],
          articleCt: [
            {required: true, message: '请输入比赛时间', trigger: 'blur'}
          ],
          articleUt: [
            {required: true, message: '请输入新建时间', trigger: 'blur'}
          ],
          image: [
            {required: true, message: '请至少一张风采图片', trigger: 'change'},
            {min: 0, message: '风采图片不能为空', trigger: 'blur'}
          ],
          articleAward: [
            {required: true, message: '请输入风采奖项', trigger: 'blur'},
            {min: 1, message: '风采奖项不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    mounted () {
      // this.editor = new E('editor1');  // 两个参数也可以传入 elem 对象，class 选择器
      // this.editor.onchange = function () {
      //   this.articleContent = this.$txt.text()
      // };
      // this.editor.create()
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
        this.$refs[formName].resetFields();
        this.ruleForm.image = '';
        this.ruleForm.img = '';
        // this.editor.$txt.html('')
        this.isClear = new Date().getDate();
      },

      handleChange (file, fileList) {
        this.ruleForm.img = URL.createObjectURL(file.raw)
        this.ruleForm.image = file.raw
        // if(file.size/1024/1024<1){
        //
        //   }else{
        //     this.$message({
        //       message: '请上传小于1M的图片',
        //       type: 'warning',
        //       duration:'1000'
        //     });
        // }
        /*this.ruleForm.img = URL.createObjectURL(file.raw)
        this.ruleForm.image = file.raw
        if(file.size/1024/1024>1)
          lrz(file.raw)*/
      },

      beforeUpload (file) {
        return true
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
        this.$confirm('确定上传？' , '提示' ,{
          cancelButtonText:'取消',
          confirmButtonText:'确定',
          type: 'warning'
        }).then(()=>{
          const {articleAuthor,articleAward,articleName,image,articleCt,articleUt} = this.ruleForm
          if(image&&articleName.trim()&&this.ruleForm.content&&articleAward.trim()&&articleAuthor.trim()&&articleCt&&articleUt){
            this.loading = true
            var createTime = this.formatDate(articleCt)
            var UTime = this.formatDate(articleUt)
            let param = new FormData(); //创建form对象，私有，无法直接获取，只能通过get来查看其中的元素
            param.append('articleAuthor',articleAuthor.trim())
            param.append('articleAward',articleAward.trim())
            param.append('articleContent',this.ruleForm.content)
            param.append('articleCt',createTime)
            param.append('articleUt',UTime)
            param.append('articleName',articleName.trim())
            param.append('image',image)
            let config = {
              headers:{
                'Content-Type':'multipart/form-data',
              }
            }
            axios.post('/api/elegant/upload',param,config)
              .then(response=>{
                var result = response.data
                this.loading = false
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
        }).catch(()=>{
          this.$message('取消操作！')
        })
      }
    },
  }
</script>
<style>
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

  .upload-element .manage_input{
    width: 300px;
  }
  .upload-element .manage_textarea{
    width: 800px;
  }
</style>

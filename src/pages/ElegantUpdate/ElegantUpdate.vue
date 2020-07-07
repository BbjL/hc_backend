<template>
  <div>
    <div class="upload-element" v-loading="loading">
      <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" enctype="multipart/form-data">
        <el-form-item label="比赛名称" prop="articleName">
          <el-input v-model="ruleForm.articleName" class="manage_input"></el-input>
        </el-form-item>
        <el-form-item label="成员名字" prop="articleAuthor">
          <el-input v-model="ruleForm.articleAuthor" class="manage_input"></el-input>
        </el-form-item>
        <el-form-item label="获得奖项" prop="articleAward">
          <el-input v-model="ruleForm.articleAward" class="manage_input"></el-input>
        </el-form-item>
        <el-form-item label="比赛时间" prop="articleCt">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.articleCt" style="width: 180px;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="比赛内容" prop="articleContent">
        </el-form-item>
        <div style="width:90%;margin-left: 100px;margin-top: -30px;margin-bottom: 20px">
          <EditorTool  @editing="editing" :isClear="isClear" :isUpdate="articleContent" />
        </div>
        <el-form-item label="比赛图片" ref="uploadElement" prop="image">
          <el-upload
            class="avatar-uploader"
            ref="upload"
            :show-file-list="false"
            action="api/elegant/upload"
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
          <el-button type="primary" @click="go">立即更新</el-button>
          <el-button @click="resetForm('ruleForm')">重置内容</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Bread from '../../components/Bread/Bread'
  import axios from 'axios'
  import {reqElegantDetails} from '../../api/index'
  import EditorTool from '../../components/EditorTool/EditorTool'
  export default {
    components:{EditorTool,Bread},
    data() {
      return {
        isClear:false,          //是否清空
        loading: false,
        articleContent: '',       // 更新获取编辑器内容
        articleId:'',
        ruleForm: {
          content:"",           //编辑器内容
          articleId:'',
          articleAuthor: '',
          articleAward: '',
          articleName: '',
          image: '',
          img:'',
          articleCt:''
        }
      }
    },
    mounted(){
      // const _id = this.$route.query.id
      this.reqElegant()
    },
    methods: {
      /**
       * 编辑器组件
       * @html 为接收的内容   @empty判断内容是否为空
       * */
      editing(html,empty){
        this.ruleForm.content = html;
        if(empty ===1){     // 如果编辑器内容为空
          this.ruleForm.content = ''  // 将发送内容置为空
        }
        this.isClear = false;
      },

      /**
       * 重置所有内容
       * */
      resetForm (formName,type) {
        this.$refs[formName].resetFields();
        this.isClear = new Date().getDate();
        this.ruleForm.image = '';
        this.ruleForm.img = '';
        if(!type)
          this.articleId = ''
      },

      handleChange (file, fileList) {
        this.ruleForm.img = URL.createObjectURL(file.raw)
        this.ruleForm.image = file.raw
      },

      beforeUpload (file) {
        return true;
      },

      /**
       * 初始化  获取当前风采信息
       * @id
       * */
      async reqElegant(){
        const _id = this.$route.query.id
        if(_id){
          this.loading = true
          var result  = {}
          try{
            result = await reqElegantDetails(_id)
          }catch(err){
            result.status = 500
            console.log('请求失败');
          }
          if(result.status==200){
            this.loading = false
            var obj = result.obj
            this.articleContent = obj.articleContent
            this.ruleForm.articleAuthor = obj.articleAuthor
            this.ruleForm.articleAward = obj.articleAward
            this.ruleForm.articleCt = obj.articleCt
            this.ruleForm.articleName = obj.articleName
            this.ruleForm.img = 'http://47.112.132.177:8084/elegant/showimg/{id}?id=' + _id
            this.ruleForm.image = obj.articleImg
          }else if(result.status==500){
            this.loading = false
            this.$message({
              message: '没有对应ID的风采',
              type: 'warning',
              duration:'1000'
            });
          }else{
            this.loading  = false
            this.$message({
              message: '网络出现错误',
              type: 'error',
              duration:'2000'
            });
          }
        }
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
        this.$confirm('确定修改吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          const {articleAuthor, articleAward,articleName,image,articleCt} = this.ruleForm
          //image&&articleName.trim()&&this.ruleForm.content&&articleAward.trim()&&articleAuthor.trim()
          if(1){
            this.loading = true
            if(typeof articleCt == 'object')
              var createTime = this.formatDate(articleCt)
            else
              var createTime = articleCt
            let param = new FormData(); //创建form对象，私有，无法直接获取，只能通过get来查看其中的元素
            param.append('articleAuthor',articleAuthor.trim())
            param.append('articleAward',articleAward.trim())
            param.append('articleContent',this.ruleForm.content)
            param.append('articleCt',createTime)
            param.append('articleName',articleName.trim())
            param.append('image',image)
            param.append('id',this.$route.query.id);
            let config = {
              headers:{
                'Content-Type':'multipart/form-data',
              }
            };
            axios.post('/api/elegant/update',param,config)
              .then(response=>{
                this.loading = false;
                var result = response.data;
                console.log(result)
                if(result.status == 200)    /*上传成功清空输入框*/
                {
                  //修改内容
                  // const _id = this.$route.query.id;
                  this.reqElegant();
                  this.isClear =false
                  this.$message({message: '修改成功', type: 'success', duration:'1000'});
                }else{
                  this.$message({message: '修改失败', type: 'error'});
                }
              }).catch(err => console.log(err))
          }else{
            this.$message({message: '请输入全部内容', type: 'warning'});
          }
        }).catch(()=>{
          this.$message('取消操作！')
        })
      }
    },
    watch:{
      articleId(newval,oldval){
        this.resetForm('ruleForm',true)
        this.ruleForm.articleId = newval
        setTimeout(()=>{
          this.reqElegant()
        },300)
      }
    }
  }
</script>
<style>
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

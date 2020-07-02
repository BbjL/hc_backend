<template>
  <div class="upload-box">
    <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
      <el-form-item label="组别名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入组别名称" ></el-input>
      </el-form-item>
      <el-form-item label="封面图片" prop="imageUrl">
        <el-input ref="imgFile" type="file" v-model="ruleForm.imageUrl"  v-if='false'></el-input>
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleChange">
          <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="成员信息" prop="">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                     <i class="el-icon-zoom-in"></i>
                  </span>
                  <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="组别介绍" prop="content">
        <EditorTool @editing="editing" :isClear="isClear"/>
        <el-input type="textarea" v-model="ruleForm.content" v-if="false"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-show="" type="primary" @click="submitForm('ruleForm')">上传</el-button>
        <el-button v-show="" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Bread from '@/components/Bread/Bread'
  import EditorTool from '@/components/EditorTool/EditorTool'
  import {uploadTeam} from "../../api";
  export default {
    components:{Bread,EditorTool},
    props:{
      whichPage:Boolean
    },
    data() {
      return {
        formData:new FormData(),
        isClear:false,        //是否清空编辑器
        dialogImageUrl: '',   //成员列表
        dialogVisible: false,
        disabled: false,
        ruleForm: {           //表单数据
          name: '',           //组别名称
          imageUrl:'',        //封面图片
          content:'',         //组别介绍
        },
        rules: {            //输入规则
          name: [
            { required: true, message: '请输入组别名称', trigger: 'blur' },
            { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
          ],
          imageUrl:[
            { required: true, message: '请上传图片', trigger: 'blur' }
          ],
          content:[
            {required:true, message:'请输入介绍内容',trigger:'blur'}
          ]
        }
      };
    },
    methods: {
      //表单上传
      submitForm(formName) {
        this.formData.append('groupName',this.ruleForm.name);
        this.formData.append('groupIntro', this.ruleForm.content);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.upload(this.formData);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.isClear = true;
        this.$refs[formName].resetFields();
      },
      //图片上传
      handleChange (file) {
        this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
        this.formData.append('file',file.raw);
      },
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      editing(html){
        this.ruleForm.content = html;
        this.isClear = false;
      },
      async upload(formdata){
        const response = await uploadTeam(formdata);
        if(response.status === 200){
          this.isClear = true;
          this.resetForm('ruleForm');
          this.$message({
            message: '上传成功！',
            type: 'success'
          });
        }else{
          this.$message({
            message: '上传失败！',
            type: 'success'
          });
        }
      },

    },
    watch:{
      whichPage:{
        handler(newV,oldV){
          if(newV){

          }
        },
        deep:true
      }
    }
  }
</script>

<style>
  .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    position: absolute;
    height:100%;
    width:auto;
    left:50%;
    transform:translateX(-50%);
  }

  .el-input__inner{
    width: auto;
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
</style>

<style lang="stylus" rel="stylesheet/stylus">
  .upload-box
    margin-top 20px
    padding 20px
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    background-color white
</style>

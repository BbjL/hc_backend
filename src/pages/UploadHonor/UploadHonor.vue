<template>
    <div class="upload-update-honor">
      <Bread v-if="$route.query.id*1 === 0" locational1="团队奖项" path1="/uploadhonor?id=0"  locational2="上传奖项" path2="uploadhonor?id=0"/>
      <Bread v-else locational1="团队奖项" path1="" locational2="奖项信息" locational3="信息修改" path2="/teamhonor"/>
      <div class="loading" v-loading="loading" v-if="loading"></div>
      <el-form class="upload-award" ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="奖项名称" prop="awardName">
          <el-input  v-model="form.awardName" placeholder="请输入奖项名称"></el-input>
        </el-form-item>
        <el-form-item label="获奖组别" prop="awardGroup">
          <el-select  @change="selectChange" v-model="form.awardGroup" placeholder="请输入获奖组别">
            <el-option :ref="'option'+group.id" :label="group.groupName" :value="group.id" v-for="(group, index) in groups" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="获奖时间" prop="awardDate">
          <el-date-picker
            type="date"
            placeholder="选择时间"
            v-model="form.awardDate"
            @change="handleDateChange"
            value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="奖项图片" prop="imageUrl">
          <el-input ref="imgFile" type="file" v-model="form.imageUrl"  v-if='false'></el-input>
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleChange">
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="奖项介绍" prop="awardDetail">
          <el-input type="textarea" v-model="form.awardDetail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$route.query.id*1===0" type="primary" @click="onSubmit('form')">立即上传</el-button>
          <el-button v-if="$route.query.id*1===0" @click="clearForm('form')">清空</el-button>
          <el-button v-if="$route.query.id*1!==0" type="primary" @click="onUpdate('form')">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import {reqTeams,reqGroupAllno,updateAward,uploadAward,reqAllAward,reqGroupAward,reqAward} from "../../api";
  import Bread from '../../components/Bread/Bread'
  export default {
        name: "UploadHonor",
        data(){
          return {
            formData:new FormData(),
            loading:false ,         //加载中
            groups:'',               //所有组别
            selectStatus:false,
            form:{
              awardName:'',         //奖项名称
              awardGroup:'',        //获奖组别
              awardDate:'',         //获奖日期
              awardDetail:'',       //奖项内容
              imageUrl:'',        //照片回显
              imageData:''        //照片数据
            },
            rules:{
              awardName: [
                { required: true, message: '请输入奖项名称', trigger: 'blur' },
              ],
              imageUrl:[
                { required: true , message:'请上传奖项图片'}
              ],
              awardGroup: [
                { required: true, message: '请输入获奖组别', trigger: 'blur' },
              ],
              awardDate: [
                { required: true, message: '请输入获奖时间', trigger: 'blur' },
              ],
              awardDetail: [
                { required: true, message: '请输入奖项描述', trigger: 'blur' },
              ]
            }
          }
        },
        components:{Bread},
        mounted(){
          this.initPage();
          console.log(this.$route.query.id);
        },
        methods: {
          //页面初始化
          async initPage(){
            const groups = await reqTeams();
            this.groups = groups.obj;
            if(this.$route.query.id*1 !== 0){
              this.rules = {};      //清除表单验证
              const _id = this.$route.query.id;
              const info  = await reqAward(_id)     //获取对应奖项
              if(info.status == 200){
                this.form.awardName = info.obj.awardName;
                this.form.awardGroup = info.obj.awardGroupZh;
                this.form.awardDate = info.obj.awardDate;
                this.form.awardDetail = info.obj.awardDetail;
                this.form.imageUrl = 'http://47.112.132.177:8084/award/showimg/{id}?id='+info.obj.id;
              }else{
                this.$message({type: 'error', message:'获取成员信息失败！'});
              }
            }else{

              return
            }
          },

          //表单上传
          onSubmit(formName) {
            this.$refs[formName].validate((valid)=>{      //表单校验
              if(valid){
                this.$confirm('确定要上传吗？' , '提示' ,{
                  type:"warning",
                  confirmButtonText: '确定',
                  cancelButtonText: '取消'
                }).then( ()=>{
                  this.loading = true;
                  (async ()=>{                            //拼接formdata
                    await this.jointFormData();
                    try {                                                //异常捕捉
                      const result = await uploadAward(this.formData);
                      if(result.status === 200){                          //是否上传成功
                        this.$message({type:'success', message:'上传成功！'});
                        this.$refs[formName].resetFields();
                      }else{
                        this.$message({type:'error', message:'上传失败！'});
                      }
                    } catch(e){
                      this.$message({type:'error', message:'上传失败！'});
                      console.log('请求错误！');
                    }
                    this.formData = new FormData();
                    //清空表单
                    this.loading = false;
                  })();
                }).catch(async ()=>{
                  console.log('cancel!');
                })
              }
            });
          },

          //表单清空
          clearForm(formName){
            this.$confirm('确定清空吗？' , '提示', {
              type:'warning',
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(()=>{
              this.$refs[formName].resetFields();
            }).catch(()=>{} )
          },

          //图片上传
          handleChange(file){
            this.form.imageUrl = URL.createObjectURL(file.raw);
            this.form.imageData = file.raw;
          },

          //拼接formdata
          async jointFormData(isUpdate){  //是否为更新
            const timer = new Date().toLocaleDateString();
            const timerStr = timer.slice(0,10).split('/').join('-');
            const _id = this.$route.query.id;
            const info  = await reqAward(_id)     //获取对应奖项
            this.formData.append('awardName ' ,  this.form.awardName);
            this.selectStatus?this.formData.append('awardGroup' ,  this.form.awardGroup):this.formData.append('awardGroup' ,info.obj.awardGroup )
            this.formData.append('awardDate' ,  this.form.awardDate);
            this.formData.append('awardDetail  ' ,  this.form.awardDetail);
            this.form.imageData==''?'':this.formData.append('file' , this.form.imageData);
            isUpdate?this.formData.append('id' ,_id ):'';
            this.formData.append('awardCt  ', timerStr);
          },

          handleDateChange(value){
            console.log(value);
          },

          //select选中值改变
          selectChange(){
            this.selectStatus = true;
          },

          //成员信息修改
          onUpdate(){
            this.$confirm('确定要修改吗？' , '提示' ,{
              type:"warning",
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(()=>{
              (async ()=>{
                this.formData = new FormData();
                await this.jointFormData(true);
                try{
                  const result = await updateAward(this.formData);
                  if(result.status == 200){
                    this.$message({type:'success', message:'修改成功！'});
                  }else{
                    this.$message({type:'error', message:'修改失败！'});
                  }
                }catch(err){
                  this.$message({type:'error', message:'修改失败！'});
                }
              })();
            }).catch()
          }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .upload-award
    min-height 700px
    padding 15px
    background-color white
</style>

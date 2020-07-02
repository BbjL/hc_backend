<template>
    <div >
      <Bread v-if="$route.params.id*1 === 0" locational1="团队成员" locational2="成员上传" />
      <Bread v-else locational1="团队成员" locational2="成员信息" locational3="信息修改" path2="/teammembers"/>
      <div class="loading" v-loading="loading" v-if="loading"></div>
      <el-form class="uplaod-mems" ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="成员姓名" prop="name">
          <el-input  v-model="form.name" placeholder="请输入成员姓名"></el-input>
        </el-form-item>
        <el-form-item label="成员专业" prop="major">
          <el-input  v-model="form.major" placeholder="请输入成员专业"></el-input>
        </el-form-item>
        <el-form-item label="加入时间" prop="beginDate">
          <el-date-picker
            type="date"
            placeholder="选择时间"
            v-model="form.beginDate"
            value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="退出时间" prop="endDate">
          <el-date-picker
            type="date"
            placeholder="选择时间"
            value-format="yyyy-MM-dd"
            v-model="form.endDate" ></el-date-picker>
        </el-form-item>
        <el-form-item label="成员头像" prop="imageUrl">
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
        <el-form-item label="成员组别" prop="group" >
          <el-select @change="groupSelectChange" v-model="form.group" placeholder="请选择成员组别" >
            <el-option v-if="allGroups!=''"  :label="group.groupName" :value="group.id" v-for="(group,index) in allGroups" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成员方向" prop="direct" >
          <el-select  v-model="form.direct" placeholder="请选择成员方向">
            <el-option v-if="allDirects !='' " :label="direct.directName" :value="direct.id" v-for="(direct,index) in allDirects" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成员介绍" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$route.params.id*1===0" type="primary" @click="onSubmit('form')">立即上传</el-button>
          <el-button v-if="$route.params.id*1===0" @click="clearForm('form')">清空</el-button>
          <el-button v-if="$route.params.id*1!==0" type="primary" @click="onUpdate('form')">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import {uploadMems,updateMems,reqSomeMems,reqTeams,reqGroupDirect} from "../../api";
  import Bread from '../../components/Bread/Bread'
  export default {
    components:{Bread},
    props:['row'],
    data() {
      return {
        formData:new FormData(),
        loading:false,
        allGroups:'',               //所有组别
        allDirects:'',               //所有方向
        updateInitGroupDirect:false,      //修改成员时是否有更改组别和方向
        updateInitGroupId:'',               //初始化显示时组别id
        updateInitDirectId:'',              //初始化显示方向id
        form: {
          name: '',       //成员姓名
          major:'',       //成员专业
          group: '',      //成员组别
          direct: '',     //成员方向
          desc: '',       //成员描述
          imageUrl:'',    //照片显示
          imageData:'',    //照片文件
          beginDate:'',     //加入时间
          endDate:''
        },
        rules:{
          name: [
            { required: true, message: '请输入成员名称', trigger: 'blur' },
          ],
          imageUrl:[
            { required: true , message:'请上传成员头像'}
          ],
          major: [
            { required: true, message: '请输入成员专业', trigger: 'blur' },
          ],
          group: [
            { required: true, message: '请选择成员组别', trigger: 'blur' },
          ],
          direct: [
            { required: true, message: '请选择成员方向', trigger: 'blur' },
          ],
          desc:[
            {required:true, message:'请输入成员描述',trigger:'blur'}
          ],
          beginDate:[
            {required:true, message:'请选择时间',trigger:'blur'}
          ]
        }
      }
    },
    async mounted(){
      this.initPage()
    },
    methods: {
      //页面初始化
      async initPage(){
        const groups = await reqTeams();           //获取所有组别
        if(groups.status == 200 ) this.allGroups = groups.obj;

        if(this.$route.params.id*1 != 0){
          this.rules = {};      //清除表单验证
          const _id = this.$route.params.id;
          const info  = await reqSomeMems(_id)
          if(info.status == 200){
            this.form.name = info.obj.memName;
            this.form.major = info.obj.memMajor;
            this.form.group = info.obj.memGroupZh;
            this.form.direct = info.obj.memDirectZh;
            this.updateInitGroupId = info.obj.memGroup
            this.updateInitDirectId = info.obj.memDirect
            this.form.beginDate = info.obj.memBegin;
            this.form.endDate = info.obj.memEnd;
            this.form.imageUrl = 'http://47.112.132.177:8084/mem/showimg/{id}?id='+ info.obj.id;
            this.form.desc = info.obj.memDetail;
            const reqDirectResult = await reqGroupDirect(this.updateInitGroupId);
            console.log(reqDirectResult);
            if(reqDirectResult.status == 200){
              this.allDirects = reqDirectResult.obj
            }
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
                const result = await uploadMems(this.formData);
                console.log(result);
                if(result.status === 200){                          //是否上传成功
                  this.$message({type:'success', message:'上传成功！'});
                  this.$refs['form'].resetFields();
                }else{
                  this.$message({type:'error', message:'上传失败！'});
                }
                //   try {                                                //异常捕捉
                //   const result = await uploadMems(this.formData);
                //   if(result.status === 200){                          //是否上传成功
                //     this.$message({type:'success', message:'上传成功！'});
                //   }else{
                //     this.$message({type:'error', message:'上传失败！'});
                //   }
                // } catch(e){
                //     this.$message({type:'error', message:'上传失败！'});
                //     console.log('请求错误！');
                // }
                this.formData = new FormData();
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
      jointFormData(){
        const _id = this.$route.params.id;
        const timer = new Date().toLocaleDateString();
        const timerStr = timer.slice(0,10).split('/').join('-');
        this.formData.append('memName' ,  this.form.name);
        this.formData.append('memMajor' ,  this.form.major);
        this.updateInitGroupDirect ?this.formData.append('memGroup' ,  this.form.group):this.formData.append('memGroup' ,  this.updateInitGroupId);
        this.updateInitGroupDirect ?this.formData.append('memDirect' ,  this.form.direct):this.formData.append('memDirect' ,this.updateInitDirectId);
        this.formData.append('memDetail' ,  this.form.desc);
        this.form.beginDate != null ?this.formData.append('memBegin',  this.form.beginDate):'';
        this.form.endDate != null ?this.formData.append('memEnd',  this.form.endDate):'';
        this.formData.append('memCt', timerStr);
        this.imageData!=''?this.formData.append('file' , this.form.imageData):'';
        _id!=0?this.formData.append('id' , _id ):''
      },



      //成员信息修改
      onUpdate(){
        const _updateId = this.$route.params.id;
        this.$confirm('确定修改吗？' , '提示', {
          type:'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(()=>{
          (async ()=>{
            this.formData = new FormData();
            await this.jointFormData();
            const formData =  this.formData;
            const result = await updateMems(formData)
            console.log(result);
            if(result.status == 200 ) {
              this.$message({type: 'success', message:'修改成员信息成功！'});
            }else{
              this.$message({type: 'error', message:'修改成员信失败！'});
            }
          })();
        }).catch(()=>{} );
      },

      //组别选择改变获取方向
      async groupSelectChange(currentGroup){ //获取 option当前的value值
        this.updateInitGroupDirect = true;
        console.log(currentGroup);
        const getGroupDirct = await reqGroupDirect(currentGroup);
        this.form.direct = '';
        console.log(getGroupDirct);
        if(getGroupDirct.status == 200 )  this.allDirects = getGroupDirct.obj
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .uplaod-mems
    background-color white
    padding 15px
    .el-input__inner
      width: auto;
</style>

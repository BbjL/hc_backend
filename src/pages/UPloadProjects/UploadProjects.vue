<template>
  <div>
    <div class="loading" v-loading="loading" v-if="loading"></div>
    <div class="upload-box" >
      <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm" @submit.native.prevent>
        <el-form-item label="项目名称" prop="proName">
          <el-input style="width: auto" v-model="ruleForm.proName" placeholder="请输入项目名称" ></el-input>
        </el-form-item>
        <el-form-item label="项目组别" prop="proGroup">
          <el-select @change="groupSelectChange" v-model="ruleForm.proGroup" placeholder="请选择项目组别" >
            <el-option v-if="allGroups!=''"  :label="group.groupName" :value="group.id" v-for="(group,index) in allGroups" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择项目时间" prop="proDate">
          <el-date-picker
            v-model="ruleForm.proDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目简介" prop="proIntro">
          <el-input  v-model="ruleForm.proIntro" placeholder="请输入项目简介" ></el-input>
        </el-form-item>
        <el-form-item label="项目图片" prop="imageUrl">
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
        <el-form-item label="项目介绍" prop="proDetail">
          <EditorTool  @editing="editing" :isClear="isClear" :isUpdate="isUpdate"/>
          <el-input type="textarea" v-model="ruleForm.proDetail" v-if="false"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-show="!id" type="primary" @click="submitForm('ruleForm')">上传</el-button>
          <el-button   @click="ifReset('ruleForm')">重置</el-button>
          <el-button v-show="id"  @click="handleUpdate()" type="primary">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
  import Bread from '../../components/Bread/Bread'
  import EditorTool from '../../components/EditorTool/EditorTool'
  import {uploadProjects, updateProjects ,reqAllProjects ,reqTeams , reqGroupAllno} from "../../api";
  // import {uploadTeam,reqTeams,reqUpdate,uploadGroupDirect,reqGroupDirect,deleteGroupDirect} from "../../api";
  export default {
    components:{Bread,EditorTool},
    data() {
      return {
        formData:new FormData(),
        id:this.$route.query.id*1,
        isClear:false,        //是否清空编辑器
        dialogVisible:false,   //是否上传对话框
        allGroups:'',           //所有组别
        allProjects:'',               //所有项目
        imageData:'',

        updateInitProjectGroup:false,      //修改成员时是否有更改组别和方向
        updateInitProjectGroupId:'',               //初始化显示时组别id

        isUpdate:'',            //将修改信息粘贴在编辑器你
        loading:false,          //请求中

        ruleForm: {           //表单数据
          proName : '',           //项目名称
          proGroup :'',        //项目图片
          proDate :'' ,        //项目日期
          proIntro:'',          //项目简介
          proDetail :'',         //项目介绍
          imageUrl:'',          //项目图片
        },
        rules: {            //输入规则
          proName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          proGroup:[
            {required:true, message:'请输入项目组别',trigger:'blur'}
          ],
          proDate:[
            {required:true, message:'请输入项目时间',trigger:'blur'}
          ],
          proIntro:[
            {required:true, message:'请输入项目简介',trigger:'blur'}
          ],
          imageUrl:[
            { required: true , message: '请上传图片', trigger: 'blur' }
          ],
          proDetail:[
            {required:true, message:'请输入介绍内容',trigger:'blur'}
          ],

        }
      };
    },
    mounted(){
      this.init()
    },
    beforeDestroy() {
      clearInterval(this.timer);
      this.timer = null;
    },
    methods: {
      //初始化
      async init(){
        const group = await reqTeams();           //获取所有组别
        if(group.status == 200 ) this.allGroups = group.obj;

        const projects = await reqAllProjects();
        console.log(projects);
        if(projects.status == 200 ) this.allProjects = projects.obj;

        if(this.id!==0){
          this.rules = {};
          const arr = projects.obj;
          arr.map((item,index)=>{             //获取对应id分组
            if(item.id === this.id*1){
              this.ruleForm.proName = item.proName;
              this.ruleForm.proGroup = item.proGrgoupZh;
              this.updateInitProjectGroupId = item.proGroup
              this.ruleForm.proDate = item.proDate;
              this.ruleForm.proDetail = this.isUpdate  = item.proDetail;
              this.ruleForm.proIntro = item.proIntro
              // this.ruleForm.radio =  item.groupIsenabled;
              this.ruleForm.imageUrl = 'http://47.112.132.177:8084/pro/showimg/{id}?id='+item.id;
              return
            }
          });
        }
      },

      //表单校验
      submitForm(formName) {
        this.$refs[formName].validate((valid) => { //表单校验
          if (valid) {
            this.$confirm('确定上传吗？','提示',{            //是否上传
              type:"warning",
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(()=>{
                (async ()=>{
                  this.formData = new FormData();       //清空上次表单数据
                  await this.jointFormData('submit');       //拼接表单数据
                  this.upload(this.formData);
                })();
            }).catch(()=>{})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      //确定重置
      ifReset(){
        this.$confirm('确定要重置内容吗？',  '提示',{
          type:'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(()=>{
          this.resetForm('ruleForm')
        }).catch()
      },

      //重置表单
      resetForm(formName) {
        this.isClear = true;
        this.$refs[formName].resetFields();
      },

      //图片上传
      handleChange (file) {
        this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
        this.imageData = file.raw;
      },

      //更新内容
      async handleUpdate(){
        this.$confirm('确定要修改吗？', '提示',{
          type:"warning",
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then( ()=>{
          (async ()=>{          //异步上传
            this.loading = true;
            this.formData = new FormData();     //清空上次的formdata
            await this.jointFormData('update');
            const response = await updateProjects(this.formData);
            if(response.status === 200){
              this.loading = false;
              this.formData = new FormData();
              this.$message({message: '修改成功！', type: 'success'});
            }else{
              this.$message({message: '修改失败！', type: 'error'});
              this.loading = false;
            }
          })()
        }).catch(()=>{

        })
      },

      //编辑器通信
      editing(html,empty){ // html为接收的内容 empty判断内容是否为空
        this.ruleForm.proDetail = html;
        if(empty ===1){     // 如果编辑器内容为空
          this.ruleForm.proDetail = ''  // 将发送内容置为空
        }
        this.isClear = false;
      },

      //发送上传请求
      async upload(formdata){
        this.loading = true;
        const response = await uploadProjects(formdata);
        if(response.status === 200){
          this.loading = false;
          this.isClear = true;
          this.resetForm('ruleForm');
          this.$message({message: '上传成功！', type: 'success'});
        }else{
          this.loading = false;
          this.$message({message: '上传失败！', type: 'error'});
        }
      },

      //拼接表单
      jointFormData(type){
        const timer  = new Date().toLocaleString();
        const timerStr = timer.slice(0,8).split('/').join('-');
        this.formData.append('proName ',this.ruleForm.proName);
        this.formData.append('proGroup',this.updateInitProjectGroup? this.ruleForm.proGroup:this.updateInitProjectGroupId);
        this.formData.append('proDate', this.ruleForm.proDate);
        this.formData.append('proIntro', this.ruleForm.proIntro);
        this.formData.append('delFlag'  , 0);                         //上传状态默认显示
        this.imageData!=''?this.formData.append('file' , this.imageData):'';
        this.formData.append('proDetail ' , this.ruleForm.proDetail);
        this.formData.append('proCt ' , timerStr);
        type === 'update'?this.formData.append('id',this.id):0
      },

      groupSelectChange(){
        //组别更改
        this.updateInitProjectGroup = true
      }

    },
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  .upload-box
    margin-top 20px
    padding 20px
    background-color white
</style>

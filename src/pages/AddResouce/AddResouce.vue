<template>
    <div>
      <el-form class="tab-wrapper" ref="resourceForm" :rules="rules" label-width="100px" :model="resourceForm" label-position="top">
        <el-form-item label="设备名称"  prop="name">
          <el-input v-model="resourceForm.name"  placeholder="输入名称"></el-input>
        </el-form-item>
        <el-form-item label="上传设备图片" prop="imageUrl">
          <el-input v-model="resourceForm.imageUrl" v-if="false"></el-input>
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleChange">
            <!--:src="'http://47.112.132.177:8084/res/showimg/{id}?id='+resourceForm.imageUrl"   resourceForm.imageUrl-->
            <img v-if="resourceForm.imageUrl" :src="resourceForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="设备描述" prop="content">
          <el-input
            autosize
            type="textarea"
            placeholder="右下角可扩大输入框"
            v-model="resourceForm.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$route.query.id*1 === 0" type="primary" @click="submitForm('resourceForm')">上传</el-button>
          <el-button v-else type="primary" @click="updateForm('resourceForm')">修改</el-button>
          <el-button @click="reset">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import {reqAllReso,uploadReso,updateReso} from "../../api";
    export default {
        name: "AddResource",
        data(){
          return {
            formData:new FormData(),          //待发送数据
            resourceForm:{
              name:'',          //名称
              content:'',        //描述
              imageUrl:'',      //回显
              image:{},
            },      //表单数据
            rules:{
              name:[
                { required: true, message: '请输入设备名称', trigger: 'blur' },
              ],
              imageUrl:[
                { required: true, message: '请添加设备图片', trigger: 'blur' },
              ],
              content:[
                { required: true, message: '请输入设备描述', trigger: 'blur' },
              ],
            },                       //检验规则
            sendImage:false
          }
        },
        mounted(){
          this.init();
        },
        methods:{
          //初始化
          async init(){
            let target = '';
            if(this.$route.query.id * 1 !== 0){
                this.rules = {};
                const allResource = await reqAllReso();
                console.log(allResource);
                allResource.forEach( (item)=>{
                  item.id === this.$route.query.id *1 ? target = item:''
                })
            }else{
              return
            }
            this.resourceForm.name = target.resName;
            this.resourceForm.imageUrl = 'http://47.112.132.177:8084/res/showimg/{id}?id=' + target.id;
            this.resourceForm.content =  target.resDetail;
          },
          //上传表单
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$confirm('确定要上传吗？', '提示', {
                  type:'warning',
                  confirmButtonText: '确定',
                  cancelButtonText: '取消'
                }).then(()=>{
                  (async ()=>{
                    await this.jointFormData();
                    const result = await uploadReso(this.formData);
                    if(result.status === 200){
                      this.$message({type: 'success', message: result.msg});
                      //清空内容
                      this.reset()
                    }else{
                      this.$message({type: 'error', message: result.msg});
                    }
                    // try{
                    //   const result = await uploadReso(this.formData);
                    //   if(result.status === 200){
                    //     this.$message({type: 'success', message: result.msg});
                    //     //清空内容
                    //     this.reset()
                    //   }else{
                    //     this.$message({type: 'error', message: result.msg});
                    //   }
                    // }catch(e){
                    //   this.$message({type: 'error', message: '上传失败！'});
                    //   console.log(e+'请求错误！');
                    // }
                    this.formData = new FormData();
                  })();
                }).catch()
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          //修改内容

          updateForm(){
            this.$confirm('确定要修改吗？', '提示', {
              type:'warning',
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(()=>{
              (async ()=>{
                await this.jointFormData(1);
                try{
                  const result = await updateReso(this.formData);
                  if(result.status === 200){
                    this.$message({type: 'success', message: result.msg});
                  }else{
                    this.$message({type: 'error', message: result.msg});
                  }
                }catch(e){
                  this.$message({type: 'error', message: '上传失败！'});
                  console.log(e+'请求错误！');
                }
                this.formData = new FormData();
              })();
            }).catch()
          },
          //清空表单
          reset(){
            this.resourceForm.name = '';
            this.resourceForm.image = '';
            this.resourceForm.imageUrl = '';
            this.resourceForm.content = '';
          },
          //图片回显
          handleChange(file) {
            this.resourceForm.imageUrl = URL.createObjectURL(file.raw);
            this.resourceForm.image = file.raw;
            this.sendImage = true
          },
          jointFormData(id=0){ // id 指定修改内容
            const timer = new Date().toLocaleDateString();
            const timerStr = timer.slice(0,10).split('/').join('-');
            this.formData.append('resName' , this.resourceForm.name);
            this.formData.append('resDetail ' , this.resourceForm.content);
            this.formData.append('resCt' ,timerStr);
            this.sendImage?this.formData.append('file' , this.resourceForm.image):'';
            id?this.formData.append('id' , this.$route.query.id):''
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>

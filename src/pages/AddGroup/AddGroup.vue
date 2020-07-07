<template>
    <div>
      <div class="loading" v-loading="loading" v-if="loading"></div>
      <div class="upload-box" >
        <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm" @submit.native.prevent>
          <el-form-item label="组别名称" prop="name">
            <el-input style="width: auto" v-model="ruleForm.name" placeholder="请输入组别名称" ></el-input>
          </el-form-item>
          <el-form-item label="是否立即显示" prop="radio">
            <el-radio v-model="ruleForm.radio" label="1">显示</el-radio>
            <el-radio v-model="ruleForm.radio" label="0">隐藏</el-radio>
          </el-form-item>
          <el-form-item label="组别方向" prop="" v-if="id">
            <el-tag
              :key="index"
              v-for="(tag,index) in allDirects"
              closable
              :disable-transitions="false"
              @click="updateDirect(tag)"
              @close="handleClose(tag)">
              {{tag.directName}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="directValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新方向</el-button>
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
          <el-form-item label="组别介绍" prop="content">
            <EditorTool  @editing="editing" :isClear="isClear" :isUpdate="isUpdate"/>
            <el-input type="textarea" v-model="ruleForm.content" v-if="false"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-show="!id" type="primary" @click="submitForm('ruleForm')">上传</el-button>
            <el-button v-show="id"  @click="resetForm('ruleForm')">重置</el-button>
            <el-button v-show="id"  @click="handleUpdate()" type="primary">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>


<script>
  import EditorTool from '../../components/EditorTool/EditorTool'
  import {uploadTeam,reqGroupAllno,reqUpdate,uploadGroupDirect,reqGroupDirect,deleteGroupDirect,updateDirectName} from "../../api";
  export default {
    components:{EditorTool},
    data() {
      return {
        formData:new FormData(),
        allDirects: ['标签一', '标签二', '标签三'],   //所有方向
        inputVisible: false,                          //是否显示方向输入框
        directValue: '',                             //添加的方向
        breadContent:'',      //导航内容
        id:this.$route.query.id*1,
        isClear:false,        //是否清空编辑器
        dialogVisible:false,   //是否上传对话框
        imageData:{},

        isUpdate:'',            //将修改信息粘贴在编辑器你
        loading:false,          //请求中

        ruleForm: {           //表单数据
          name: '',           //组别名称
          imageUrl:'',        //封面图片
          content:'',         //组别介绍
          radio:''         //组别状态
        },
        rules: {            //输入规则
          name: [
            { required: true, message: '请输入组别名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          imageUrl:[
            { required: true , message: '请上传图片', trigger: 'blur' }
          ],
          content:[
            {required:true, message:'请输入介绍内容',trigger:'blur'}
          ],
          radio:[
            {required:true, message:'请选择是否在网页中显示',trigger:'blur'}
          ]
        }
      };
    },
    mounted(){
      this.init()
    },
    methods: {
      //初始化
      async init(){
        if(this.id!==0)
          (async ()=>{
            this.rules = {};
            const _id = this.$route.query.id;
            const directResult = await reqGroupDirect(_id);     //获取所有方向
            if(directResult.status == 200 ) this.allDirects = directResult.obj

            const groupResult = await reqGroupAllno();      //获取所有组别
            const arr = groupResult.obj;
            arr.map((item,index)=>{             //获取对应id分组
              if(item.id === this.id*1){//将字符串类型转化为Number型
                this.ruleForm.content = this.isUpdate  = item.groupIntro;
                this.ruleForm.name = item.groupName;
                this.ruleForm.radio =  item.groupIsenabled;
                this.ruleForm.imageUrl = 'http://47.112.132.177:8084/group/showimg/{id}?id='+item.id;
                return
              }
            });
          })();
      },

      //确定是否上传
      submitForm(formName) {
        this.jointFormData('submit');       //拼接表单数据
        this.$refs[formName].validate((valid) => { //表单校验
          if (valid) {
            //是否上传
            this.$confirm('确定上传吗？','提示',{
              type:"warning",
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(()=>{
                this.upload(this.formData);
            }).catch(()=>{})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
            await this.jointFormData('update');
            const response = await reqUpdate(this.formData);
            if(response.status === 200){
              this.loading = false;
              this.formData = new FormData();
              this.$message({message: '修改成功！', type: 'success'});
            }else{
              this.$message({message: '修改失败！', type: 'error'});
              this.loading = false;
              this.formData = new FormData();
            }
          })()
        }).catch(()=>{

        })
      },

      //编辑器通信
      editing(html,empty){ // html为接收的内容 empty判断内容是否为空
        this.ruleForm.content = html;
        if(empty ===1){     // 如果编辑器内容为空
          this.ruleForm.content = ''  // 将发送内容置为空
        }
        this.isClear = false;
      },

      //上传表单
      async upload(formdata){
        this.loading = true;
        const response = await uploadTeam(formdata);
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
        this.formData.append('groupName',this.ruleForm.name);
        this.formData.append('groupIntro', this.ruleForm.content);
        this.formData.append('groupIsenabled', this.ruleForm.radio);
        this.formData.append('file' , this.imageData);
        this.formData.append('groupCt' , timerStr);
        type === 'update'?this.formData.append('id',this.id):0
      },

      //处理删除方向
      handleClose(tag) {
        this.$confirm('确定删除吗？','提示',{
          type:"warning",
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(()=>{
          (async ()=>{
            const result = await deleteGroupDirect(tag.id,0 )
            if(result.status == 200){
              this.$message({type:'success' , message:'删除成功！'})
              this.allDirects.splice(this.allDirects.indexOf(tag), 1);  //删除当前页面对应方向
            }else{
              this.$message({type:'error' , message:'删除失败！'})
            }
          })();
        }).catch()
      },

      //显示方向输入框
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      //方向上传
      async handleInputConfirm() {
        let directValue = this.directValue;
        if(directValue == '') {           //如果输入为空则返回
          this.inputVisible = false;
          this.directValue = '';
          console.log('你输入的为空');
          return
        }
        const _id = this.$route.query.id;
        const result = await uploadGroupDirect(_id , directValue);      //上传组别
        console.log(result);
        if (result.status == 200) {
          this.$message({type:'success', message:'添加成功！'})
          const directResult = await reqGroupDirect(_id);     //重新获取所有方向
          if(directResult.status == 200 ){
            this.allDirects = directResult.obj;
            this.$message({type:'error', message:'添加失败！'})
          }
        }

        this.inputVisible = false;
        this.directValue = '';
      },

      //更新团队方向名称
      updateDirect(tag){
        console.log(tag.id);
        this.$prompt('请输入修改内容' , '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          (async ()=>{
            const updateDirect = await updateDirectName(tag.id,value);
            console.log(updateDirect);
            if(updateDirect.status === 200){
              this.$message({type: 'success', message: '修改成功！'});
              this.init()
            }else{
              this.$message({type: 'error', message: '修改失败！'});
            }
          })();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    },
  }
</script>


<style scoped>

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .upload-box .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding: 0 16px;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

<style lang="stylus" rel="stylesheet/stylus">
  .upload-box
    margin-top 20px
    padding 20px
    background-color white
</style>

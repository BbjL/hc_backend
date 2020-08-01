<template>
    <div class="resource-page" >

      <el-button
        class="submit-team clearfix"
        type="primary" icon="el-icon-plus"
        @click="dialogFormVisible = true">添加</el-button>

      <div class="card-container" v-if="resource.length>0">
        <el-row>
          <el-col  :span="6" v-for="(item,index) in resource" :key="index" style="padding: 0 7px;margin-top: 20px">
            <el-card :body-style="{ padding:'0px'}" >
              <el-image
                :src="$store.state.BASE_URL + $store.state.resource.reso_imagesUrl +item.id"
                class="image">
              </el-image>
              <div style="padding: 14px;" class="card-content">
                <div class="more">
                  <el-button  type="primary" @click="updateSetView(item)" icon="el-icon-edit" circle></el-button>
                  <el-button  type="success" @click="look(item)" icon="el-icon-view" circle></el-button>
                  <el-button  type="danger"  @click="deleteItem(item)" icon="el-icon-delete" circle></el-button>
                </div>
                <span class="card-tit">{{item.resName}}</span>
                <div class="bottom">
                  <p :class="item.resDetail.length>50?'mutiline_ellipsis':''">{{item.resDetail}}</p>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div v-else class="req_error">暂无数据</div>

      <el-dialog title="资源信息" :visible.sync="dialogDetailVisible">
        <div class="dialog-content">
          <h5 >设备名称：</h5>
          <p>{{detail.name}}</p>
          <h5 style="margin-top: 20px">设备图片：</h5>
          <el-image
            :src="$store.state.BASE_URL + $store.state.resource.reso_imagesUrl +detail.imageUrl"
            class="image">
          </el-image>
          <h5 style="margin-top: 20px">设备描述：</h5>
          <p>{{detail.content}}</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDetailVisible = false" type="primary">取 消</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加设备" :visible.sync="dialogFormVisible">

        <el-form :model="form" ref="form" :rules="rules">

          <el-form-item required="required" label="设备名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="on"></el-input>
          </el-form-item>

          <el-form-item required="required" label="设备描述" :label-width="formLabelWidth" prop="desc">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>

          <el-form-item required="required" label="设备图片" :label-width="formLabelWidth" prop="previewUrl">
            <el-upload
              class="upload-demo"
              action=""
              :auto-upload="false"
              :on-change="file => changeImage('form' , file )"
              :multiple = 'false'
              :show-file-list = 'false'
              drag>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <!--preview-->
            <transition name="el-zoom-in-center">
              <div class="image-preview " v-show="form.previewUrl">
                <div  class="image-preview-wrapper">
                  <el-image
                    :src="form.previewUrl"
                    class="image">
                  </el-image>
                  <div class="image-preview-action">
                    <i class="el-icon-delete"  @click = "form.imageData = form.previewUrl = ''"></i>
                  </div>
                </div>
              </div>
            </transition>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>

      </el-dialog>

      <el-dialog title="修改设备" :visible.sync="dialogFormUpdateVisible">
        <el-form :model="updateForm" ref="updateForm" :rules="rules">

          <el-form-item required="required" label="设备名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="updateForm.name" autocomplete="on"></el-input>
          </el-form-item>

          <el-form-item required="required" label="设备描述" :label-width="formLabelWidth" prop="desc">
            <el-input type="textarea" v-model="updateForm.desc"></el-input>
          </el-form-item>

          <el-form-item required="required" label="设备图片" :label-width="formLabelWidth" prop="previewUrl">
            <el-upload
              class="upload-demo"
              action=""
              :auto-upload="false"
              :on-change="file => changeImage('updateForm' , file )"
              :multiple = 'false'
              :show-file-list = 'false'
              drag>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <!--preview-->
            <transition name="el-zoom-in-center">
              <div class="image-preview " v-show="updateForm.previewUrl">
                <div  class="image-preview-wrapper">
                  <el-image
                    :src="updateForm.previewUrl"
                    class="image">
                  </el-image>
                  <div class="image-preview-action">
                    <i class="el-icon-delete"  @click = "updateForm.previewUrl = ''"/>
                  </div>
                </div>
              </div>
            </transition>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormUpdateVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('updateForm')">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>



<script>
import { mapActions } from 'vuex'

export default {
    name: "Resource",
    data() {
      return {
        resource:[],
        // 对话框内容
        dialogDetailVisible: false,
        dialogFormVisible:false,
        dialogFormUpdateVisible:false,
        formLabelWidth: '120px',
        form: {
          name: '',
          desc: '',
          previewUrl:'',
          imageData:'',
        },
        updateForm: {
          id:'',
          name: '',
          desc: '',
          previewUrl:'',
          imageData:'',
        },
        //校验规则
        rules:{
          name: { required: true, message: '请输入设备名称' },
          desc: { required: true, message: '请输入设备描述' },
          previewUrl: { required: true, message: '请上传图片' },
        },
        // 浏览
        detail:{
          name:'',
          imageUrl:'',
          content:''
        }
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      ...mapActions([
        'addResource',
        'removeResource',
        'updateResource',
        'getResource'
      ]),

      /**
       * 初始化显示 （获取资源）
       * */
      init() {
        this.getResource()
          .then(res => {
            this.resource = res;
          })
          .catch(err => {
            console.log(err)
          })
      },

      /**
       * 查看具体信息
       * */
      look(item){
        this.dialogDetailVisible = true;
        this.detail.name = item['resName'];
        this.detail.content = item['resDetail'];
        this.detail.imageUrl = item.id;
      },

      /**
       * 删除实验室资源
       * @item   选中项所有参数
       * */
      deleteItem(item){
        this.$confirm('确定删除此资源？', '提示' , {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type:'warning'
        }).then(()=>{
          this.removeResource({id : item.id})
            .then( res => {
              if(res.status === 200){
                this.$notify({type: 'success', message: '删除成功!'});
                this.init()       //初始化
              }else{
                this.$notify({type: 'error', message: '服务器出错!'});
              }
            })
            .catch( err => {
              console.log(err)
              this.$message({type: 'error', message: '系统出错!'});
            })

        }).catch(()=>{
          this.$message({ message: '取消操作!'});
        })
      },

      /**
       * 上传图片状态改变
       * */
      changeImage(formName,file){
        this[formName].previewUrl = URL.createObjectURL(file.raw);
        this[formName].imageData = file.raw;
      },

      /**
       * 上传设备
       * */
      uploadReso(){
        this.dialogFormVisible = false
        const resource =  this.jointFormData('form')

        this.addResource(resource)
          .then( res => {
            console.log(res)
            if(res.status&&res.status === 200){
              this.$notify.success({title:'成功', message:'设备上传成功'})
            }
          })
          .catch( err => {
            console.log(err)
            this.$notify.error({title:'出错', message:'服务器错误'})
          })
      },

      /**+
       *构造表单对象
       * */
      jointFormData(formName){
        const formData = new FormData();

        formData.append('file' , this[formName].imageData);
        formData.append('resName' , this[formName].name);
        formData.append('resDetail' , this[formName].desc);
        formData.append('resCt' , this.$getFormatTime() );

        if(formName.trim() === 'updateForm'){
          formData.append('id' , this[formName].id);
        }

        return formData
      },


      /**
       * 表单校验
       * */
      submitForm(formName) {
        console.log(formName)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            formName === 'form' ? this.uploadReso():this.updateReso()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      /**
       * 修改模块 dialog
       * */
      updateSetView(item){
        this.dialogFormUpdateVisible = true

        const _resource =  this.resource;

        let target = _resource.find( current => {
          return current.id === item.id
        })

        this.updateForm.id = target['id']
        this.updateForm.name = target['resName']
        this.updateForm.desc = target['resDetail']
        this.updateForm.previewUrl = this.$store.state.BASE_URL + this.$store.state.reso_imagesUrl +target.id

      },

      /**
       * 提交更新
       * */
      updateReso(){
        this.dialogFormUpdateVisible = false;
        const resource =  this.jointFormData('updateForm')

        this.updateResource(resource)
          .then( res => {
            if(res.status&&res.status === 200){
              this.$notify.success({title:'成功', message:'设备更新成功'})
            }
          })
          .catch( err => {
            console.log(err)
            this.$notify.error({title:'出错', message:'服务器错误'})
          })
      }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .card-container
    margin-top 10px
    font-size 15px
    .card-content
      position relative
      .more
        position absolute
        top -19px
        right 10px
      .card-tit
        font-size 14px
        font-weight 600
        color #303133
      .bottom
        height 60px
        overflow hidden
        color: #606266
        >p
          letter-spacing  1px
  .dialog-content
    max-height 400px
    overflow-y auto
    >img
      width 250px
    >p
      margin 10px 0

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
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete
        font-size: 36px;
    &:hover
      .image-preview-action
        opacity: 1;



</style>


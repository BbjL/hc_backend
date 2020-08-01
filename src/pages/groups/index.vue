<template>
  <div class="teams-info">
    <div class="filter-container">
      <el-input clearable v-model="listQuery.title" placeholder="组名" style="width: 200px;" class="filter-item"  @keyup.enter.native="handleFilter" />
      <el-button  class="filter-item" type="primary" icon="el-icon-search"  @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="dialogFormVisible=true">
        添加
      </el-button>
    </div>

    <el-row class="edit-table" v-loading="loading">
      <el-table
        :data="tableData"
        stripe
        fit
        border
        highlight-current-row
        style="width: 100%">
        <el-table-column
          type="index"
          align="center"
          width="80"
          label="序号">
        </el-table-column>

        <el-table-column
          prop="id"
          align="center"
          width="80"
          sortable
          label="ID">
        </el-table-column>

        <el-table-column width="250" label="组别名称">
          <template slot-scope="{row, $index}">
            <template v-if="row.edit">
              <el-input v-model="tableData[$index].groupName"  class="edit-input" size="small" />
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row)"
              >
                cancel
              </el-button>
            </template>
            <span v-else>{{ row.groupName }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="200" show-overflow-tooltip  label="简介">
          <template slot-scope="{row, $index}">
            <template v-if="row.edit">
              <el-input v-model="tableData[$index].groupIntro" type="textarea" autosize class="edit-input"   />
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row)"
              >
                cancel
              </el-button>
            </template>
            <span v-else>{{ row.groupIntro }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="groupIsenabled"
          align="center"
          label="是否显示"
          width="150">
          <template slot-scope="scope">
            <el-switch v-model="tableData[scope.$index].groupIsenabled" @change="newV => changeStatus(newV, scope.row, scope.$index)"></el-switch>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Actions" width="250">
          <template slot-scope="{row}">
            <el-button
              v-if="row.edit"
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="confirmEdit(row)"
            >
              Ok
            </el-button>
            <el-button
              v-else
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="row.edit=!row.edit"
            >
              Edit
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-row>

    <el-dialog title="添加组名" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item required="required" label="组名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item required="required" label="组别介绍" :label-width="formLabelWidth" prop="intro">
          <el-input type="textarea" v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item required="required" label="组别图片" :label-width="formLabelWidth" prop="pre_img">
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
            <div class="image-preview " v-show="form.pre_img">
              <div  class="image-preview-wrapper">
                <el-image
                  :src="form.pre_img"
                  class="image">
                </el-image>
                <div class="image-preview-action">
                  <i class="el-icon-delete"  @click = "form.image = form.pre_img = ''"></i>
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "TeamProjects",
  data() {
    return {
      listQuery: {
        title:'',
        time:''
      },
      tableData: [],
      initData:[],
      loading:false,
      dialogFormVisible:false,
      formLabelWidth:'120px',
      form:{
        name:'',
        intro:'',
        pre_img:'',
        image:''
      },
      rules:{
        name: { required: true, message: '请输入组名' },
        intro: { required: true, message: '请输入简介' },
        pre_img: { required: true, message: '请上传图片' },
      },
    }
  },
  mounted(){
    this.getTable()
  },
  methods: {
    ...mapActions([
      'reqAllGroups',
      'changeGroupState',
      'uploadGroup',
      'updateGroup'
    ]),

    //请求表格数据
    async getTable(){
      this.loading = true

      const res =await this.reqAllGroups({});
      if(res.status === 200) {
        this.loading = false

        this.initData = this.tableData =  res.obj.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.originalName = v.groupName
          v.originalIntro = v.groupIntro //  will be used when user click the cancel botton

          v.groupIsenabled == '1' ? v.groupIsenabled = true : v.groupIsenabled = false  // 解决服务器标识符为数字 switch要求为布尔问题

          return v
        })
      }
    },

    //搜索
    handleFilter(){
      const _title = this.listQuery.title === ''? '':this.listQuery.title.toLowerCase();

      const filterResult = this.initData.filter(item => {
        return   !_title||(_title && item.groupName.toLowerCase().includes(_title))
      })

      console.log(filterResult)
      this.tableData = filterResult
    },

    //取消编辑
    cancelEdit(row) {
      row.edit = false
      row.groupName = row.originalName
      row.groupIntro = row.originalIntro
    },

    //确认修改简介 组名
    confirmEdit(row) {
      row.edit = false
      const formData = new FormData()

      formData.append('id', row.id)
      formData.append('groupName', row.groupName)
      formData.append('groupIntro', row.groupIntro)

      this.updateGroup(formData)
        .then(res => {
          if(res.status === 200){
            row.originalName = row.groupName
            row.originalIntro = row.groupIntro
            this.$notify({type:'success', message:'修改成功'})
          }
        })
        .catch(err => {
          console.log(err)
          row.groupName = row.originalName
          row.groupIntro = row.originalIntro

          this.$notify({type:'error', message:'服务器错误'})
        })
    },

    //修改显示状态
    changeStatus(newV, row, index){
      let status = ''
      newV === true ? status = '1' : status = '0';   // 解决服务器标识符为数字问题

      this.changeGroupState({id:row.id, groupIsenabled:status})
        .then(res => {
          console.log(res)
          if(res.status === 200){
            this.$notify({type:'success', message:'修改成功'})
          }
        })
        .catch(err => {
          console.log(err)
          this.tableData[index].groupIsenabled = !newV
          this.$notify({type:'error', message:'服务器错误'})
        })
    },

    //上传图片
    changeImage(formName,file){
      this[formName].pre_img = URL.createObjectURL(file.raw);
      this[formName].image = file.raw;
    },

    //上传图片
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          formData.append('groupName', this[formName].name)
          formData.append('groupIntro ', this[formName].intro )
          formData.append('groupCt', this.$getFormatTime())
          formData.append('file ', this[formName].name)
          formData.append('groupIsenabled', '1')

          this.uploadGroup(formData)
            .then(res => {
              this.dialogFormVisible = false
              if(res.status === 200){
                this.$notify({type:'success', message:'上传成功'})
              }
            })
            .then(err => {
              console.log(err)
              this.$notify({type:'error', message:'服务器错误'})
            })
        } else {
          console.log('error submit!!');
          this.dialogFormVisible = false
          return false;
        }
      });
    }
  }
}
</script>

<style >
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /*上传图片*/
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

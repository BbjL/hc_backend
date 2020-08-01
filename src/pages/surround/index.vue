<template>
  <div>
    <div class="filter-container">
      <el-input clearable v-model="listQuery.title" placeholder="标题" style="width: 200px;" class="filter-item"  @keyup.enter.native="handleFilter" />
      <el-button  class="filter-item" type="primary" icon="el-icon-search"  @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="$router.push({path:'/surround/edit'})">
        添加
      </el-button>
    </div>

    <el-table
      ref="singleTable"
      :data="tableData"
      v-loading="loading"
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
        property="id"
        align="center"
        width="80"
        sortable
        label="ID">
      </el-table-column>
      <el-table-column
        property="atmName"
        align="center"
        width="200"
        label="标题">
      </el-table-column>
      <el-table-column
        property="atmDetail"
        align="left"
        show-overflow-tooltip
        label="简介">
      </el-table-column>
      <el-table-column
        property="createBy"
        align="center"
        width="200"
        label="By">
      </el-table-column>
      <el-table-column
        property="createTime"
        align="center"
        width="150"
        sortable
        label="上传时间">
      </el-table-column>
      <el-table-column
        align="center"
        width="250"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
            修改
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "videos",
  data() {
    return {
      listQuery: {
        title:'',
        time:''
      },
      groups:'',          //获取所有分组
      sortYear:'',        //获取所有年份
      initData:[],        //初始数据
      tableData: [],          //表格显示的数据
      rules:{
        subContent:{ required: true, message: '请输入内容' },
        subBy:{ required: true, message: '请输入上传者姓名' },
      },

      loading: false
    };
  },
  mounted(){
    this.getTableData()
  },
  methods:{

    ...mapActions([
      'reqAllSurround',
      'reqSurroundByID',
      'updateSurround',
      'uploadSurround',
      'changeSurroundStatus'
    ]),

    getTableData(){
      this.reqAllSurround({})
        .then(res => {
          console.log(res)
          if(res.status === 200 ){
            this.initData = this.tableData= res.obj.content
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    handleFilter(){
      const _title = this.listQuery.title === ''? '':this.listQuery.title.toLowerCase();

      const filterResult = this.initData.filter(item => {
        return  !_title||_title && item['atmName'].toLowerCase().includes(_title)
      })

      console.log(filterResult)
      this.tableData = filterResult
    },

    handleEdit(item){
      this.$router.push({path:'/surround/edit' ,query:{id:item.id}})
    },

    handleDelete(item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.changeSurroundStatus({id:item.id}).then(res => {
          if(res.status === 200){
            this.$notify({type:'success' , message:'删除成功'})
            this.getTableData()
          }
        }).catch(err => {
          console.log(err)
          this.$notify({type:'error' , message:'服务器错误'})
        })
      })
    }

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

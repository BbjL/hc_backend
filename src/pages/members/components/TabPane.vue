<template>
  <div>
    <div class="filter-container">
      <el-input
        style="width: 200px;"
        class="filter-item"
        clearable
        v-model="search.name"
        placeholder="姓名"
        @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search"  @click="handleFilter()">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="$router.push({path:'/members/edit'})">
        添加
      </el-button>
    </div>

    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column
        v-loading="loading"
        align="center"
        type="index"
        label="序号"
        width="65"
        element-loading-text="请给我点时间！">
      </el-table-column>

      <el-table-column
        property="id"
        width="70"
        align="center"
        label="ID">
      </el-table-column>

      <el-table-column
        property="memName"
        align="center"
        label="姓名">
      </el-table-column>

      <el-table-column
        property="memMajorZh"
        align="center"
        label="专业">
      </el-table-column>

      <el-table-column
        property="memGroupZh"
        align="center"
        label="组别">
      </el-table-column>

      <el-table-column
        property="memDirectZh"
        align="center"
        label="方向">
      </el-table-column>

      <el-table-column
        property="memBegin"
        align="center"
        label="加入时间" >
      </el-table-column>

      <el-table-column
        property="memEnd"
        align="center"
        label="退出时间" >
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  props: {
    type: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      search:{
        name:''
      },
      list: null,
      tableData:null,
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
      },
      loading: false,
      total:0,
      image:''
    }
  },
  created() {
    this.getTableData(1, 5)
  },
  methods: {

    ...mapActions([
      'reqWorkMemsByGroup',
      'updateMems',
      'changeMemStatus'
    ]),

    //发出请求
    getTableData(page, limit){
      this.reqWorkMemsByGroup({group:this.type, pageNum:page, pageSize:limit})
        .then(res => {
          console.log(res)
          if(res.status === 200){
            this.list = this.tableData = res.obj.content
            this.total = res.obj.totalSize
          }
        })
    },

    //获取分页查询条件
    getList(queryList){
      this.getTableData(queryList.page, queryList.limit)
    },

    //编辑
    handleEdit(item){
      this.$router.push({path:'/members/edit' , query:{id:item.id}})
    },

    //删除
    handleDelete(item){
      const _id = item.id

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.changeMemStatus({id:_id})
            .then(res => {
              this.getTableData(this.listQuery.page, this.listQuery.limit)
              this.$notify({type:'success', message:'成功删除'})
            })
            .catch(err => {
              console.log(err)
              this.$notify({type:'error', message:'服务器错误'})
            })
      })
    },

    //搜索
    handleFilter(){
      const _name = this.search.name === ''? '':this.search.name.toLowerCase();

      const filterResult = this.list.filter(item => {
        return !_name||(_name && item.memName.toLowerCase().includes(_name))
      })

      console.log(filterResult)
      this.tableData = filterResult
    },

  }
}
</script>


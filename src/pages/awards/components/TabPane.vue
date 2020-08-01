<template>
  <div>
    <div class="filter-container">
      <el-input
        style="width: 200px;"
        class="filter-item"
        clearable
        v-model="search.name"
        placeholder="奖项名"
        @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search"  @click="handleFilter()">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="$router.push({path:'/awards/edit'})">
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
        property="awardName"
        align="center"
        label="奖项名">
      </el-table-column>

      <el-table-column
        property="group"
        align="center"
        label="所属组别">
      </el-table-column>

      <el-table-column
        label="证书图片"
        prop="awardImg">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="BASE_URL+ awards.awd_url +scope.row.id"
            :preview-src-list="[BASE_URL+ awards.awd_url +scope.row.id]">
          </el-image>
        </template>
      </el-table-column>

      <el-table-column
        property="awardDetail"
        align="center"
        label="简介">
      </el-table-column>

      <el-table-column
        property="awardDate"
        align="center"
        label="获取时间" >
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
import { mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  props: {
    type: {
      type: String,
      default: '1'
    },
    allGroups: {
      type: Array
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
  computed:{
    ...mapState(['BASE_URL', 'awards'])
  },
  methods: {

    ...mapActions([
      'reqAwardsByGro',
      'changeAwardStatus'
    ]),

    //发出请求
    getTableData(page, limit){
      this.reqAwardsByGro({awardGroup:this.type, delFlag:0, pageNum:page, pageSize:limit})
        .then(res => {
          console.log(res)
          if(res.status === 200){
            this.total = res.obj.totalSize

            this.list = this.tableData =  res.obj.content.map(item => {  // 解决服务端传回数字代替组名问题
              const groupName = this.allGroups.find(v => {
                return v.id == item.awardGroup
              });
              this.$set(item, 'group', groupName.name);

              return item
            })
          }
        })
    },

    //获取分页查询条件
    getList(queryList){
      this.getTableData(queryList.page, queryList.limit)
    },

    //编辑
    handleEdit(item){
      this.$router.push({path:'/awards/edit' , query:{id:item.id}})
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
        return !_name||(_name && item.awardName.toLowerCase().includes(_name))
      })

      console.log(filterResult)
      this.tableData = filterResult
    },

  }
}
</script>


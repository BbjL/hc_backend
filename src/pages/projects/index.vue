<template>
  <div class="teams-info">
    <div class="filter-container">
      <el-input clearable v-model="listQuery.title" placeholder="标题或组别" style="width: 200px;" class="filter-item"  @keyup.enter.native="handleFilter" />
      <el-button  class="filter-item" type="primary" icon="el-icon-search"  @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="$router.push({path:'/projects/edit'})">
        添加
      </el-button>
    </div>

    <el-row class="edit-table">
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
        <el-table-column
          prop="proName"
          align="center"
          label="项目标题"
          width="150">
        </el-table-column>
        <el-table-column
          property="proIntro"
          align="left"
          show-overflow-tooltip
          label="简介">
        </el-table-column>
        <el-table-column
          align="center"
          prop="proGrgoupZh"
          label="所属组别"
          width="150">
        </el-table-column>
        <el-table-column
          property="createBy"
          align="center"
          width="100"
          label="By">
        </el-table-column>
        <el-table-column
          prop="proDate"
          align="center"
          label="开始时间"
          sortable=""
          width="150">
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
    </el-row>
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
    }
  },
  mounted(){
    this.getTable()
  },
  methods: {
    ...mapActions([
      'reqAllPros',
      'updatePros'
    ]),

    //请求表格数据
    async getTable(){
      const res =await this.reqAllPros();
      if(res.status == 200) {
        this.initData = this.tableData = res.obj;
      }
    },

    //搜索
    handleFilter(){
      const _title = this.listQuery.title === ''? '':this.listQuery.title.toLowerCase();

      const filterResult = this.initData.filter(item => {
        return   !_title||(_title && item.proName.toLowerCase().includes(_title)) ||
          (_title && item.proGrgoupZh && item.proGrgoupZh.includes(_title))
      })

      console.log(filterResult)
      this.tableData = filterResult
    },

    handleEdit(item){
      this.$router.push({path:'/projects/edit' ,query:{id:item.id}})
    },

    //删除
    handleDelete(item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const formData = new FormData();
        const _id = item.id

        formData.append('id' , _id);
        formData.append('delFlag' , 0);

        this.updatePros(formData)
          .then(res => {
            console.log(res)
            this.$notify({type:'success', message:'成功删除'})
          })
          .catch(err => {
            console.log(err)
            this.$notify({type:'error', message:'服务器错误'})
          })
      })
    }
  }
}
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

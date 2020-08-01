<template>
  <div>
    <div class="filter-container">
      <el-select v-model="listQuery.group" :loading="!groups" placeholder="选择分组" clearable class="filter-item" >
        <el-option   v-for="item in groups" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.year"  placeholder="选择年份" clearable class="filter-item"  >
        <el-option  v-for="item in sortYear" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search"  @click="handleFilter()">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="$router.push({path:'/teamele/edit'})">
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
        property="year"
        align="center"
        width="150"
        sortable
        label="日期">
      </el-table-column>
      <el-table-column
        property="articleName"
        align="center"
        width="200"
        label="标题">
      </el-table-column>
      <el-table-column
        property="article_intro"
        align="left"
        show-overflow-tooltip
        label="简介">
      </el-table-column>
      <el-table-column
        property="articleGroup"
        align="center"
        width="200"
        label="所属组别">
      </el-table-column>
      <el-table-column
        property="articleAward"
        align="center"
        width="200"
        label="奖项">
      </el-table-column>
      <el-table-column
        property="createBy"
        align="center"
        width="200"
        label="By">
      </el-table-column>
      <el-table-column
        property="year"
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
import { VueDebounce } from '@/utils/globalMethods'
export default {
  name: "videos",
  data() {
    return {
      listQuery: {
        group:'',
        year:''
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
    this.getEleSortedYears()
    this.getEleSortedGroups()
  },
  methods:{

    ...mapActions([
      'reqAllYears',
      'reqAllGroups',
      'reqEleByYear',
      'reqEleByGroup',
      'changeEleStatus'
    ]),

    //获取存在的年份
    async getEleSortedYears(){
      const res = await this.reqAllYears()
      if(res.status === 200){
        this.sortYear = res.obj
      }
    },

    //获取存在的分组
    async getEleSortedGroups(){
      let groupsArr = [];

      const res = await this.reqAllGroups({})
      if(res.status === 200) {
        res.obj.forEach(item => {
          groupsArr.push({id:item.id , name:item.groupName})
        })
        this.groups = groupsArr
      }
    },

    //节流  但是这里没有用到  这里利用了axios的防止重复请求
    searchDebounce: VueDebounce("handleFilter", 3000),

    handleFilter(){
      this.loading = true
      const _group = this.listQuery.group
      const _year = this.listQuery.year


      if( _group ){
        this.reqEleByGroup({articleGroup:_group})
          .then(res => {
            this.loading = false
            console.log(res)
            if(res.status === 200){
              this.listQuery.year = ''
              this.tableData = res.obj.content
            }
          })
          .catch(err => {
            this.loading = false
            console.log(err)
          })
      }else {
        this.reqEleByYear({year:_year})
          .then(res => {
            this.loading = false
            if(res.status === 200){
              console.log(res)
              this.tableData = res.obj.content
            }
          })
          .catch(err => {
            this.loading = false
            console.log(err)
          })
      }
    },

    handleDetail(item){
      this.$router.push({path:'/video/detail' ,query:{id:item.id}})
    },

    handleEdit(item){
      this.$router.push({path:'/teamele/edit' ,query:{id:item.id}})
    },

    handleDelete(item) {
      console.log(item)

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.changeEleStatus({id:item.id}).then(res => {
          if(res.status === 200){
            this.$notify({type:'success' , message:'删除成功'})
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

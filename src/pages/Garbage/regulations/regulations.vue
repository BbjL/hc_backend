<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="内容"
        prop="insituContent">
      </el-table-column>
      <el-table-column
        width="100"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="restore(scope.row.id)" round  size="mini">还原</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {reqRegu,deleteRegu} from "../../../api";
  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      /**
       * 初始化
       * */
      async init(){
        const tableData = await reqRegu(1);
        console.log(tableData.obj);
        if(tableData.status == 200){
          this.tableData = tableData.obj;
        }
      },
      /**
       * 页面改变
       * @currentPage
       * */
      pageChange(currentPage){
        console.log(currentPage);
      },
      /**
       * 还原
       * @id   操作元素id
       * */
      async restore(id){
        this.$confirm('确定还原？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          (async ()=>{
            const result = await deleteRegu(id, 0);
            result.status == 200 ? this.$message({type: 'success', message: '还原成功!'}):this.$message({type: 'info', message: '系统出错！'});
            this.init();
          })()
        }).catch(() => {
          this.$message({type: 'info', message: '取消操作！'});
        });

      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>


<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

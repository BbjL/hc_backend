<template>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="名称">
                <span>{{ props.row.resName }}</span>
              </el-form-item>
              <el-form-item label="图片">
                <span>{{ props.row.shop }}</span>
                <el-image
                  style="width: 50px; height: 50px"
                  :src="'http://47.112.132.177:8084/res/showimg/{id}?id='+props.row.id">
                </el-image>
              </el-form-item>
              <el-form-item label="描述">
                <span>{{ props.row.resDetail }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          label="名称"
          prop="resName">
        </el-table-column>
        <el-table-column
          label="图片">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="'http://47.112.132.177:8084/res/showimg/{id}?id='+scope.row.id"
              :preview-src-list="['http://47.112.132.177:8084/res/showimg/{id}?id='+scope.row.id]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          prop="resDetail">
          <template slot-scope="scope">
            <p>{{scope.row.resDetail.slice(0,25)}}
              <span v-if="scope.row.resDetail.slice(0,25).length>=25">...</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="操作">
          <template slot-scope="scope">
              <el-button @click="restore(scope.row.id)" round  size="mini">还原</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<el-pagination-->
        <!--background-->
        <!--layout="prev, pager, next"-->
        <!--hide-on-single-page-->
        <!--@current-change="pageChange"-->
        <!--:total="tableData.length">-->
      <!--</el-pagination>-->
    </div>
</template>

<script>
  import {reqAllReso,deleteReso} from "../../../api";
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
        const tableData = await reqAllReso(1);
        this.tableData = tableData;
        console.log(tableData);
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
            const result = await deleteReso(id, 0);
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

<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="赛事名称">
              <span>{{ props.row.articleName  }}</span>
            </el-form-item>
            <el-form-item label="参赛成员">
              <span>{{ props.row.articleAuthor  }}</span>
            </el-form-item>
            <el-form-item label="参赛时间">
              <span>{{ props.row.articleCt  }}</span>
            </el-form-item>
            <el-form-item label="获取奖项">
              <span>{{ props.row.articleAward  }}</span>
            </el-form-item>
            <el-form-item label="参赛图片">
              <el-image
                style="width: 50px; height: 50px"
                :src="'http://47.112.132.177:8084/elegant/showimg/{id}?id='+props.row.id">
              </el-image>
            </el-form-item>
            <el-form-item label="描述">
              <span>{{ props.row.articleContent.replace(/\<[\s\S]*?\>/gm, '') }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="赛事名称"
        prop="articleName">
      </el-table-column>
      <el-table-column
        label="参赛成员"
        prop="articleAuthor">
      </el-table-column>
      <el-table-column
        label="参赛时间"
        prop="articleCt">
      </el-table-column>
      <el-table-column
        label="获取奖项"
        prop="articleAward">
      </el-table-column>
      <el-table-column
        label="参赛图片">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="'http://47.112.132.177:8084/elegant/showimg/{id}?id='+scope.row.id"
            :preview-src-list="['http://47.112.132.177:8084/elegant/showimg/{id}?id='+scope.row.id]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="描述"
        prop="articleContent">
        <template slot-scope="scope">
          <p>{{scope.row.articleContent.replace(/\<[\s\S]*?\>/gm, '').slice(0,25)}}
            <span v-if="scope.row.articleContent.replace(/\<[\s\S]*?\>/gm, '').slice(0,25).length>=25">...</span>
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
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-select v-model="search" placeholder="选择年份搜索" @change="getDataByYear(search)">
            <el-option
              v-for="year in years"
              :key="year"
              :label="year"
              :value="year">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {reqElegants , deleteElegant,reqElegantYears,reqAllReso,deleteReso} from "../../../api";
  export default {
    data() {
      return {
        tableData: [],
        search:'',
        years:[],
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
        try {
          const getAllYears = await reqElegantYears();
          console.log(getAllYears);
         getAllYears.status == 200 ?this.years = getAllYears.obj:'';

          const tableData = await reqElegants(1,1000,this.years[0],1);
          console.log(tableData);
          this.tableData = tableData.obj.content;

        }catch(e){
          this.$message('获取数据失败！')
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
            const result = await deleteReso(id, 0);
            result.status == 200 ? this.$message({type: 'success', message: '还原成功!'}):this.$message({type: 'info', message: '系统出错！'});
            this.init();
          })()
        }).catch(() => {
          this.$message({type: 'info', message: '取消操作！'});
        });

      },
      /**
       * 根据年份获取数据
       * @year
       * */
      async getDataByYear(year){
        console.log(year);
        const result = await reqElegants(1,1000,year,1);
        console.log(result);
        if(result.status ==  200){
          this.tableData = result.obj.content
          console.log(this.tableData);
        }

      }
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

<template>
    <div class="team-honor">
      <div class="honor-message">
        <el-radio  v-model="radio" @change="findAward()" label="全部" >全部</el-radio>
        <el-radio v-model="radio" @change="findAward(group.id)" :label="group.id" v-for="(group,index) in groups" :key="index">
          {{group.groupName}}
        </el-radio>
        <el-table
          v-loading="loading"
          :data="tableData.filter(data => !search || data.awardName.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            label="奖项名称"
            prop="awardName">
          </el-table-column>
          <el-table-column
            label="获奖小组"
            prop="awardGroupZh">
          </el-table-column>
          <el-table-column
            label="获奖时间"
            prop="awardDate">
          </el-table-column>
          <el-table-column
            label="证书图片"
            prop="awardImg">
            <template slot-scope="scope">
              <el-image
                style="width: 50px; height: 50px"
                :src="'http://47.112.132.177:8084/award/showimg/{id}?id='+scope.row.id"
                :preview-src-list="['http://47.112.132.177:8084/award/showimg/{id}?id='+ scope.row.id]">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="奖项描述"
            prop="awardDetail">
          </el-table-column>
          <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini"  placeholder="输入奖项名称"/>
            </template>
            <template slot-scope="scope">
              <router-link :to="{path:'uploadhonor' , query:{id:scope.row.id}} " >
                <el-button
                  size="mini"
                  round
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              </router-link>
              <el-button
              size="mini"
              round
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          background
          hide-on-single-page
          layout="prev, pager, next"
          @current-change="pageChange"
          :page-count	="totalSize">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import {reqTeams,reqAllAward,reqGroupAward,deleteAward} from "../../api";
  import Bread from '../../components/Bread/Bread'
  export default {
        name: "TeamHonor",
        components:{Bread},
        data() {
          return {
            loading:false,
            radio: '全部',        //选择分组
            groups:[],        //获取分组
            tableData: [],     //表格数据
            totalSize:0,      //页数
            search: '',        //搜索
            whichGroup:0,       //选择获取的组别
            isCateGroup:false
          };
        },
        created(){
          this.init()
        },
        methods: {
          handleEdit(index, row) {  // index 表格索引  row 对应行的信息
            console.log(row.id);
            // this.$router.push('/uploadmems/'+row.id)
          },

          async handleDelete(index, row) {
            console.log(index, row.id);
            this.$confirm('确定删除？', '操作' ,{
              confirmButtonClass:'确定',
              cancelButtonClass:'删除',
              type:'warning'
            }).then(()=>{
              (async ()=>{
                const _id = row.id ;
                const formData = new FormData();
                formData.append('id', _id);
                formData.append('delFlag', 1); //         1为删除
                const result = await deleteAward(formData)
                console.log(result);
                if(result.status == 200){
                  this.$message({message:'删除成功!' , type:'success'})
                  this.findAward('all')
                }else{
                  this.$message({message:'系统出错',type:'danger'});
                }
              })();
            }).catch(()=>{
              this.$message('系统出错！');
            })
          },

          //分组获取奖项
          async findAward(group='all'){
            console.log('组别id='+group);
            this.loading = true
            if(group == 'all'){
              this.whichGroup = group                //更改选择组别
              this.init()
            }else{
              const getTableData = await reqGroupAward(0,group);  //获取当前组别的所有获奖信息
              console.log(getTableData);
              this.totalSize = getTableData.obj.totalPages;        //改变页数
              this.tableData = getTableData.obj.content;         //更改表格内容
              this.whichGroup = group;                          //更改选择组别
              this.isCateGroup = true
              this.loading = false
            }

          },

          //初始化显示
          async init(){
            this.isCateGroup = false
            this.loading = true
            let allAward = '';
            const getAllAward = await reqAllAward(0,1,10);    //获取全部奖项信息  @状态  @页码  @页数
            allAward = getAllAward.obj.content;

            const allGroup = await reqTeams();    //获取全部组别
            this.groups = allGroup.obj;

            this.totalSize = getAllAward.obj.totalPages;      //总页数
            this.tableData = allAward;
            this.loading = false
          },

          // 选择页数
          async pageChange(currentPage = 1 ){   //修改页数
            if(this.isCateGroup){
              const _group = this.whichGroup;
              const getTableData = await reqGroupAward(0,_group,currentPage);
              this.tableData = getTableData.obj.content
            }else{
              const getAllAward = await reqAllAward(0,currentPage,10);    //获取全部奖项信息
              this.totalSize = getAllAward.obj.totalPages;      //总页数
              this.tableData = getAllAward.obj.content
            }
          },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .honor-message
    background-color white
    padding 15px
</style>

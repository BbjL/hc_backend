<template>
  <div>
    <div class="elegantlists">
      <div class="title">
        <span style="width: 15%"><span style="padding-left: 10px">时间</span></span>
        <span style="width: 20%"><span style="padding-left: 10px">参与赛事</span></span>
        <span style="width: 25%"><span style="padding-left: 10px">简介</span></span>
        <span style="width: 15%"><span style="padding-left: 10px">图片</span></span>
        <span style="width: 10%"><span style="padding-left: 10px">操作</span></span>
        <span style="width: 15%"><span style="padding-left: 10px">年份:</span>
          <span style="width: 60%;margin-left: 20px">
            <el-select v-model="year" placeholder="请选择年份">
            <el-option
              v-for="(item,index) in years"
              :key="index"
              :label="item"
              :value="item"
              v-if="years"
            >
            </el-option>
            </el-select>
          </span>
        </span>
      </div>
      <div class="body" style="font-size: 16px">
        <div v-if="lists.length==0" style="height: 58px;line-height: 58px;border-top: 1px solid rgb(244,247,249);" class="list"><span style="margin-left: 47%;font-size: 16px">暂无数据</span></div>
        <div v-else style="height: 500px;">
          <div class="list" v-for="(list,index) in lists" :key="index">
            <li style="width: 15%"><span style="padding-left: 10px">{{list.articleCt.slice(0,10)}}</span></li>
            <li style="width: 20%" v-if="list.articleName.length>12"><span style="padding-left: 10px">{{list.articleName.slice(0,12)}}..</span></li>
            <li style="width: 20%" v-else><span style="padding-left: 10px">{{list.articleName}}</span></li>
            <li style="width: 25%"><span style="padding-left: 10px;color: blue;width: 85%;overflow: hidden">{{getContent(list.article_intro).slice(0,22)}}...</span></li>
            <li style="width: 15%">
            <span style="padding-left: 10px">
              <div style="max-height: 50px;width: 50px;display: inline-block;line-height: 59px;margin-top: 5px;overflow: hidden">
                  <el-image
                    class="img"
                    :preview-src-list="['http://47.112.132.177:8084/elegant/showimg/{id}?id=' + list.id]"
                    :src="'http://47.112.132.177:8084/elegant/showimg/{id}?id=' + list.id"
                  >
                    <div slot="placeholder" class="image-slot"/>
                  </el-image>
                </div>
            </span>
            </li>
            <li style="width: 20%">
              <el-button round size="mini" icon="el-icon-edit"   @click="()=>updata(list.id)">修改</el-button>
              <el-button round size="mini" icon="el-icon-delete"   @click="()=>deleteEle(list.id)">删除</el-button>
            </li>
          </div  >
        </div>
      </div>
      <div class="page">
        <el-pagination
          background
          :current-page="all.pageNum"
          layout="prev, pager, next"
          :page-size="1"
          @current-change="(currentPage)=>getPages(currentPage)"
          :total="all.totalPages"
          :hide-on-single-page="true"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {reqElegantYears,reqElegants,deleteElegant} from '../../api/index'
  import Bread from '../../components/Bread/Bread'
  import store from 'store'
  export default {
    components:{Bread},
    data(){
      return {
        lists:[],
        years:[],
        year:'',
        pageSize:8,
        all:{
          pageNum:1,
          totalPages:2,
        }
      }
    },
    methods:{
      getContent(str){   //解码
        var intro = str.replace(/<br\/>/g, '\n').replace(/\&nbsp\;/g, ' ')
        return intro
      },
      //获取风采列表
      async getPages(currentPage){
        var result = await reqElegants(currentPage,this.pageSize,this.year)
        if(result.status == 200){
          this.all = result.obj
          this.lists = this.all.content
        }
      },
      /*修改*/
      updata(id){
        this.$router.push({
          path:'/teamele/elegantupdate',
          query:{id:id}
        })
        store.set('elegantupdate',id)
      },
      /**
       * 删除风采
       * */
      async deleteEle(id){
          console.log(id);
          this.$confirm('确定删除？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            (async ()=>{
              const result = await deleteElegant(id)
              if(result.status == 200){
                this.getPages(1);
                this.$message({message:'删除成功！' ,type:'success'})
              }else{
                this.$message({message:'系统出错！' ,type:'error'})
              }
            })();
        }).catch(() => {
            this.$message({type: 'info', message: '已取消删除'});
          })
      },

      /**
       *初始化显示
       *
       * */
      async init(){
        var result = await reqElegantYears();
        if(result.status==200){
          this.years = result.obj
          if(this.years.length>0)
            this.year = this.years[0]
        }else{
          return false
        }
      }
    },
    mounted () {
      this.init()
    },
    watch:{
      year(newval,oldval){
        this.getPages(1)
      }
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .elegantlists{
    background-color: white;
    min-height: 700px;
  }
  .elegantlists .title{
    height: 48px;
    line-height: 48px;
  }
  .elegantlists .title span{
    font-size: 14px;
    display: inline-block;
    color: rgb(144,147,166);
    float: left;
  }
  .elegantlists .title:before,.elegantlists .title:after{
    display: table;
    content: '';
    clear: both;
  }

  .elegantlists .body{
    border-bottom: 1px solid rgb(244,247,249);
  }
  .elegantlists .body div{
    display: block;
  }
  .elegantlists .body div.list:hover{
    background-color: rgb(249,250,252);
  }
  .elegantlists .body div:before,.elegantlists .body div:after{
    display: table;
    content: '';
    clear: both;
  }
  .elegantlists .body li{
    float: left;
    display: inline-block;
    height: 59px;
    list-style: none;
    border-top: 1px solid rgb(244,247,249);
    line-height: 59px;
  }
  .elegantlists .body:before,.elegantlists .body:after{
    display: table;
    content: '';
    clear: both;
  }
  .elegantlists .page{
    display: inline-block;
    margin-left: 45%;
  }
</style>

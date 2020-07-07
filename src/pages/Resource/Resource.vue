<template>
    <div class="resource-page">
      <router-link :to="{path:'/addresource' , query:{id:0}}" >
        <el-button class="submit-team" type="primary" icon="el-icon-plus">添加资源</el-button>
      </router-link>
      <div class="card-container" v-if="resource.length>0">
          <el-col  :span="6" v-for="(item,index) in resource" :key="index" style="padding: 0 7px; margin-top: 10px;">
              <el-card :body-style="{ padding:'0px'}" shadow="never">
                <img :src="'http://47.112.132.177:8084/res/showimg/{id}?id='+item.id" class="image">
                <div style="padding: 14px;" class="card-content">
                  <div class="more">
                    <router-link :to="{path:'/addresource' , query:{id:item.id}}">
                      <el-button class="editing" type="primary" @click="editing(item)" icon="el-icon-edit" circle></el-button>
                    </router-link>
                    <el-button  type="success" @click="look(item)" icon="el-icon-view" circle></el-button>
                    <el-button  type="danger"  @click="deleteItem(item)" icon="el-icon-delete" circle></el-button>
                  </div>
                  <span class="card-tit">{{item.resName}}</span>
                  <div class="bottom clearfix">
                    <p>{{item.resDetail}}</p>
                  </div>
                </div>
              </el-card>
          </el-col>
      </div>
      <div v-else style="font-size: 24px;text-align: center;margin-top: 50px">暂无数据！</div>
      <el-dialog title="资源信息" :visible.sync="dialogFormVisible">
        <div class="dialog-content">
          <h5 >设备名称：</h5>
          <p>{{detail.name}}</p>
          <h5 style="margin-top: 20px">设备图片：</h5>
          <img  :src="'http://47.112.132.177:8084/res/showimg/{id}?id='+detail.imageUrl" alt="">
          <h5 style="margin-top: 20px">设备描述：</h5>
          <p>{{detail.content}}</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" type="primary">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>



<script>
  import {reqAllReso,deleteReso} from "../../api";
  import Bread from '../../components/Bread/Bread'
  export default {
      name: "Resource",
      components:{Bread},
      data() {
        return {
          resource:[],
          dialogFormVisible: false,
          detail:{
            name:'',
            imageUrl:'',
            content:''
          }
        }
      },
      mounted(){
        this.init();
      },
      methods: {
        async init(){
          const result = await reqAllReso();
          console.log(result);
          this.resource = result;
        },
        look(item){
          this.dialogFormVisible = true;
          this.detail.name = item.resName;
          this.detail.content = item.resDetail;
          this.detail.imageUrl = item.id;
        },
        editing(item){

        },


        /**
         * 删除实验室资源
         * @item   选中项所有参数
         * */
        async  deleteItem(item){
          this.$confirm('确定删除此资源？', '提示' , {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type:'warning'
          }).then(()=>{
            (async  ()=>{
              const result = await deleteReso(item.id);
              if(result.status == 200){
                this.$message({type: 'success', message: '删除成功!'});
                this.init()       //初始化
              }else{
                this.$message({type: 'error', message: '系统出错!'});
              }
            })();
          }).catch(()=>{
            this.$message({ message: '取消操作!'});
          })
        }
      }
  }
</script>

<style>
  .el-button+.el-button{
    margin-left: 0;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
  }

  .image {
    width: 100%;
    height:170px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>

<style lang="stylus" rel="stylesheet/stylus">
  .resource-page
    position relative
    .submit-team
      position absolute
      right 0
      top -5px
  .card-container
    padding:5px;
    overflow: hidden;
    min-height 700px
    background-color: white
    .card-content
      position relative
      .more
        position absolute
        top -19px
        right 10px
      .card-tit
        font-size 14px
        font-weight 600
        color #303133
      .bottom
        max-height 45px
        overflow hidden
        color: #606266
        >p
          position relative
          letter-spacing  1px
          font-size 13px
          line-height 15px
          &::after
            content '....'
            display inline-block
            position absolute
            top 30px
            right 0
            background-color white
            width 18px
            height 15px
  .dialog-content
    max-height 400px
    overflow-y auto
    >img
      width 250px
    >p
      margin 10px 0
</style>
